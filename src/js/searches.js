const ready = require('./utils/documentReady.js');

ready(function() {
	const collapseElementList = document.querySelectorAll('.searches-list .accordion-collapse')
	const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl, {toggle: false}));

	const searchesAccordion = document.querySelector('.searches-list');
	if (!searchesAccordion) {
		return;
	}
	searchesAccordion.addEventListener('shown.bs.collapse', function(e) {
		let itemLabel = document.querySelector(`label[data-bs-target="#${e.target.id}"]`);
		let input = itemLabel && itemLabel.querySelector('input');
		input.checked = true;
	});

	searchesAccordion.addEventListener('hidden.bs.collapse', function(e) {
		let itemLabel = document.querySelector(`label[data-bs-target="#${e.target.id}"]`);
		let input = itemLabel && itemLabel.querySelector('input');
		input.checked = false;
	});

	var searchInputs = document.querySelectorAll('.searches-list .field-checkbox__input');
	for (let i=0; i<searchInputs.length; i++) {
		searchInputs[i].checked = false;
	}
});