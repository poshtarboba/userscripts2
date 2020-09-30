// ==UserScript==
// @name      main2
// @match     http*://*/*
// ==/UserScript==

(function() {
	'use strict';
	const VERSION = 5;
	let js = document.createElement('script');
	js.setAttribute('src', 'https://poshtarboba.github.io/userscripts2/main.js?' + VERSION);
	js.setAttribute('class', 'pbuscript-script pbuscript-script-main');
	document.body.appendChild(js);
	console.info('PBUS> main.js');
})();
