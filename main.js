(function (){
	window.PBUS = {};
	console.info('PBUS> main.js');
	//document.addEventListener('DOMContentLoaded', () => console.log('>>>>>>> Document DOMContentLoaded'));

	window.onload = function (){ console.log('>>> window load'); };
	window.addEventListener('load', function (){ console.log('>>> window load2'); });

	saveEventListener();


	function saveEventListener(){
		if (!localStorage.getItem('saveEventsFromListener')) return;
		window.PBUS.events = [];
		EventTarget.prototype.old_addEventListener = EventTarget.prototype.addEventListener;
		EventTarget.prototype.addEventListener = function (type, listener, options){
			window.PBUS.events.push({
				type: type,
				target: this,
				listener: listener,
				options: options
			});
			this.old_addEventListener(type, listener, options);
		}
		window.addEventListener('load', () => {
			console.log('PBUS> ' + window.PBUS.events.length + ' events saved to PBUS.events');
		});
	}

})()
