export const mBurger = document.createElement( 'template' );
mBurger.innerHTML = `
	<style>
:host{--mb-bar-width:60%;--mb-bar-height:4px;--mb-bar-spacing:10px;--mb-cross-timeout:0.4s;width:60px;height:60px;background:0 0;border:none;border-radius:0;color:inherit;display:inline-block;position:relative;box-sizing:border-box;padding:0;margin:0;vertical-align:middle;appearance:none;cursor:pointer}:host span{display:block;position:absolute;left:calc((100% - var(--mb-bar-width))/ 2);width:var(--mb-bar-width);height:var(--mb-bar-height);border-radius:calc(var(--mb-bar-height)/ 2);background:currentColor;color:inherit;opacity:1}:host span:nth-of-type(1){bottom:calc(50% + var(--mb-bar-spacing));transition:bottom .2s ease,transform .2s ease}:host span:nth-of-type(2){top:calc(50% - (var(--mb-bar-height)/ 2));transition:opacity .2s ease}:host span:nth-of-type(3){top:calc(50% + var(--mb-bar-spacing));transition:top .2s ease,transform .2s ease}:host-context(.mm-wrapper_opened) span:nth-of-type(1){bottom:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(45deg)}:host-context(.mm-wrapper_opened) span:nth-of-type(2){opacity:0}:host-context(.mm-wrapper_opened) span:nth-of-type(3){top:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(-45deg)}:host([fx=collapse]) span:nth-of-type(1){transition:bottom .2s ease,margin .2s ease,transform .2s ease;transition-delay:.2s,0s,0s}:host([fx=collapse]) span:nth-of-type(2){transition:top .2s ease,opacity 0s ease;transition-delay:.3s,.3s}:host([fx=collapse]) span:nth-of-type(3){transition:top .2s ease,transform .2s ease}:host-context(.mm-wrapper_opened):host([fx=collapse]) span:nth-of-type(1){bottom:calc(50% - var(--mb-bar-spacing) - var(--mb-bar-height));margin-bottom:calc(var(--mb-bar-spacing) + (var(--mb-bar-height)/ 2));transform:rotate(45deg);transition-delay:calc(var(--mb-cross-timeout) + .1s),calc(var(--mb-cross-timeout) + .3s),calc(var(--mb-cross-timeout) + .3s)}:host-context(.mm-wrapper_opened):host([fx=collapse]) span:nth-of-type(2){top:calc(50% + var(--mb-bar-spacing));opacity:0;transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host-context(.mm-wrapper_opened):host([fx=collapse]) span:nth-of-type(3){top:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(-45deg);transition-delay:calc(var(--mb-cross-timeout) + .3s),calc(var(--mb-cross-timeout) + .3s)}:host([fx=spin]) span:nth-of-type(1){transition-delay:.2s,0s}:host([fx=spin]) span:nth-of-type(2){transition-duration:0s;transition-delay:.2s}:host([fx=spin]) span:nth-of-type(3){transition-delay:.2s,0s}:host-context(.mm-wrapper_opened):host([fx=spin]) span:nth-of-type(1){transform:rotate(135deg);transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host-context(.mm-wrapper_opened):host([fx=spin]) span:nth-of-type(2){transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host-context(.mm-wrapper_opened):host([fx=spin]) span:nth-of-type(3){transform:rotate(225deg);transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host([fx=squeeze]) span:nth-of-type(1){transition-delay:.1s,0s}:host([fx=squeeze]) span:nth-of-type(2){transition-delay:.1s}:host([fx=squeeze]) span:nth-of-type(3){transition-delay:.1s,0s}:host-context(.mm-wrapper_opened):host([fx=squeeze]) span:nth-of-type(1){transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .1s)}:host-context(.mm-wrapper_opened):host([fx=squeeze]) span:nth-of-type(2){transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host-context(.mm-wrapper_opened):host([fx=squeeze]) span:nth-of-type(3){transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .1s)}:host([fx=tornado]) span:nth-of-type(1){transition:bottom .2s ease,transform .2s ease;transition-delay:.2s}:host([fx=tornado]) span:nth-of-type(2){transition:opacity 0s ease,transform .2s ease;transition-delay:.1s,.1s}:host([fx=tornado]) span:nth-of-type(3){transition:top .2s ease,transform .2s ease;transition-delay:0s}:host-context(.mm-wrapper_opened):host([fx=tornado]) span:nth-of-type(1){transform:rotate(-135deg);transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host-context(.mm-wrapper_opened):host([fx=tornado]) span:nth-of-type(2){opacity:0;transform:rotate(-135deg);transition-delay:calc(var(--mb-cross-timeout) + .4s),calc(var(--mb-cross-timeout) + .1s)}:host-context(.mm-wrapper_opened):host([fx=tornado]) span:nth-of-type(3){transform:rotate(-225deg);transition-delay:calc(var(--mb-cross-timeout) + .2s)}
	</style>

	<span></span>
	<span></span>
	<span></span>`;

customElements.define( 'm-burger',
	class extends HTMLElement {
		constructor() {
			super();

			var content = mBurger.content.cloneNode( true );

			//	Attach shadow DOM
			this.attachShadow({ mode: 'open' })
				.appendChild( content );

			this.menu = null;

		}

		static get observedAttributes() {
			return [ 'menu' ];
		}

		attributeChangedCallback( name, oldValue, newValue ) {
			if ( name == 'menu' ) {
				this.menu = ( this.hasAttribute( 'menu' ) )
					? document.getElementById( this.getAttribute( 'menu' ) )
					: null;
			}
		}

		connectedCallback() {
			this.addEventListener( 'click', ( evnt ) => {
				if ( this.menu && this.menu.classList.contains( 'mm-menu' ) ) {
					let API = this.menu.mmenu;
					if ( API.open ) {
						API.open();
					}
				}
			});
		}
	}
);
