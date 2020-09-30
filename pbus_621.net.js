(function(){

	addStyles();
	scrollToImage();
	rareTags();

	function addStyles(){
		//let css = 'html.pbuscript-smooth{scroll-behavior:smooth}\n';
		let css = '#image{width:auto;height:auto;max-width:calc(100vw-320px);max-height:98vh}\n';
		css += '.pbuscript-tag1{opacity:.1}\n';
		css += '.pbuscript-tag2{opacity:.2}\n';
		css += '.pbuscript-tag3{opacity:.3}\n';
		css += '.pbuscript-tag4{opacity:.4}\n';
		css += '.pbuscript-tag5{opacity:.6}\n';
		css += '.pbuscript-tag:hover{opacity:1}\n';
		pbuscript.addStyle(css, 'pbuscript-style-e621');
	}

	function scrollToImage(){
		let img = document.getElementById('image') || document.getElementById('webm-container');
		if (!img) return;
		document.documentElement.scrollTop += img.getBoundingClientRect().top - 4;
	}

	function rareTags(){
		let list = document.getElementById('tag-list') || document.getElementById('tag-box');
		if (!list) return;
		let items = list.querySelectorAll('li');
		items.forEach((li) => {
			let spanCount = li.querySelector('.post-count');
			if (!spanCount) return;
			li.classList.add('pbuscript-tag');
			let className = '';
			let s = spanCount.innerText;
			let n = parseFloat(s);
			if (s.includes('k')) n *= 1000;
			if (s.includes('m')) n *= 1000000;
			if (n > 100000) className = 'pbuscript-tag1';
			else if (n > 20000) className = 'pbuscript-tag2';
			else if (n > 10000) className = 'pbuscript-tag3';
			else if (n > 5000) className = 'pbuscript-tag4';
			else if (n > 1000) className = 'pbuscript-tag5';
			if (className) li.classList.add(className);
		});
	}

})();