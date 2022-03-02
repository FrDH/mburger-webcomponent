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

        this.#barsNode = this.shadowRoot.querySelector('[part="bars"]');
    }

    static get observedAttributes() {
        return ['menu'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'menu') {

            if (oldValue) {
                this.#disconnectMenu();
            }

            /** Node for the new menu. */
            const menuNode: HTMLElement = document.querySelector(`#${newValue}`);
            if (!menuNode) {
                return;
            }

            this.#menuNode = menuNode;

            // for mmenu.js
            if (menuNode.matches('.mm-menu')) {
                this.connectMenu(
                    'class', 
                    () => this.#menuNode.classList.contains('mm-menu--opened'),
                    () => this.#menuNode['mmApi'].open(),
                    () => this.#menuNode['mmApi'].close(),
                );
            }

            // for mmenu-light
            else if (menuNode.matches('.mm')) {
                this.connectMenu(
                    'class', 
                    () => this.#menuNode.classList.contains('mm--open'),
                    () => this.#menuNode.classList.add('mm--open'),
                    () => this.#menuNode.classList.remove('mm--open'),
                );
            }
        }
    }

    connectedCallback() {
        const menu = this.getAttribute('menu');
        if (menu) {

            // To ensure all JS was fired, a requestAnimationFrame on DOMContentLoaded...
            document.addEventListener('DOMContentLoaded', () => {
                requestAnimationFrame(() => {
                    this.attributeChangedCallback('menu', '', menu);
                });
            });
        }
    }

    disconnectedCallback() {
        this.#disconnectMenu();
    }

    /**
     * Set the icons state.
     * @param {string} state The state to set, either "cross" or "bars".
     */
    set state(state: 'cross' | 'bars') {
        this.#barsNode.classList[state === 'cross' ? 'add' : 'remove']('is-cross');
    }

    /**
     * Get the icons tate.
     * @returns {string} The state of the icon, can be "cross" or "bars".
     */
    get state() {
        return this.#barsNode.matches('.is-cross') ? 'cross' : 'bars';
    }

    /**
     * Remove the observer and click event listener.
     */
    #disconnectMenu() {
        //  Disconnect previous observer.
        this.#menuObserver?.disconnect();
                
        //  Remove previous event listener.
        this.removeEventListener('click', this.#clickEventListener);
    }

    /**
     * Connect the hamburger to a menu
     * @param {string} attribute The attribute to observe.
     * @param {Function} isOpen Function to test whether or not the menu is opened.
     * @param {Function} open Function that opens the menu.
     * @param {Function} close Function that closes the menu.
     */
    connectMenu(
        attribute: string, 
        isOpen: Function,
        open: Function,
        close: Function
    ) {
        if (!this.#menuNode) {
            return;
        }
        
        //  Remove previous.
        this.#disconnectMenu();

        /** Set the state for the hamburber. */
        const setState = () => {
            this.state = isOpen() ? 'cross' : 'bars';
        }

        //  Create new observer.
        this.#menuObserver = new MutationObserver(mutationsList => {
            for(const mutation of mutationsList) {
                if (mutation.attributeName === attribute) {
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
            if (this.state === 'bars') {
                open();
            } else {
                close();
            }
        }

        // Click the hamburber.
        this.addEventListener('click', this.#clickEventListener);
    }
}