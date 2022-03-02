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
    <style>*,:host{box-sizing:border-box}
:host{--mb-bar-width:30px;--mb-bar-height:3px;--mb-bar-spacing:7px;--mb-animate-timeout:0s;display:inline-block;vertical-align:middle;font-size:inherit;color:inherit}
button{display:flex;align-items:center;gap:.75em;padding:0;margin:0;appearance:none;font-size:inherit;background:0 0;border:none;color:inherit;cursor:pointer}
[part=bars]{position:relative;display:block;width:var(--mb-bar-width);height:calc(var(--mb-bar-height) * 3 + var(--mb-bar-spacing) * 2)}
.bar{display:block;position:absolute;left:0;right:0;height:var(--mb-bar-height);border-radius:calc(var(--mb-bar-height)/ 2);background:currentColor;color:inherit;opacity:1}
.bar--top{bottom:calc(50% + var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transition:bottom .2s ease,transform .2s ease,width .2s ease}
.bar--middle{top:calc(50% - var(--mb-bar-height)/ 2);transition:opacity .2s ease}
.bar--bottom{top:calc(50% + var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transition:top .2s ease,transform .2s ease,width .2s ease}
.is-cross .bar--top{bottom:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(45deg)}
.is-cross .bar--middle{opacity:0}
.is-cross .bar--bottom{top:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(-45deg)}
:host([fx=collapse]) .bar--top{transition:bottom .2s ease,margin .2s ease,transform .2s ease;transition-delay:calc(var(--mb-animate-timeout) + .2s),var(--mb-animate-timeout),var(--mb-animate-timeout)}
:host([fx=collapse]) .bar--middle{transition:top .2s ease,opacity 0s ease;transition-delay:calc(var(--mb-animate-timeout) + .3s),calc(var(--mb-animate-timeout) + .3s)}
:host([fx=collapse]) .bar--bottom{transition:top .2s ease,transform .2s ease;transition-delay:var(--mb-animate-timeout)}
:host([fx=collapse]) .is-cross .bar--top{bottom:calc(50% - var(--mb-bar-spacing) - var(--mb-bar-height));margin-bottom:calc(var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transform:rotate(45deg);transition-delay:calc(var(--mb-animate-timeout) + .1s),calc(var(--mb-animate-timeout) + .3s),calc(var(--mb-animate-timeout) + .3s)}
:host([fx=collapse]) .is-cross .bar--middle{top:calc(50% + var(--mb-bar-spacing));opacity:0;transition-delay:var(--mb-animate-timeout),calc(var(--mb-animate-timeout) + .2s)}
:host([fx=collapse]) .is-cross .bar--bottom{top:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(-45deg);transition-delay:calc(var(--mb-animate-timeout) + .3s),calc(var(--mb-animate-timeout) + .3s)}
:host([fx=spin]) .bar--top{transition-delay:calc(var(--mb-animate-timeout) + .2s),var(--mb-animate-timeout)}
:host([fx=spin]) .bar--middle{transition-duration:0s;transition-delay:calc(var(--mb-animate-timeout) + .2s)}
:host([fx=spin]) .bar--bottom{transition-delay:calc(var(--mb-animate-timeout) + .2s),var(--mb-animate-timeout)}
:host([fx=spin]) .is-cross .bar--top{transform:rotate(135deg);transition-delay:var(--mb-animate-timeout),calc(var(--mb-animate-timeout) + .2s)}
:host([fx=spin]) .is-cross .bar--middle{transition-delay:var(--mb-animate-timeout)}
:host([fx=spin]) .is-cross .bar--bottom{transform:rotate(225deg);transition-delay:var(--mb-animate-timeout),calc(var(--mb-animate-timeout) + .2s)}
:host([fx=squeeze]) .bar--top{transition-delay:calc(var(--mb-animate-timeout) + .1s),var(--mb-animate-timeout)}
:host([fx=squeeze]) .bar--middle{transition-delay:calc(var(--mb-animate-timeout) + .1s)}
:host([fx=squeeze]) .bar--bottom{transition-delay:calc(var(--mb-animate-timeout) + .1s),var(--mb-animate-timeout)}
:host([fx=squeeze]) .is-cross .bar--top{transition-delay:var(--mb-animate-timeout),calc(var(--mb-animate-timeout) + .1s)}
:host([fx=squeeze]) .is-cross .bar--middle{transition-delay:var(--mb-animate-timeout)}
:host([fx=squeeze]) .is-cross .bar--bottom{transition-delay:var(--mb-animate-timeout),calc(var(--mb-animate-timeout) + .1s)}
:host([fx=tornado]) .bar--top{transition:bottom .2s ease,transform .2s ease;transition-delay:calc(var(--mb-animate-timeout) + .2s)}
:host([fx=tornado]) .bar--middle{transition:opacity 0s ease,transform .2s ease;transition-delay:calc(var(--mb-animate-timeout) + .1s),calc(var(--mb-animate-timeout) + .1s)}
:host([fx=tornado]) .bar--bottom{transition:top .2s ease,transform .2s ease;transition-delay:var(--mb-animate-timeout)}
:host([fx=tornado]) .is-cross .bar--top{transform:rotate(-135deg);transition-delay:var(--mb-animate-timeout)}
:host([fx=tornado]) .is-cross .bar--middle{opacity:0;transform:rotate(-135deg);transition-delay:calc(var(--mb-animate-timeout) + .4s),calc(var(--mb-animate-timeout) + .1s)}
:host([fx=tornado]) .is-cross .bar--bottom{transform:rotate(-225deg);transition-delay:calc(var(--mb-animate-timeout) + .2s)}</style>
    <button>
    <span part="bars">
        <span class="bar bar--top"></span>
        <span class="bar bar--middle"></span>
        <span class="bar bar--bottom"></span>
    </span>
    <slot part="text"></slot>
</button>

`;
customElements.define(webcomponentName, class extends WebComponent {
    constructor() {
        super(template);
    }
});
