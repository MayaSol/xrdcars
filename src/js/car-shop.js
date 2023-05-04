const ready = require('./utils/documentReady.js');

ready(function() {
	console.log('car-shop.js');
	let icons = document.querySelectorAll('.car-shop-content__icons');
	for (icon of icons) {
		let interval = setInterval(function() {
			icon.classList.toggle('car-shop-content__icons--video');
		}, 2000);
	}
});