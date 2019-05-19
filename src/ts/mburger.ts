/*
 * mburger webcomponent v1.3.3
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

customElements.define(
    'm-burger',
    class extends HTMLElement {
        /** The menu node. */
        menuNode: HTMLElement = null;

        /** API for the menu. */
        menuApi: {
            bind: Function;
            open: Function;
        } = null;

        constructor() {
            super();

            //	Attach shadow DOM
            var content = mBurger.content.cloneNode(true);
            this.attachShadow({ mode: 'open' }).appendChild(content);
        }

        static get observedAttributes() {
            return ['menu'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name == 'menu') {
                //  Initiate the new menu.
                this.initMenu(newValue);
            }
        }

        connectedCallback() {
            //  Open the menu when clicking the hamburger.
            this.addEventListener('click', evnt => {
                //  If there is no API for a menu available (the menu isn't yet initiated),
                //  try to initiate the menu.
                if (!this.menuApi) {
                    this.initMenu();
                }

                //  If there is an API for a menu available,
                //  open the menu.
                if (this.menuApi && this.menuApi.open) {
                    this.menuApi.open();
                }
            });
        }

        /**
         * Set the menu node and API.
         * @param {string} [id] The ID-attribute for the menu node.
         */
        initMenu(id?: string) {
            this.menuNode = null;
            this.menuApi = null;

            if (!id) {
                id = this.getAttribute('menu');
            }
            if (id) {
                this.menuNode = document.getElementById(id);
            }
            if (this.menuNode) {
                this.menuApi =
                    this.menuNode['mmApi'] || this.menuNode['mmenu'] || null;
            }

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
);
