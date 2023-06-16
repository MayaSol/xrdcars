const ready = require('./utils/documentReady.js');

ready(function() {
	let icons = document.querySelectorAll('.car-shop-content__icons');
	for (let icon of icons) {
		let interval = setInterval(function() {
			icon.classList.toggle('car-shop-content__icons--video');
		}, 2000);
	}

	$(document).on('change', '#input-sort', function (e) {
		window.location.href = e.target.value;
	});
});