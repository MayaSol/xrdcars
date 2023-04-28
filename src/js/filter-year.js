const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
// const rangeSlider = require('./utils/range-slider.js');
import rangeSlider from './utils/range-slider.js';

ready(function() {
	console.log('rangeSlider');
	console.log(rangeSlider);

    let filterYearWrapper = document.querySelector('.filter-year');
    if (!filterYearWrapper) {
        return;
    }
    let yearFilter = new rangeSlider(filterYearWrapper, {
        range: {
            'min': 2017,
            'max': 2023
        },
        step: 1,
        start: [2017, 2023],
        noFormat: true
    });

    let yearFromInput = filterYearWrapper.querySelector('.range__value-item--from input');
    let yearToInput = filterYearWrapper.querySelector('.range__value-item--to input');

    let yearFromSelect = document.querySelector('.filter-year__from select');
    let yearFromChoice = yearFromSelect && new Choices(yearFromSelect, {
    	searchEnabled: false,
        shouldSort: false,
    });
    console.log(yearFromChoice);
    yearFromChoice.passedElement.element.addEventListener('change', function(event) {
    	console.log('yearFromChoice change');
    	yearFromInput.value = event.detail.value;
    	// yearFromInput.dispatchEvent(new Event('change'));
    });
    let yearToSelect = document.querySelector('.filter-year__to select');
    let yearToChoice = yearToSelect && new Choices(yearToSelect, {
    	searchEnabled: false,
        shouldSort: false,
    });
    yearToChoice.passedElement.element.addEventListener('change', function(event) {
    	console.log('yearToChoice change');
    	yearToInput.value = event.detail.value;
    	// yearToInput.dispatchEvent(new Event('change'));
    });
});