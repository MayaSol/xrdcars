const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
// const rangeSlider = require('./utils/range-slider.js');
import filterRange from './utils/filter-range.js';

ready(function() {

    let filterMilageConfig = {
        rangeConfig: {
            range: {
                'min': 0,
                'max': 100000
            },
            step: 5000,
            start: [0, 100000],
        },
        values: [0, 5000, 10000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]
    };

    let filterMilageWrapper = document.querySelector('#search-advanced .filter-milage');
    let milageFilter = new filterRange(
        filterMilageWrapper,
        filterMilageConfig
    );


    let filterMilageWrapperAdd = document.querySelector('#add-search-for-newsletter .filter-milage');
    let milageFilterAdd = new filterRange(
        filterMilageWrapperAdd, 
        filterMilageConfig
    );

    let filterMilageWrapperPage = document.querySelector('#advanced-search-page-filter .filter-milage');
    let milageFilterPage = new filterRange(
        filterMilageWrapperPage,
        filterMilageConfig
    );

    let filterMilageWrapperChoose = document.querySelector('#choose-car .filter-milage');
    let milageFilterChoose = new filterRange(
        filterMilageWrapperChoose,
        filterMilageConfig
    );


});