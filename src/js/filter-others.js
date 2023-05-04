const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');


ready(function() {

    const config = {
        searchEnabled: false,
        shouldSort: false,
    };

    // Тип
	// let typeSelect = document.querySelector('#search-advanced .filter-type select');
 //    let typeChoice = typeSelect && new Choices(typeSelect, {
 //    	searchEnabled: false,
 //        shouldSort: false,
 //    });

    let typeChoice = setChoiceFilter(
        '#search-advanced .filter-type select',
        config,
        {default: "0"}
    );

    // let typeSelectAdd = document.querySelector('#add-search-for-newsletter .filter-type select');
    // let typeChoiceAdd = typeSelectAdd && new Choices(typeSelectAdd, {
    //     searchEnabled: false,
    //     shouldSort: false,
    // });

    let typeChoiceAdd = setChoiceFilter(
        '#add-search-for-newsletter .filter-type select',
        config,
        {default: "0"}
    );

    let typeChoicePage = setChoiceFilter('#advanced-search-page-filter .filter-type select', config, {default: '0'});

    //  Передача
	// let transmissionSelect = document.querySelector('#search-advanced .filter-transmission select');
 //    let transmissionChoice = transmissionSelect && new Choices(transmissionSelect, {
 //    	searchEnabled: false,
 //        shouldSort: false,
 //    });

    let transmissionChoice = setChoiceFilter(
        '#search-advanced .filter-transmission select',
        config,
        {default: "0"}
    );


    // let transmissionSelectAdd = document.querySelector('#add-search-for-newsletter .filter-transmission select');
    // let transmissionChoiceAdd = transmissionSelectAdd && new Choices(transmissionSelectAdd, {
    //     searchEnabled: false,
    //     shouldSort: false,
    // });

    let transmissionChoiceAdd = setChoiceFilter(
        '#add-search-for-newsletter .filter-transmission select',
        config,
        {default: "0"}
    );

    let transmissionChoicePage = setChoiceFilter(
        '#advanced-search-page-filter .filter-transmission select', 
        config,
        {default: '0'}
    );

    //  Двигатель
    // let engineSelect = document.querySelector('#search-advanced .filter-engine select');
    // let engineChoice = engineSelect && new Choices(engineSelect, {
    //     searchEnabled: false,
    //     shouldSort: false,
    // });

    let engineChoice = setChoiceFilter(
        '#search-advanced .filter-engine select',
        config,
        {default: "0"}
    );


    // let engineSelectAdd = document.querySelector('#add-search-for-newsletter .filter-engine select');
    // let engineChoiceAdd = engineSelectAdd && new Choices(engineSelectAdd, {
    //     searchEnabled: false,
    //     shouldSort: false,
    // })

    let engineChoiceAdd = setChoiceFilter(
        '#add-search-for-newsletter .filter-engine select',
        config,
        {default: "0"}
    );


    let engineChoicePage = setChoiceFilter(
        '#advanced-search-page-filter .filter-engine select',
        config,
        {default: '0'}
    );



});


function setChoiceFilter(selector, config, settings = {}) {
    let element = document.querySelector(selector);
    if (!element) {
        return;
    }
    let choice = element && new Choices(element, config);
    if (settings.default) {
        element.addEventListener('set-default', function() {
            console.log('set-default');
            choice.setChoiceByValue(settings.default);
        })
    }
}