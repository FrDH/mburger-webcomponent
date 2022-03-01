export default class extends HTMLElement {
       
    constructor(template: HTMLTemplateElement) {
        super();

        //	Attach shadowRoot
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // static get observedAttributes() {
    //     return ['autoplay', 'draggable', 'controls'];
    // }

    // attributeChangedCallback(name, oldValue, newValue) {

    // }

    // connectedCallback() {
        
    // }
}