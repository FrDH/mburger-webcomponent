/*
 * mburger webcomponent
 * mmenujs.com/mburger
 *
 * Copyright (c) Fred Heusschen
 * frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */

import WebComponent from './js/index.js';

const webcomponentName = 'mm-burger';

const template = document.createElement('template');
template.innerHTML = `
    <STYLE />
    <HTML />
`;

customElements.define(
    webcomponentName,
    class extends WebComponent {
        
        constructor() {
            super(template);
        }
    }
);