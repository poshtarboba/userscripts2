(function(){

	if (location.host === 'www.facebook.com') addMobileBtn();
	if (location.host === 'www.facebook.com') closeAdverts();
	if (location.host === 'm.facebook.com') mobileMode();
	
	function addMobileBtn(){
		pbuscript.addStyle(getCSS(), 'pbus-css');
		let box = document.createElement('div');
		let pan = document.createElement('div');
		let btn = document.createElement('div');
		box.setAttribute('id', 'pbus_mobilebox');
		pan.setAttribute('id', 'pbus_mobilepan');
		btn.setAttribute('id', 'pbus_mobilebtn');
		btn.innerText = 'M';
		box.appendChild(pan);
		box.appendChild(btn);
		pan.addEventListener('mousedown', panDragStart);
		btn.addEventListener('click', () => location.host = 'm.facebook.com');
		let left = localStorage.getItem('pbus_mobilebox_xpos');
		let top = localStorage.getItem('pbus_mobilebox_ypos');
		if (left) box.style.left = left;
		if (top) box.style.top = top;
		document.body.appendChild(box);
		function getCSS(){
			let css = '#pbus_mobilebox{position:fixed;z-index:100000;left:310px;top:4px}\n';
			css += '#pbus_mobilepan{width:40px;height:12px;background:#e6e6e6;cursor:move}\n';
			css += '#pbus_mobilebtn{width:40px;height:40px;font-size:24px;lineHeight:40px;text-align:center;background:#e6e6e6;border-radius:50%;cursor:pointer}\n';
			css += '#pbus_mobilepan:hover,#pbus_mobilebtn:hover{background:#d6d6d6}';
			return css;
		}
		function panDragStart(e){
			let rect = box.getBoundingClientRect();
			box.startMoveX = e.clientX - rect.left;
			box.startMoveY = e.clientY - rect.top;
			window.addEventListener('mousemove', mouseMove);
			window.addEventListener('mouseup', mouseUp);
		}
		function mouseMove(e){
			let left = (e.clientX - box.startMoveX) / window.innerWidth * 100;
			let top = (e.clientY - box.startMoveY) / window.innerHeight * 100;
			btn.style.left = Math.min(Math.max(left, 0), 95) + '%';
			btn.style.top = Math.min(Math.max(top, 0), 95) + '%';
		}
		function mouseUp(){
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', mouseUp);
			let rect = box.getBoundingClientRect();
			let left = rect.left / window.innerWidth * 100 + '%';
			let top = rect.top / window.innerHeight * 100 + '%';
			localStorage.setItem('pbus_mobilebox_xpos', left);
			localStorage.setItem('pbus_mobilebox_ypos', top);
		}
	}
	function closeAdverts(){
		fun();
		setInterval(fun, 3000);
		function fun(){
			let selector = '[aria-label="Закрити"],[aria-label="Сховати"]';
			document.querySelectorAll(selector).forEach(e => e.click());
		}
	}
	function mobileMode(){
		document.body.style.width = '640px';
		document.body.style.marginLeft = 'auto';
		document.body.style.marginRight = 'auto';
	}

})();