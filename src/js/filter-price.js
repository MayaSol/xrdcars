const ready = require('./utils/documentReady.js');
// const rangeSlider = require('./utils/range-slider.js');
import filterRange from './utils/filter-range.js';

ready(function() {

    let values = [];

    for (let i=0; i<=100000000; i+=5000000) {
        values.push(i);
    }


    let filterPriceConfig = {
        rangeConfig: {
            range: {
                'min': 1500000,
                'max': 100000000
            },
            step: 500000,
            start: [1500000, 100000000],
        },
        values: values
    };


    let filterPriceWrapper = document.querySelector('#search-advanced  .filter-price');
    let filterPrice = new filterRange(
        filterPriceWrapper,
        filterPriceConfig
    );

    let filterPriceWrapperAdd = document.querySelector('#add-search-for-newsletter  .filter-price');
    let filterPriceAdd = new filterRange(
        filterPriceWrapperAdd,
        filterPriceConfig
    );

    let filterPriceWrapperPage = document.querySelector('#advanced-search-page-filter  .filter-price');
    let filterPricePage = new filterRange(
        filterPriceWrapperPage,
        filterPriceConfig
    );

    let filterPriceWrapperChoose = document.querySelector('#choose-car .filter-price');
    let filterPriceChoose = new filterRange(
        filterPriceWrapperChoose,
        filterPriceConfig
    );

});