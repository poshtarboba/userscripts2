(function(){

	addButton();

	function addButton(){
		let css = 'img.fully{width:100%;max-width:400px}';
		let style = document.createElement('style');
		style.innerHTML = css;
		document.head.appendChild(style);
		let btn = document.createElement('button');
		btn.setAttribute('style', 'position:fixed;right:20px;top:150px;z-index:9900;cursor:pointer');
		btn.innerText = 'Full images';
		document.body.appendChild(btn);
		btn.addEventListener('click', () => {
			btn.remove();
			document.querySelectorAll('a > img').forEach(img => {
				img.setAttribute('style', '');
				img.setAttribute('src', img.parentElement.href);
				img.classList.add('fully');
			});
		});
	}

})();