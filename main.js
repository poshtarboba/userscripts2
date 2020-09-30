// ==UserScript==
// @name      main2
// @match     http*://*/*
// @require   https://poshtarboba.github.io/userscripts2/main.js?1
// ==/UserScript==

let pbuscript = {};
pbuscript_main_function();

function pbuscript_main_function(){
	console.info('PBUS> main.js');
	pbuscript.addStyle = addStyle;                  /* (string css [, string className]) */
	pbuscript.createMainpanel = createMainpanel;    /* () */

	const PATH = 'https://poshtarboba.github.io/userscripts2/';

	if (location.host === 'e621.net') loadJS('pbus_621.net.js');
	console.log();

	function loadJS(jsFilename){
		let js = document.createElement('script');
		js.setAttribute('src', PATH + jsFilename);
		js.classList.add('pbuscript-script');
		document.body.appendChild(js);
		console.info('PBUS> ' + jsFilename);
	}

	function addStyle(css, className){
		let style = document.createElement('style');
		style.innerHTML = css;
		if (className) style.setAttribute('class', className);
		style.classList.add('pbuscript-style');
		document.head.appendChild(style);
	}

	function createMainpanel(){
		createStyles();
		createButton();
		createPanel();
		function createStyles(){
			let css = '#pbuscript_mainbutton{position:fixed;z-index:100600;right:-20px;top:80%;width:60px;height:60px;background:#eee url(gear.png) no-repeat 10px 18px / 24px 24px;border:1px solid #999;border-radius:50% 0 0 50%;cursor:pointer;opacity:0.2}\n';
			css += '#pbuscript_mainbutton:hover{opacity:1}\n';
			css += '#pbuscript_mainbutton.pbuscript-cursor-move{cursor:move}\n';
			css += '#pbuscript_mainpanel{display:none;position:fixed;z-index:100602;left:80%;top:10%;padding:1px;min-width:64px;background:#eee;border:1px solid #999;opacity:.5}\n';
			css += '#pbuscript_mainpanel:hover{opacity:1}\n';
			css += '#pbuscript_mainpanel.pbuscript-show{display:block}\n';
			css += '.pbuscript-movebar{height:8px;background:repeating-linear-gradient(-45deg,#eee,#eee 5px,#ccc 5px,#ccc 6px);cursor:move}\n';
			pbuscript.addStyle(css, 'pbuscript-style-main');
		}
		function createButton(){
			let btn = document.createElement('div');
			pbuscript.mainButton = btn;
			btn.setAttribute('id', 'pbuscript_mainbutton');
			btn.setAttribute('title', 'Ctrl + click = move');
			let top = localStorage.getItem('pbuscript_mainButtonPosY');
			if (top) btn.style.top = top;
			document.body.appendChild(btn);
			btn.addEventListener('mousedown', mainButtonMouseDown);
		}
		function createPanel(){
			let panel = document.createElement('div');
			pbuscript.mainPanel = panel;
			let panelId = 'pbuscript_mainpanel';
			panel.setAttribute('id', panelId);
			panel.innerHTML = '<div class="pbuscript-movebar"></div>';
			let left = localStorage.getItem(panelId + 'PosX');
			let top = localStorage.getItem(panelId + 'PosY');
			if (left) panel.style.left = left;
			if (top) panel.style.top = top;
			panel.querySelector('.pbuscript-movebar').addEventListener('mousedown', moveBarMouseDown)
			document.body.appendChild(panel);
			panel.show = () => panel.classList.add('pbuscript-show');
			panel.hide = () => panel.classList.remove('pbuscript-show');
			panel.addButton = mainPanelAddButton;
			panel.addHtml = mainPanelAddHtml;
		}
		function mainButtonMouseDown(e){
			if (e.ctrlKey) {
				let btn = pbuscript.mainButton;
				btn.startMoveY = e.clientY - btn.getBoundingClientRect().top;
				btn.classList.add('pbuscript-cursor-move');
				window.addEventListener('mousemove', mainButtonMouseMove);
				window.addEventListener('mouseup', mainButtonMouseUp);
				return;
			}
			pbuscript.mainPanel.classList.toggle('pbuscript-show');
		}
		function mainButtonMouseMove(e){
			let btn = pbuscript.mainButton;
			let top = (e.clientY - btn.startMoveY) / window.innerHeight * 100;
			btn.style.top = Math.min(Math.max(top, 0), 95) + '%';
		}
		function mainButtonMouseUp(){
			window.removeEventListener('mousemove', mainButtonMouseMove);
			window.removeEventListener('mouseup', mainButtonMouseUp);
			let btn = pbuscript.mainButton;
			btn.classList.remove('pbuscript-cursor-move');
			let top = btn.getBoundingClientRect().top / window.innerHeight * 100 + '%';
			localStorage.setItem('pbuscript_mainButtonPosY', top);
		}
		function moveBarMouseDown(e){
			let panel = e.target.parentElement;
			pbuscript._currentMovingPanel = panel;
			let rect = panel.getBoundingClientRect();
			panel.startMoveX = e.clientX - rect.left;
			panel.startMoveY = e.clientY - rect.top;
			window.addEventListener('mousemove', moveBarMouseMove);
			window.addEventListener('mouseup', moveBarMouseUp);
		}
		function moveBarMouseMove(e){
			let panel = pbuscript._currentMovingPanel;
			let left = (e.clientX - panel.startMoveX) / window.innerWidth * 100;
			let top = (e.clientY - panel.startMoveY) / window.innerHeight * 100;
			panel.style.left = Math.min(Math.max(left, 0), 95) + '%';
			panel.style.top = Math.min(Math.max(top, 0), 98) + '%';
		}
		function moveBarMouseUp(){
			window.removeEventListener('mousemove', moveBarMouseMove);
			window.removeEventListener('mouseup', moveBarMouseUp);
			let panel = pbuscript._currentMovingPanel;
			let rect = panel.getBoundingClientRect();
			let left = rect.left / window.innerWidth * 100 + '%';
			let top = rect.top / window.innerHeight * 100 + '%';
			let panelId = panel.getAttribute('id');
			localStorage.setItem(panelId + 'PosX', left);
			localStorage.setItem(panelId + 'PosY', top);
		}
		function mainPanelAddButton(text, fun){
			let btn = document.createElement('button');
			btn.classList.add('pbuscript-btn');
			btn.innerHTML = text;
			btn.addEventListener('click', fun);
			pbuscript.mainPanel.appendChild(btn);
			return btn;
		}
		function mainPanelAddHtml(html){
			let box = document.createElement('button');
			box.classList.add('pbuscript-textbox');
			box.innerHTML = html;
			pbuscript.mainPanel.appendChild(box);
			return box;
		}
	}

}
