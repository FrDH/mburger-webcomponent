import WebComponent from './js/index.js';

const webcomponentName = 'test-test';

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