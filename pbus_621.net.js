(function(){

	addStyles();
	scrollToImage();
	rareTags();

	function addStyles(){
		//let css = 'html.pbuscript-smooth{scroll-behavior:smooth}\n';
		let css = '.pbuscript-tag1{opacity:.05}\n';
		css += '.pbuscript-tag2{opacity:.1}\n';
		css += '.pbuscript-tag3{opacity:.15}\n';
		css += '.pbuscript-tag4{opacity:.2}\n';
		css += '.pbuscript-tag5{opacity:.25}\n';
		css += '.pbuscript-tag6{opacity:.3}\n';
		css += '.pbuscript-tag7{opacity:.5}\n';
		css += '.pbuscript-tag:hover{opacity:1}\n';
		pbuscript.addStyle(css, 'pbuscript-style-e621');
	}

	function scrollToImage(){
		let img = document.getElementById('image') || document.getElementById('webm-container');
		if (!img) return;
		document.documentElement.scrollTop += img.getBoundingClientRect().top - 4;
	}

	function rareTags(){
		let list = document.getElementById('tag-list') || document.getElementById('tab-box');
		let items = list.querySelectorAll('li');
		items.forEach((li) => {
			let spanCount = li.querySelector('.post-count');
			if (!spanCount) return;
			li.classList.add('pbuscript-tag');
			let className = '';
			let n = +spanCount.innerText.replace('k', '000').replace('m', '000000');
			if (n > 100000) className = 'pbuscript-tag1';
			else if (n > 20000) className = 'pbuscript-tag2';
			else if (n > 10000) className = 'pbuscript-tag3';
			else if (n > 3000) className = 'pbuscript-tag4';
			else if (n > 1000) className = 'pbuscript-tag5';
			else if (n > 500) className = 'pbuscript-tag6';
			else if (n > 200) className = 'pbuscript-tag7';
		});
	}

})();