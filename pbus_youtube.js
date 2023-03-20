(function(){
	let noVideo = location.href.indexOf('youtube.com/watch?') < 0 && location.href.indexOf('youtube.com/embed/') < 0;
	if (noVideo) return;
	let controls = document.querySelector('.ytp-left-controls');
	if (!controls) return;
	removeElements();
	let style = document.createElement('style');
	let styleHTML = '.pb-btn{position:relative;display:inline-block;padding:0 6px;vertical-align:top;cursor:pointer;opacity:.7}\n';
	styleHTML += '.pb-btn:hover{opacity:1}\n';
	styleHTML += '.pb-btn::before{content:"";position:absolute;left:2px;top:8px;right:2px;bottom:8px;border:1px solid #fff;border-radius:4px}\n';
	styleHTML += '.pb-btn.pb-active:before{background:#fff8}\n';
	styleHTML += '.ytp-chrome-controls{position:relative;z-index:5000}\n';
	styleHTML += '.ytp-left-controls{position:relative;overflow:visible !important}\n';
	styleHTML += '.pb-span-box{position:relative}\n';
	styleHTML += '.pb-span-box:hover:before{content:"";position:absolute;left:-4px;bottom:100%;width:254px;height:50px;background:rgba(0,0,0,0.4);border-radius:4px}\n';
	styleHTML += '.pb-speed{position:absolute;display:none;top:-50px}\n';
	styleHTML += '.pb-span-box:hover .pb-speed{display:block}\n';
	styleHTML += '.pb-speed-100x{left:0}\n';
	styleHTML += '.pb-speed-125x{left:25px}\n';
	styleHTML += '.pb-speed-150x{left:67px}\n';
	styleHTML += '.pb-speed-200x{left:102px}\n';
	styleHTML += '.pb-speed-075x{left:127px}\n';
	styleHTML += '.pb-speed-050x{left:169px}\n';
	styleHTML += '.pb-speed-025x{left:204px}\n';
	styleHTML += '#sponsor-button,.ytp-next-button,.ytp-miniplayer-button,.ytp-chapter-container{display:none !important}\n';
	styleHTML += '#top-level-buttons-computed > *:not(:first-child) yt-formatted-string{font-size:0 !important}\n';
	style.innerHTML = styleHTML;
	document.head.appendChild(style);
	let spanBox = document.createElement('span');
	spanBox.classList.add('pb-span-box');
	let btn480p = createButton('Q', 'pb-quality');
	let btn200x = createButton('2x', 'pb-speed pb-speed-200x');
	let btn150x = createButton('1.5x', 'pb-speed pb-speed-150x');
	let btn125x = createButton('1.25x', 'pb-speed pb-speed-125x');
	let btn100x = createButton('1x', 'pb-speed pb-speed-100x');
	let btn075x = createButton('0.75x', 'pb-speed pb-speed-075x');
	let btn050x = createButton('0.5x', 'pb-speed pb-speed-050x');
	let btn025x = createButton('0.25x', 'pb-speed pb-speed-025x');
	let btnPlay = createButton('▶', 'pb-play');
	spanBox.appendChild(btn480p);
	spanBox.appendChild(btnPlay);
	spanBox.appendChild(btn100x);
	spanBox.appendChild(btn125x);
	spanBox.appendChild(btn150x);
	spanBox.appendChild(btn200x);
	spanBox.appendChild(btn075x);
	spanBox.appendChild(btn050x);
	spanBox.appendChild(btn025x);
	controls.appendChild(spanBox);
	let speedButtons = document.querySelectorAll('.pb-speed');
	let btnGear = document.querySelector('.ytp-settings-button');
	addClick(btn480p, 'Якість', '480p');
	addClick(btn200x, 'Швидкість відтворення', '2');
	addClick(btn150x, 'Швидкість відтворення', '1.5');
	addClick(btn125x, 'Швидкість відтворення', '1.25');
	addClick(btn100x, 'Швидкість відтворення', 'Звичайна');
	addClick(btn075x, 'Швидкість відтворення', '0.75');
	addClick(btn050x, 'Швидкість відтворення', '0.5');
	addClick(btn025x, 'Швидкість відтворення', '0.25');
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
	function delayClick(time, elem) {
		setTimeout(() => { elem.dispatchEvent(new Event('click')); }, time);
	}
})();
