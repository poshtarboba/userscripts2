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
	pbuscript.createLenta = createLenta;            /* (array urls [, int delay = 1000]), url: { url, src } */

	const PATH = 'https://poshtarboba.github.io/userscripts2/';
	const VIDEO = '3g2 3gp asf avi divx flv m4v mkv mov mp4 mpeg mpg ts webm wmv'.split(' ');

	if (location.host === 'e621.net') loadJS('pbus_621.net.js');
	if (location.host.indexOf('facebook.com') > -1) loadJS('pbus_facebook.js');
	if (location.host.indexOf('youtube.com/watch?') > -1) loadJS('pbus_youtube.js');

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
			let css = '#pbuscript_mainbutton{position:fixed;z-index:100600;right:-20px;top:80%;width:60px;height:60px;background:#eee url(https://poshtarboba.github.io/userscripts2/gear.png) no-repeat 10px 18px / 24px 24px;border:1px solid #999;border-radius:50% 0 0 50%;cursor:pointer;opacity:0.2;user-select:none}\n';
			css += '#pbuscript_mainbutton:hover{opacity:1}\n';
			css += '#pbuscript_mainbutton.pbuscript-cursor-move{cursor:move}\n';
			css += '#pbuscript_mainpanel{display:none;position:fixed;z-index:100602;left:80%;top:10%;padding:1px;min-width:64px;background:#eee;border:1px solid #999;opacity:.5}\n';
			css += '#pbuscript_mainpanel:hover,#pbuscript_mainpanel.active{opacity:1}\n';
			css += '#pbuscript_mainpanel.pbuscript-show{display:block}\n';
			css += '.pbuscript-movebar{height:8px;background:repeating-linear-gradient(-45deg,#eee,#eee 5px,#ccc 5px,#ccc 6px);cursor:move;user-select:none}\n';
			css += '.pbuscript-btn{display:block;margin-top:2px;width:100%;white-space:nowrap;cursor:pointer;opacity:0.7}\n';
			css += '.pbuscript-btn:not(:disabled):hover{opacity:1}\n';
			css += '.pbuscript-box{margin-top:2px;padding:2px 4px 1px;white-space:nowrap;border:1px solid silver}\n';
			css += '.pbuscript-box a{text-decoration:none}\n';
			css += '.pbuscript-box a:hover{text-decoration:underline}\n';
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
			panel.addBox = mainPanelAddBox;
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
		function mainPanelAddBox(html, id){
			let box = document.createElement('div');
			box.classList.add('pbuscript-box');
			if (id) box.setAttribute('id', id);
			box.innerHTML = html;
			pbuscript.mainPanel.appendChild(box);
			return box;
		}
	}

	function createLenta(urls, delay = 100){
		pbuscript.btnLenta = {};
		pbuscript.boxLenta = {};
		createNewHTML(urls);
		createCss();
		pbuscript.createMainpanel();
		pbuscript.mainPanel.show();
		pbuscript.mainPanel.classList.add('active');
		addButtons();
		addHotkeys();
		loadViewFromLocalStorage();
		window.dispatchEvent(new Event('lenta.loadstart'));
		lazyLoad(delay);
		function createNewHTML(urls){
			let html = '<head><meta charset="utf-8"><title></title></head><body class="lenta-view-default"><div class="lenta-wrap">';
			urls.forEach((url) => {
				let filename = url.src.split('/').pop();
				let ext = filename.split('.').pop().toLowerCase();
				let src = ' src="" data-src="' + url.src + '" ';
				html += '<div class="lenta-img"><span>';
				html += VIDEO.includes(ext) ? '<video' + src + 'controls loop></video>' : '<img' + src + 'alt="' + filename + '">';
				html += '<a href="' + url.url + '" target="_blank">page</a><span></div>';
			});
			html += '</div><div id="lenta_fullsize"></div></body>';
			document.documentElement.innerHTML = html;
			let firstImg = document.querySelector('lenta-img');
			if (firstImg) firstImg.classList.add('active');
			pbuscript.boxLenta.loaded = 0;
			pbuscript.boxLenta.total = urls.length;
		}
		function createCss(){
			let css = 'body{margin:0;background:#000}\n';
			css += '.lenta-img{padding:1vh 0;color:#999;text-align:center}\n';
			css += '.lenta-img span{display:inline-block;position:relative}\n';
			css += '.lenta-img.active span{outline:2px solid yellow}\n';
			css += '.lenta-img a{display:none;position:absolute;right:0;top:0;padding:2px 8px 5px;text-decoration:none;background:#999;border:1px solid silver}\n';
			css += '.lenta-img a:hover{text-decoration:underline}\n';
			css += '.lenta-img span:hover a{display:block}\n';
			css += '.lenta-img img,.lenta-img video{display:inline-block;max-width:98vw;max-height:98vh;vertical-align:middle}\n';
			css += '.lenta-view-full .lenta-img img,.lenta-view-full .lenta-img video{max-width:none;max-height:none}\n';
			css += '.lenta-view-line{overflow-y:hidden}\n';
			css += '.lenta-view-line .lenta-wrap{white-space:nowrap}\n';
			css += '.lenta-view-line .lenta-img{display:inline-block;padding:0 2px}\n';
			css += '.lenta-view-line .lenta-img img,.lenta-view-line .lenta-img video{max-height:96vh}\n';
			css += '.lenta-view-thumb1 .lenta-img,.lenta-view-thumb2 .lenta-img,.lenta-view-thumb3 .lenta-img,.lenta-view-thumb4 .lenta-img{display:inline-block;padding:2px}\n';
			css += '.lenta-view-thumb1 .lenta-img img,.lenta-view-thumb1 .lenta-img video{max-height:100px}\n';
			css += '.lenta-view-thumb2 .lenta-img img,.lenta-view-thumb1 .lenta-img video{max-height:180px}\n';
			css += '.lenta-view-thumb3 .lenta-img img,.lenta-view-thumb1 .lenta-img video{max-height:260px}\n';
			css += '.lenta-view-thumb4 .lenta-img img,.lenta-view-thumb1 .lenta-img video{max-height:340px}\n';
			css += '#lenta_counter{text-align:center}\n';
			addStyle(css, 'lenta-style-main');
		}
		function addButtons(){
			pbuscript.btnLenta.viewDefault = pbuscript.mainPanel.addButton('default', () => changeView('default'));
			pbuscript.btnLenta.viewFull = pbuscript.mainPanel.addButton('full', () => changeView('full'));
			pbuscript.btnLenta.viewLine = pbuscript.mainPanel.addButton('line', () => changeView('line'));
			pbuscript.btnLenta.viewThumb1 = pbuscript.mainPanel.addButton('th-1', () => changeView('thumb1'));
			pbuscript.btnLenta.viewThumb2 = pbuscript.mainPanel.addButton('th-2', () => changeView('thumb2'));
			pbuscript.btnLenta.viewThumb3 = pbuscript.mainPanel.addButton('th-3', () => changeView('thumb3'));
			pbuscript.btnLenta.viewThumb4 = pbuscript.mainPanel.addButton('th-4', () => changeView('thumb4'));
			pbuscript.btnLenta.viewDefault.disabled = true;
			let allView = [];
			for (let key in pbuscript.btnLenta) allView.push(pbuscript.btnLenta[key]);
			pbuscript.btnLenta.allView = allView;
			let html = '<span id="lenta_count_loaded">0</span> / <span id="lenta_total_count">0</span>';
			pbuscript.boxLenta.boxCounter = pbuscript.mainPanel.addBox(html, 'lenta_counter');
			pbuscript.boxLenta.spanLoaded = document.getElementById('lenta_count_loaded');
			pbuscript.boxLenta.spanTotal = document.getElementById('lenta_total_count');
			pbuscript.boxLenta.spanTotal.innerText = pbuscript.boxLenta.total;
		}
		function addHotkeys(){
			window.addEventListener('keydown', function (e){
				console.log(e.code);
			});
		}
		function changeView(viewType){
			pbuscript.btnLenta.allView.forEach((btn) => btn.disabled = false);
			pbuscript.btnLenta['view' + viewType[0].toUpperCase() + viewType.slice(1)].disabled = true;
			document.body.className = document.body.className.split(' ').filter(s => s.substr(0, 11) !== 'lenta-view-').join(' ');
			document.body.classList.add('lenta-view-' + viewType);
			localStorage.setItem('pbuscript_lentaView', viewType);
		}
		function loadViewFromLocalStorage(){
			let viewType = localStorage.getItem('pbuscript_lentaView');
			if (viewType) changeView(viewType);
		}
		function lazyLoad(delay){
			let img = document.querySelector('[data-src]');
			if (!img) {
				window.dispatchEvent(new Event('lenta.loadend'));
				return;
			}
			img.addEventListener('loadend', () => {
				pbuscript.boxLenta.spanLoaded.innerText = ++pbuscript.boxLenta.loaded;
				lazyLoad(delay);
			});
			setTimeout(() => {
				img.setAttribute('src', img.dataset.src);
				img.removeAttribute('data-src');
			}, delay);
		}
	}
}

/* TODO:
Lenta
- клік по картинці в режимі thumb* - відкриває в діалоговому вікні повнорозмірно (для відео не повинно працювати).
- переміщення активної картинки клавішами Q, A/W сторінка скролиться за активною картинкою, натискання S в режимі thumb* відкриває картинку в повному розмірі (не спрацьовувати якщо натиснуті ctrl, shift, alt)
- при зміні режиму активну картинку помістити в центр екрана (проскролити сторінку)
*/
