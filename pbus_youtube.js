(function(){
	let noVideo = location.href.indexOf('youtube.com/watch?') < 0 && location.href.indexOf('youtube.com/embed/') < 0;
	if (noVideo) return;
	let controls = document.querySelector('.ytp-right-controls');
	if (!controls) return;
	let style = document.createElement('style');
	style.innerHTML = '.pb-btn{position:relative;display:inline-block;padding:0 6px;vertical-align:top;cursor:pointer;opacity:.7}.pb-btn:hover{opacity:1}.pb-btn::before{content:"";position:absolute;left:2px;top:8px;right:2px;bottom:8px;border:1px solid #fff;border-radius:4px}.pb-btn.pb-active:before{background:#fff6}';
	document.head.appendChild(style);
	let btn480p = createButton('Q', 'pb-quality');
	let btn200x = createButton('2x', 'pb-speed');
	let btn150x = createButton('1.5x', 'pb-speed');
	let btn125x = createButton('1.25x', 'pb-speed');
	let btn100x = createButton('1x', 'pb-speed');
	controls.insertBefore(btn480p, controls.firstElementChild);
	controls.insertBefore(btn200x, controls.firstElementChild);
	controls.insertBefore(btn150x, controls.firstElementChild);
	controls.insertBefore(btn125x, controls.firstElementChild);
	controls.insertBefore(btn100x, controls.firstElementChild);
	let speedButtons = document.querySelectorAll('.pb-speed');
	let btnGear = document.querySelector('.ytp-settings-button');
	addClick(btn480p, 'Якість', '480p');
	addClick(btn200x, 'Швидкість відтворення', '2');
	addClick(btn150x, 'Швидкість відтворення', '1.5');
	addClick(btn125x, 'Швидкість відтворення', '1.25');
	addClick(btn100x, 'Швидкість відтворення', 'Звичайна');
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
})();
