export default class extends HTMLElement {

    /** Node for the hamburger bars. */
    #barsNode: HTMLElement;

    /** Node for the menu. */
    #menuNode: HTMLElement;

    /** Observer for the menu node. */
    #menuObserver: MutationObserver = null;

    /** Click even listener for the hamburber. */
    #clickEventListener: EventListener = null;
       
    constructor(template: HTMLTemplateElement) {
        super();

        //	Attach shadowRoot
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#barsNode = this.shadowRoot.querySelector('.bars');
    }

    static get observedAttributes() {
        return ['mmenu'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'mmenu') {

            if (oldValue) {
                this.#disconnectMenu();
            }

            /** Node for the new menu. */
            const menuNode: HTMLElement = document.querySelector(`#${newValue}`);
            if (!menuNode) {
                return;
            }

            this.#menuNode = menuNode;

            if (menuNode.matches('.mm, .mm-menu')) {
                
                /** Class that indicates the menu is opened. */
                let openClass = 'mm-menu--opened';
                
                // for mmenu-light
                if (menuNode.matches('.mm')) {
                    openClass = 'mm--open';
                }

                this.connectMenu('class', openClass);
            }
        }
    }

    connectedCallback() {}

    disconnectedCallback() {
        this.#disconnectMenu();
    }

    /**
     * Set the icons state.
     * @param {string} state The state to set, either "cross" or "bars".
     */
    set state(state: 'cross' | 'bars') {
        this.#barsNode.classList[state === 'cross' ? 'add' : 'remove']('bars--cross');
    }

    /**
     * Get the icons tate.
     */
    get state() {
        return this.#barsNode.matches('.bars--cross') ? 'cross' : 'bars';
    }

    #disconnectMenu() {
        //  Disconnect previous observer.
        this.#menuObserver?.disconnect();
                
        //  Remove previous event listener.
        this.removeEventListener('click', this.#clickEventListener);
    }

    /**
     * Connect the hamburger to a menu
     * @param {string} attributeName    The attribute to observe / alter.
     * @param {string} attributeValue   Value for the attribute.
     */
    connectMenu(
        attributeName: string, 
        attributeValue: string
    ) {
        if (!this.#menuNode) {
            return;
        }
        
        //  Remove previous.
        this.#disconnectMenu();

        const setState = () => {

            /** Whether or not the menu is opened. */
            let isOpen;

            switch(attributeName) {
                case 'class':
                    isOpen = this.#menuNode.classList.contains(attributeValue);
                    break;
                
                default:
                    isOpen = this.#menuNode.getAttribute(attributeName) === attributeValue;
                    break;
            }
            this.state = isOpen ? 'cross' : 'bars';
        }

        //  Create new observer.
        this.#menuObserver = new MutationObserver(mutationsList => {
            for(const mutation of mutationsList) {
                if (mutation.attributeName === attributeName) {
                    setState();
                }
            }
        });

        //  Observe menu.
        this.#menuObserver.observe(this.#menuNode, {
            attributes: true
        });

        //  Immediately check menu.
        setState();

        //  Create new even listener.
        this.#clickEventListener = () => {
            switch(attributeName) {
                case 'class':
                    this.#menuNode.classList[this.state === 'bars' ? 'add' : 'remove'](attributeValue);
                    break;
                
                default:
                    if (this.state === 'bars') {
                        this.#menuNode.setAttribute(attributeName, attributeValue);
                    } else {
                        this.#menuNode.removeAttribute(attributeName);
                    }
                    break;
            }
        }

        // Click the hamburber.
        this.addEventListener('click', this.#clickEventListener);
    }
}