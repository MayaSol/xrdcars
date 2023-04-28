const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');


ready(function() {

	let typeSelect = document.querySelector('.filter-type select');
    let typeChoice = typeSelect && new Choices(typeSelect, {
    	searchEnabled: false,
        shouldSort: false,
    });

	let transmissionSelect = document.querySelector('.filter-transmission select');
    let transmissionChoice = transmissionSelect && new Choices(transmissionSelect, {
    	searchEnabled: false,
        shouldSort: false,
    });

    let engineSelect = document.querySelector('.filter-engine select');
    console.log(engineSelect);
    let engineChoice = engineSelect && new Choices(engineSelect, {
        searchEnabled: false,
        shouldSort: false,
    })
});