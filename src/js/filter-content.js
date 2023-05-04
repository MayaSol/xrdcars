const ready = require('./utils/documentReady.js');
const closest = require('closest');

ready(function() {
	const filter = document.getElementById('advanced-search-page-filter');
	if (!filter) {
		return;
	}
	filter.addEventListener('click', function(event) {
		console.log('filter click: ' + event.target.classList[0]);
		if (event.target.classList.contains('btn--clear-filter')) {
			console.log('btn clear click');
			var filterMark = this.querySelector('.filter-main__mark-select');
			if (filterMark) {
				filterMark.dispatchEvent(new Event('clear-filter'));
			}
		    let filterYear = this.querySelector('#advanced-search-page-filter .filter-year');
		    if (filterYear) {
			    filterYear.dispatchEvent(new Event('clear-filter'));
		    }
		    let filterMilage = this.querySelector('#advanced-search-page-filter .filter-milage');
		    if (filterMilage) {
			    filterMilage.dispatchEvent(new Event('clear-filter'));
		    }
		    let filterPrice = this.querySelector('.filter-price');
		    if (filterPrice) {
			    filterPrice.dispatchEvent(new Event('clear-filter'));
		    }
		    let filterConditionAll = this.querySelector('.filter-condition input[value="all"]');
		    if (filterConditionAll) {
			    filterConditionAll.checked = true;
		    }
		    let filterType = this.querySelector('.filter-type select');
		    if (filterType) {
			    filterType.dispatchEvent(new Event('set-default'));
		    }
		    let filterTransmission = this.querySelector('.filter-transmission select');
		    if (filterTransmission) {
			    filterTransmission.dispatchEvent(new Event('set-default'));
		    }
		    let filterEngine = this.querySelector('.filter-engine select');
		    if (filterEngine) {
			    filterEngine.dispatchEvent(new Event('set-default'));
		    }
		    let filterDrive = this.querySelector('.filter-drive input[name="drive"]');
		    if (filterDrive) {
			    filterDrive.checked = false;
		    }
		}
	});
	const clearBtn = document.querySelector('#advanced-search-page-filter .btn--clear-filter');
});