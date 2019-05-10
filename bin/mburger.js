/*
 * mburger webcomponent v1.3.1
 * mmenujs.com/mburger
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */
export const mBurger = document.createElement('template');
mBurger.innerHTML = `
	<style>[__STYLES__]</style>
	<b></b>
	<b></b>
	<b></b>
	<slot></slot>`;
customElements.define('m-burger', class extends HTMLElement {
    constructor() {
        super();
        /** The menu node. */
        this.menuNode = null;
        /** API for the menu. */
        this.menuApi = null;
        //	Attach shadow DOM
        var content = mBurger.content.cloneNode(true);
        this.attachShadow({ mode: 'open' }).appendChild(content);
    }
    static get observedAttributes() {
        return ['menu'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'menu') {
            //  Set the new menu node and API.
            this.setMenu(newValue);
            //  Change the hamburger state when opening and closing the menu.
            if (this.menuApi) {
                this.menuApi.bind('open:after', () => {
                    this.setAttribute('state', 'cross');
                });
                this.menuApi.bind('close:after', () => {
                    this.removeAttribute('state');
                });
            }
        }
    }
    connectedCallback() {
        //  Open the menu when clicking the hamburger.
        this.addEventListener('click', evnt => {
            if (this.menuApi && this.menuApi.open) {
                this.menuApi.open();
            }
        });
    }
    /**
     * Set the menu node and API.
     * @param {string} id The ID-attribute for the menu node.
     */
    setMenu(id) {
        this.menuNode = id ? document.getElementById(id) : null;
        this.menuApi = null;
        if (this.menuNode) {
            this.menuApi =
                this.menuNode['mmApi'] || this.menuNode['mmenu'] || null;
        }
    }
});
