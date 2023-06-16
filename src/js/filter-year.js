const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
// const rangeSlider = require('./utils/range-slider.js');
import filterRange from './utils/filter-range.js';

ready(function() {

    let filterYearConfig = {
        rangeConfig: {
            range: {
                'min': 1000,
                'max': 3000
            },
            step: 1,
            start: [1000, 3000],
            noFormat: true
        }
    };

    let filterYearWrapper = document.querySelector('#search-advanced .filter-year');
    let filterYear = new filterRange(
        filterYearWrapper,
        filterYearConfig
    );

    let filterYearWrapperAdd = document.querySelector('#add-search-for-newsletter .filter-year');
    let filterYearAdd = new filterRange(
        filterYearWrapperAdd,
        filterYearConfig
    );

    let filterYearWrapperPage = document.querySelector('#advanced-search-page-filter .filter-year');
    let filterYearPage = new filterRange(
        filterYearWrapperPage,
        filterYearConfig
    );

    let filterYearWrapperChoose = document.querySelector('#choose-car .filter-year');
    let filterYearChoose = new filterRange(
        filterYearWrapperChoose,
        filterYearConfig
    );

});