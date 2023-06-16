const ready = require('./utils/documentReady.js');
import FilterMarkModel from './utils/filter-mark-model.js';



ready(function() {

	setupFilter('#search-advanced');
	setupFilter('#add-search-for-newsletter');
	setupFilter('#advanced-search-page-filter');
	setupFilter('#choose-car');

});


function setupFilter(wrapperSelector) {
	if (!document.querySelector(wrapperSelector + ' .filter-main')) {
		return;
	}
	let advancedMarkSelectEl = document.querySelector(wrapperSelector + ' .filter-main__mark-select');
	let advancedModelSelectEl = document.querySelector(wrapperSelector + ' .filter-main__model-select');
	let filterMarkModelAdvanced = new FilterMarkModel(advancedMarkSelectEl, advancedModelSelectEl);
}


// function advancedSearchSideBar() {
// 	if (!document.querySelector('#search-advanced .filter-main')) {
// 		return;
// 	}
// 	let advancedMarkSelectEl = document.querySelector('#search-advanced .filter-main__mark-select');
// 	let advancedModelSelectEl = document.querySelector('#search-advanced .filter-main__model-select');
// 	let filterMarkModelAdvanced = new FilterMarkModel(advancedMarkSelectEl, advancedModelSelectEl);
// 	console.log(filterMarkModelAdvanced);
// }


// function newsletterSearchSideBar() {
// 	if (!document.querySelector('#add-search-for-newsletter .filter-main')) {
// 		return;
// 	}
// 	let addMarkSelectEl = document.querySelector('#add-search-for-newsletter .filter-main__mark-select');
// 	let addModelSelectEl = document.querySelector('#add-search-for-newsletter .filter-main__model-select');
// 	let filterMarkModelAdd = new FilterMarkModel(addMarkSelectEl,addModelSelectEl);
// 	console.log(filterMarkModelAdd);
// };


// function pageSearch() {
// 	if (!document.querySelector('#advanced-search-page-filter .filter-main')) {
// 		return;
// 	}
// 	let addMarkSelectEl = document.querySelector('#advanced-search-page-filter .filter-main__mark-select');
// 	let addModelSelectEl = document.querySelector('#advanced-search-page-filter .filter-main__model-select');
// 	let filterMarkModelAdd = new FilterMarkModel(addMarkSelectEl,addModelSelectEl);
// 	console.log(filterMarkModelAdd);
// };
