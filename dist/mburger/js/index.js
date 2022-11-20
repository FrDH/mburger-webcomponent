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
var _instances, _barsNode, _menuNode, _menuObserver, _offClick, _offKeyup, _disconnectMenu;
const on = (el, ev, cb) => {
    el.addEventListener(ev, cb);
    return () => {
        el.removeEventListener(ev, cb);
    };
};
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
        /** Function to remove click even listener for the hamburber. */
        _offClick.set(this, null);
        /** Function to remove keyUp even listener for the hamburber. */
        _offKeyup.set(this, null);
        //	Attach shadowRoot
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        __classPrivateFieldSet(this, _barsNode, this.shadowRoot.querySelector('[part="bars"]'), "f");
    }
    static get observedAttributes() {
        return ['menu'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'menu') {
            if (oldValue) {
                __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
            }
            /** Node for the new menu. */
            const menuNode = document.querySelector(`#mm-${newValue}`) ||
                document.querySelector(`#${newValue}`);
            if (!menuNode) {
                return;
            }
            __classPrivateFieldSet(this, _menuNode, menuNode, "f");
            // for mmenu.js
            if (menuNode.matches('.mm-menu')) {
                this.connectMenu('class', () => __classPrivateFieldGet(this, _menuNode, "f").classList.contains('mm-menu--opened'), () => __classPrivateFieldGet(this, _menuNode, "f")['mmApi'].open(), () => __classPrivateFieldGet(this, _menuNode, "f")['mmApi'].close());
            }
            // for mmenu-light
            else if (menuNode.matches('.mm')) {
                this.connectMenu('class', () => __classPrivateFieldGet(this, _menuNode, "f").classList.contains('mm--open'), () => __classPrivateFieldGet(this, _menuNode, "f").classList.add('mm--open'), () => __classPrivateFieldGet(this, _menuNode, "f").classList.remove('mm--open'));
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
        __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
    }
    /**
     * Set the icons state.
     * @param {string} state The state to set, either "cross" or "bars".
     */
    set state(state) {
        __classPrivateFieldGet(this, _barsNode, "f").classList[state === 'cross' ? 'add' : 'remove']('is-cross');
    }
    /**
     * Get the icons tate.
     * @returns {string} The state of the icon, can be "cross" or "bars".
     */
    get state() {
        return __classPrivateFieldGet(this, _barsNode, "f").matches('.is-cross') ? 'cross' : 'bars';
    }
    /**
     * Connect the hamburger to a menu
     * @param {string} attribute The attribute to observe.
     * @param {Function} isOpen Function to test whether or not the menu is opened.
     * @param {Function} open Function that opens the menu.
     * @param {Function} close Function that closes the menu.
     */
    connectMenu(attribute, isOpen, open, close) {
        if (!__classPrivateFieldGet(this, _menuNode, "f")) {
            return;
        }
        //  Remove previous.
        __classPrivateFieldGet(this, _instances, "m", _disconnectMenu).call(this);
        /** Set the state for the hamburber. */
        const setState = () => {
            this.state = isOpen() ? 'cross' : 'bars';
        };
        /** Toggle menu open / close */
        const toggle = () => {
            if (this.state === 'bars') {
                open();
            }
            else {
                close();
            }
        };
        //  Create new observer.
        __classPrivateFieldSet(this, _menuObserver, new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === attribute) {
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
        // Click / Enter the hamburber.
        __classPrivateFieldSet(this, _offClick, on(this, 'click', toggle), "f");
        __classPrivateFieldSet(this, _offKeyup, on(this, 'keyup', (event) => {
            if (event.key === 'Enter') {
                toggle();
            }
        }), "f");
    }
}
_barsNode = new WeakMap(), _menuNode = new WeakMap(), _menuObserver = new WeakMap(), _offClick = new WeakMap(), _offKeyup = new WeakMap(), _instances = new WeakSet(), _disconnectMenu = function _disconnectMenu() {
    var _a, _b, _c;
    //  Disconnect previous observer.
    (_a = __classPrivateFieldGet(this, _menuObserver, "f")) === null || _a === void 0 ? void 0 : _a.disconnect();
    //  Remove previous event listener.
    (_b = __classPrivateFieldGet(this, _offClick, "f")) === null || _b === void 0 ? void 0 : _b.call(this);
    (_c = __classPrivateFieldGet(this, _offKeyup, "f")) === null || _c === void 0 ? void 0 : _c.call(this);
};
