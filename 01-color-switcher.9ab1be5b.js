!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),a=null;t.addEventListener("click",(function(){a=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));n.style.backgroundColor=t}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(a),t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.9ab1be5b.js.map
