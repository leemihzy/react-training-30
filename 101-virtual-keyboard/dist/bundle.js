(()=>{"use strict";new class{#e;#t;#s;#n;#i;#o;#a=!1;#l=!1;constructor(){this.#c(),this.#r()}#c(){this.#s=document.getElementById("container"),this.#e=this.#s.querySelector("#switch"),this.#t=this.#s.querySelector("#font"),this.#n=this.#s.querySelector("#keyboard"),this.#i=this.#s.querySelector("#input-group"),this.#o=this.#i.querySelector("#input")}#r(){this.#e.addEventListener("change",this.#u),this.#t.addEventListener("change",this.#d),document.addEventListener("keydown",this.#h.bind(this)),document.addEventListener("keyup",this.#E.bind(this)),this.#o.addEventListener("input",this.#p),this.#n.addEventListener("mousedown",this.#y.bind(this)),document.addEventListener("mouseup",this.#v.bind(this))}#v(e){const t=e.target.closest("div.key"),s=!!t?.classList.contains("active"),n=t?.dataset.val;s&&n&&"Space"!==n&&"Backspace"!==n&&(this.#o.value+=n),s&&"Space"===n&&(this.#o.value+=" "),s&&"Backspace"===n&&(this.#o.value=this.#o.value.slice(0,-1)),this.#n.querySelector(".active")?.classList.remove("active")}#y(e){this.#a||(this.#l=!0,e.target.closest("div.key")?.classList.add("active"))}#u(e){document.documentElement.setAttribute("theme",e.target.checked?"dark-mode":"")}#d(e){console.log(e.target.value),document.body.style.fontFamily=e.target.value}#p(e){e.target.value=e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,"")}#h(e){this.#l||(this.#a=!0,console.log(e.code),this.#o.focus(),this.#i.classList.toggle("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)),this.#n.querySelector(`[data-code=${e.code}]`)?.classList.add("active"))}#E(e){this.#n.querySelector(`[data-code=${e.code}]`)?.classList.remove("active")}}})();
//# sourceMappingURL=bundle.js.map