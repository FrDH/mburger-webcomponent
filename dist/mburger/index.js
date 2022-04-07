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
:host{--mb-bar-width:30px;--mb-bar-height:3px;--mb-bar-spacing:7px;--mb-animation-function:ease;--mb-animation-duration:0.25s;--mb-animation-delay:0s;display:inline-flex;align-items:center;gap:.75em;padding:0;margin:0;font-size:inherit;color:inherit;border:unset;background:0 0;cursor:pointer}
:host([animation=elastic]){--mb-animation-function:cubic-bezier(.5,-0.35,.35,1.5);--mb-animation-duration:0.35s}
:host([animation=funky]){--mb-animation-function:cubic-bezier(0,1.45,.5,1.45);--mb-animation-duration:0.4s}
:host([animation=shaky]){--mb-animation-function:cubic-bezier(.15,.33,1,-0.81);--mb-animation-function:cubic-bezier(0,.5,1,-1);--mb-animation-duration:0.45s}
[part=bars]{position:relative;display:block;width:var(--mb-bar-width);height:calc(var(--mb-bar-height) * 3 + var(--mb-bar-spacing) * 2)}
.bar{display:block;position:absolute;left:0;right:0;height:var(--mb-bar-height);border-radius:calc(var(--mb-bar-height)/ 2);background:currentColor;color:inherit;opacity:1;transition:none var(--mb-animation-duration) var(--mb-animation-function) var(--mb-animation-delay)}
.bar--top{bottom:calc(50% + var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transition-property:bottom,transform}
.bar--middle{top:calc(50% - var(--mb-bar-height)/ 2);transition-property:opacity}
.bar--bottom{top:calc(50% + var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transition-property:top,transform}
.is-cross .bar--top{bottom:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(45deg)}
.is-cross .bar--middle{opacity:0}
.is-cross .bar--bottom{top:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(-45deg)}
:host([fx=collapse]) .bar--top{transition-property:bottom,margin,transform;transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration)),var(--mb-animation-delay),var(--mb-animation-delay)}
:host([fx=collapse]) .bar--middle{transition-property:top,opacity;transition-duration:var(--mb-animation-duration),0s;transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3)}
:host([fx=collapse]) .bar--bottom{transition-delay:var(--mb-animation-delay)}
:host([fx=collapse]) .is-cross .bar--top{bottom:calc(50% - var(--mb-bar-spacing) - var(--mb-bar-height));margin-bottom:calc(var(--mb-bar-spacing) + var(--mb-bar-height)/ 2);transform:rotate(45deg);transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .3),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3)}
:host([fx=collapse]) .is-cross .bar--middle{top:calc(50% + var(--mb-bar-spacing));opacity:0;transition-duration:var(--mb-animation-duration),0s;transition-delay:var(--mb-animation-delay),calc(var(--mb-animation-delay) + var(--mb-animation-duration))}
:host([fx=collapse]) .is-cross .bar--bottom{top:calc(50% - var(--mb-bar-height)/ 2);transform:rotate(-45deg);transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * 1.3)}
:host([fx=spin]) .bar--top{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration)),var(--mb-animation-delay)}
:host([fx=spin]) .bar--middle{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration))}
:host([fx=spin]) .bar--bottom{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration)),var(--mb-animation-delay)}
:host([fx=spin]) .is-cross .bar--top{transform:rotate(135deg);transition-delay:var(--mb-animation-delay),calc(var(--mb-animation-delay) + var(--mb-animation-duration))}
:host([fx=spin]) .is-cross .bar--middle{transition-duration:0s;transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration))}
:host([fx=spin]) .is-cross .bar--bottom{transform:rotate(225deg);transition-delay:var(--mb-animation-delay),calc(var(--mb-animation-delay) + var(--mb-animation-duration))}
:host([fx=squeeze]) .bar--top{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .4),var(--mb-animation-delay)}
:host([fx=squeeze]) .bar--middle{transition-delay:calc(var(--mb-animation-delay) + .1s)}
:host([fx=squeeze]) .bar--bottom{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .4),var(--mb-animation-delay)}
:host([fx=squeeze]) .is-cross .bar--top{transition-delay:var(--mb-animation-delay),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .4)}
:host([fx=squeeze]) .is-cross .bar--middle{transition-delay:var(--mb-animation-delay)}
:host([fx=squeeze]) .is-cross .bar--bottom{transition-delay:var(--mb-animation-delay),calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .4)}
:host([fx=tornado]) .bar--top{transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .6)}
:host([fx=tornado]) .bar--middle{transition-property:opacity,transform;transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .3)}
:host([fx=tornado]) .bar--bottom{transition-delay:var(--mb-animation-delay)}
:host([fx=tornado]) .is-cross .bar--top{transform:rotate(-135deg);transition-delay:var(--mb-animation-delay)}
:host([fx=tornado]) .is-cross .bar--middle{opacity:0;transform:rotate(-135deg);transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .3)}
:host([fx=tornado]) .is-cross .bar--bottom{transform:rotate(-225deg);transition-delay:calc(var(--mb-animation-delay) + var(--mb-animation-duration) * .6)}</style>
    <span part="bars">
    <span class="bar bar--top"></span>
    <span class="bar bar--middle"></span>
    <span class="bar bar--bottom"></span>
</span>
<slot part="text"></slot>

`;
customElements.define(webcomponentName, class extends WebComponent {
    constructor() {
        super(template);
    }
});
