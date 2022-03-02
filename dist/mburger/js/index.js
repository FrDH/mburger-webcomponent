var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _instances, _barsNode, _menuNode, _menuObserver, _clickEventListener, _disconnectMenu;
export default class extends HTMLElement {
    constructor(template) {
        super();
        _instances.add(this);
        /** Node for the hamburger bars. */
        _barsNode.set(this, void 0);
        /** Node for the menu. */
        _menuNode.set(this, void 0);
        /** Observer for the menu node. */
        _menuObserver.set(this, null);
        /** Click even listener for the hamburber. */
        _clickEventListener.set(this, null);
        //	Attach shadowRoot
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        __classPrivateFieldSet(this, _barsNode, this.shadowRoot.querySelector('.bars'), "f");
    }
    static get observedAttributes() {
        return ['mmenu'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'mmenu') {
            if (oldValue) {
                __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
            }
            /** Node for the new menu. */
            const menuNode = document.querySelector(`#${newValue}`);
            if (!menuNode) {
                return;
            }
            __classPrivateFieldSet(this, _menuNode, menuNode, "f");
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
    connectedCallback() { }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
    }
    /**
     * Set the icons state.
     * @param {string} state The state to set, either "cross" or "bars".
     */
    set state(state) {
        __classPrivateFieldGet(this, _barsNode, "f").classList[state === 'cross' ? 'add' : 'remove']('bars--cross');
    }
    /**
     * Get the icons tate.
     */
    get state() {
        return __classPrivateFieldGet(this, _barsNode, "f").matches('.bars--cross') ? 'cross' : 'bars';
    }
    /**
     * Connect the hamburger to a menu
     * @param {string} attributeName    The attribute to observe / alter.
     * @param {string} attributeValue   Value for the attribute.
     */
    connectMenu(attributeName, attributeValue) {
        if (!__classPrivateFieldGet(this, _menuNode, "f")) {
            return;
        }
        //  Remove previous.
        __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
        const setState = () => {
            /** Whether or not the menu is opened. */
            let isOpen;
            switch (attributeName) {
                case 'class':
                    isOpen = __classPrivateFieldGet(this, _menuNode, "f").classList.contains(attributeValue);
                    break;
                default:
                    isOpen = __classPrivateFieldGet(this, _menuNode, "f").getAttribute(attributeName) === attributeValue;
                    break;
            }
            this.state = isOpen ? 'cross' : 'bars';
        };
        //  Create new observer.
        __classPrivateFieldSet(this, _menuObserver, new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === attributeName) {
                    setState();
                }
            }
        }), "f");
        //  Observe menu.
        __classPrivateFieldGet(this, _menuObserver, "f").observe(__classPrivateFieldGet(this, _menuNode, "f"), {
            attributes: true
        });
        //  Immediately check menu.
        setState();
        //  Create new even listener.
        __classPrivateFieldSet(this, _clickEventListener, () => {
            switch (attributeName) {
                case 'class':
                    __classPrivateFieldGet(this, _menuNode, "f").classList[this.state === 'bars' ? 'add' : 'remove'](attributeValue);
                    break;
                default:
                    if (this.state === 'bars') {
                        __classPrivateFieldGet(this, _menuNode, "f").setAttribute(attributeName, attributeValue);
                    }
                    else {
                        __classPrivateFieldGet(this, _menuNode, "f").removeAttribute(attributeName);
                    }
                    break;
            }
        }, "f");
        // Click the hamburber.
        this.addEventListener('click', __classPrivateFieldGet(this, _clickEventListener, "f"));
    }
}
_barsNode = new WeakMap(), _menuNode = new WeakMap(), _menuObserver = new WeakMap(), _clickEventListener = new WeakMap(), _instances = new WeakSet(), _disconnectMenu = function _disconnectMenu() {
    var _a;
    //  Disconnect previous observer.
    (_a = __classPrivateFieldGet(this, _menuObserver, "f")) === null || _a === void 0 ? void 0 : _a.disconnect();
    //  Remove previous event listener.
    this.removeEventListener('click', __classPrivateFieldGet(this, _clickEventListener, "f"));
};
