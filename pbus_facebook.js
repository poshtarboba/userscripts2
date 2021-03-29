(function(){

	if (location.host === 'www.facebook.com') location.host = 'm.facebook.com';
	if (location.host === 'm.facebook.com') {
		document.body.style.width = '640px';
		document.body.style.marginLeft = 'auto';
		document.body.style.marginRight = 'auto';
	}

})();