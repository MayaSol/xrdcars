const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
import rangeSlider from './utils/range-slider.js';

ready(function() {
    console.log('filter-price.js');

    let filterPriceWrapper = document.querySelector('.filter-price');
    if (!filterPriceWrapper) {
        return;
    }
    let priceFilter = new rangeSlider(filterPriceWrapper, {
        range: {
            'min': 1500000,
            'max': 100000000
        },
        step: 500000,
        start: [1500000, 100000000],
    });

    let priceFromInput = filterPriceWrapper.querySelector('.range__value-item--from input');
    let priceToInput = filterPriceWrapper.querySelector('.range__value-item--to input');


    let priceValuesFrom = [];

    for (let i=500000; i<=100000000; i+=500000) {
        let item = {
            value: i,
            label: new Intl.NumberFormat('ru-RU').format(i),
            selected: false,
            disabled: false
        }
        priceValuesFrom.push(item);
    }

    let priceFromSelect = document.querySelector('.filter-price__from select');
    let priceFromChoice = priceFromSelect && new Choices(priceFromSelect, {
    	searchEnabled: false,
        shouldSort: false,
        choices: priceValuesFrom
    });
    priceFromChoice.passedElement.element.addEventListener('change', function(event) {
    	priceFromInput.value = event.detail.value;
    });

    let priceValuesTo = priceValuesFrom;
    priceValuesTo[priceValuesTo.length - 1].selected = true;

    let priceToSelect = document.querySelector('.filter-price__to select');
    let priceToChoice = priceToSelect && new Choices(priceToSelect, {
    	searchEnabled: false,
        shouldSort: false,
        choices: priceValuesTo
    });
    priceToChoice.passedElement.element.addEventListener('change', function(event) {
    	priceToInput.value = event.detail.value;
    });
});