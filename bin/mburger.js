/*
 * mburger webcomponent CSS v1.3.0
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
	<span><slot></slot></span>`;
customElements.define('m-burger', class extends HTMLElement {
    constructor() {
        super();
        var content = mBurger.content.cloneNode(true);
        //	Attach shadow DOM
        this.attachShadow({ mode: 'open' }).appendChild(content);
        this.menu = null;
    }
    static get observedAttributes() {
        return ['menu'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'menu') {
            this.menu = newValue ? document.getElementById(newValue) : null;
            if (this.menu) {
                let API = this.menu['mmenu'];
                if (API) {
                    API.bind('open:after', () => {
                        this.setAttribute('state', 'cross');
                    });
                    API.bind('close:after', () => {
                        this.removeAttribute('state');
                    });
                }
            }
        }
    }
    connectedCallback() {
        this.addEventListener('click', evnt => {
            if (this.menu && this.menu.classList.contains('mm-menu')) {
                let API = this.menu['mmenu'];
                if (API && API.open) {
                    API.open();
                }
            }
        });
    }
});
