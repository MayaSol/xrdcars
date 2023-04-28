const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
// const rangeSlider = require('./utils/range-slider.js');
import rangeSlider from './utils/range-slider.js';

ready(function() {
	console.log('rangeSlider');
	console.log(rangeSlider);

    let filterMilageWrapper = document.querySelector('.filter-milage');
    console.log('filterMilageWrapper');
    console.log(filterMilageWrapper);
    if (!filterMilageWrapper) {
        return;
    }
    let milageFilter = new rangeSlider(filterMilageWrapper, {
        range: {
            'min': 0,
            'max': 100000
        },
        step: 5000,
        start: [0, 100000],
    });

    let milageFromInput = filterMilageWrapper.querySelector('.range__value-item--from input');
    let milageToInput = filterMilageWrapper.querySelector('.range__value-item--to input');

    let milageFromSelect = document.querySelector('.filter-milage__from select');

    let milageValues = [0, 5000, 10000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    let milageFromChoiceList = milageValues.map((value) => {
        return {
            value: value,
            label: new Intl.NumberFormat('ru-RU').format(value),
            selected: false,
            disabled: false
        };
    });
    console.log(milageFromChoiceList);

    let milageFromChoice = milageFromSelect && new Choices(milageFromSelect, {
    	searchEnabled: false,
        shouldSort: false,
        choices: milageFromChoiceList
    });
    console.log(milageFromChoice);
    milageFromChoice.passedElement.element.addEventListener('change', function(event) {
    	console.log('milageFromChoice change');
    	milageFromInput.value = event.detail.value;
    	// MilageFromInput.dispatchEvent(new Event('change'));
    });



    let milageToSelect = document.querySelector('.filter-milage__to select');
    let milageToChoiceList = milageFromChoiceList;
    milageToChoiceList[milageToChoiceList.length-1].selected = true;
    let milageToChoice = milageToSelect && new Choices(milageToSelect, {
    	searchEnabled: false,
        shouldSort: false,
        choices: milageToChoiceList
    });
    milageToChoice.passedElement.element.addEventListener('change', function(event) {
    	console.log('milageToChoice change');
    	milageToInput.value = event.detail.value;
    	// milageToInput.dispatchEvent(new Event('change'));
    });
});