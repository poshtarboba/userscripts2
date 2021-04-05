(function(){
	let noVideo = location.href.indexOf('youtube.com/watch?') < 0 && location.href.indexOf('youtube.com/embed/') < 0;
	if (noVideo) return;
	let controls = document.querySelector('.ytp-right-controls');
	if (!controls) return;
	let style = document.createElement('style');
	let styleHTML = '.pb-btn{position:relative;display:inline-block;padding:0 6px;vertical-align:top;cursor:pointer;opacity:.7}\n';
	styleHTML += '.pb-btn:hover{opacity:1}\n';
	styleHTML += '.pb-btn::before{content:"";position:absolute;left:2px;top:8px;right:2px;bottom:8px;border:1px solid #fff;border-radius:4px}\n';
	styleHTML += '.pb-btn.pb-active:before{background:#fff6}\n';
	styleHTML += '.ytp-right-controls{position:relative}\n';
	styleHTML += '.pb-play{position:absolute;left:0;top:-60px}\n';
	style.innerHTML = styleHTML;
	document.head.appendChild(style);
	let btn480p = createButton('Q', 'pb-quality');
	let btn200x = createButton('2x', 'pb-speed');
	let btn150x = createButton('1.5x', 'pb-speed');
	let btn125x = createButton('1.25x', 'pb-speed');
	let btn100x = createButton('1x', 'pb-speed');
	let btnPlay = createButton('▶', 'pb-play');
	controls.insertBefore(btn480p, controls.firstElementChild);
	controls.insertBefore(btn200x, controls.firstElementChild);
	controls.insertBefore(btn150x, controls.firstElementChild);
	controls.insertBefore(btn125x, controls.firstElementChild);
	controls.insertBefore(btn100x, controls.firstElementChild);
	controls.insertBefore(btnPlay, controls.firstElementChild);
	let speedButtons = document.querySelectorAll('.pb-speed');
	let btnGear = document.querySelector('.ytp-settings-button');
	addClick(btn480p, 'Якість', '480p');
	addClick(btn200x, 'Швидкість відтворення', '2');
	addClick(btn150x, 'Швидкість відтворення', '1.5');
	addClick(btn125x, 'Швидкість відтворення', '1.25');
	addClick(btn100x, 'Швидкість відтворення', 'Звичайна');
	btnPlay.addEventListener('click', () => {
		btnPlay.remove();
		delayClick(100, btn125x);
		delayClick(200, btn480p);
		if (location.href.indexOf('youtube.com/watch?') > -1) delayClick(300, document.querySelector('.ytp-play-button'));
		setTimeout(() => { document.querySelector('.video-stream').focus(); }, 1000);
	});

	function createButton(text, classNames){
		let btn = document.createElement('span');
		btn.innerText = text;
		btn.setAttribute('class', 'pb-btn ' + classNames);
		return btn;
	}
	function addClick(btn, firstLiText, secondLiText) {
		btn.addEventListener('click', function (){
			btnGear.click();
			let foundLi = false;
			document.querySelectorAll('.ytp-menuitem').forEach(li => {
				if (li.innerText.indexOf(firstLiText) < 0) return;
				li.click();
				document.querySelectorAll('.ytp-menuitem').forEach(li => {
					if (li.innerText.trim() !== secondLiText) return;
					foundLi = true;
					if (btn.classList.contains('pb-speed')) speedButtons.forEach(b => b.classList.remove('pb-active'));
					btn.classList.add('pb-active');
					li.click();
				});
			});
			if (!foundLi) btnGear.click();
		});
	}
	function delayClick(time, elem){
		setTimeout(() => { elem.dispatchEvent(new Event('click')); }, time);
	}
})();
