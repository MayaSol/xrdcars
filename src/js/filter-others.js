const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
const closest = require('closest');
import filterChoiceSingle from './utils/filter-choice-single.js';


ready(function() {

    const config = {
        searchEnabled: false,
        shouldSort: false,
    };

    // Тип
    let typeChoiceSelect = document.querySelector('#search-advanced .filter-type select');
    let typeChoiceFilter = new filterChoiceSingle(typeChoiceSelect, config);

    let typeChoiceSelectAdd = document.querySelector('#add-search-for-newsletter .filter-type select');
    let typeChoiceFilterAdd = new filterChoiceSingle(typeChoiceSelectAdd, config);

    let typeChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-type select');
    let typeChoiceFilterPage = new filterChoiceSingle(typeChoiceSelectPage, config);

    let typeChoiceSelectChoose = document.querySelector('#choose-car .filter-type select');
    let typeChoiceFilterChoose = new filterChoiceSingle(typeChoiceSelectChoose, config);

    //  Передача
    let transmissionChoiceSelect = document.querySelector('#search-advanced .filter-transmission select');
    let transmissionChoiceFilter = new filterChoiceSingle(transmissionChoiceSelect, config);

    let transmissionChoiceSelectAdd = document.querySelector('#search-advanced .filter-transmission select');
    let transmissionChoiceFilterAdd = new filterChoiceSingle(transmissionChoiceSelectAdd, config);

    let transmissionChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-transmission select');
    let transmissionChoiceFilterPage = new filterChoiceSingle(transmissionChoiceSelectPage, config);

    let transmissionChoiceSelectChoose = document.querySelector('#choose-car .filter-transmission select');
    let transmissionChoiceFilterChoose = new filterChoiceSingle(transmissionChoiceSelectChoose, config);

    //  Двигатель
    let engineChoiceSelect = document.querySelector('#search-advanced .filter-engine select');
    let engineChoiceFilter = new filterChoiceSingle(engineChoiceSelect, config);

    let engineChoiceSelectAdd = document.querySelector('#add-search-for-newsletter .filter-engine select');
    let engineChoiceFilterAdd = new filterChoiceSingle(engineChoiceSelectAdd, config);

    let engineChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-engine select');
    let engineChoiceFilterPage = new filterChoiceSingle(engineChoiceSelectPage, config);

    let engineChoiceSelectChoose = document.querySelector('#choose-car .filter-engine select');
    let engineChoiceFilterChoose = new filterChoiceSingle(engineChoiceSelectChoose, config);
});

// const NO_FILTER_VALUE = 0;
// const DELETE_TAG_BUTTON = 
//     `<button type="button" class="filter-tags__delete btn" aria-label="Удалить тег">` +
//     `Удалить тег` +
//     `</button>`;


// function setTags(tagsListEl, choice, value) {
//     if (value == NO_FILTER_VALUE) {
//         tagsListEl.innerHTML = '';
//     }
//     else {
//         let value = choice.getValue();
//         console.log(value);
//         tagsListEl.innerHTML = 
//             `<li><span data-value=${value.value} class="filter-tags__item">` + 
//             `<span>${value.label}</span>` +
//             `${DELETE_TAG_BUTTON}` +
//             `</span></li>`
//     }
// }


// function setChoiceFilter(selector, config, settings = {}) {
//     let element = document.querySelector(selector);
//     if (!element) {
//         return;
//     }
//     let choice = element && new Choices(element, config);
//     if (settings.default) {
//         element.addEventListener('set-default', function() {
//             console.log('set-default');
//             choice.setChoiceByValue(settings.default);
//             if (element.dataset && element.dataset.tagsId) {
//                 let tagsList = document.getElementById(element.dataset.tagsId);
//                 if (tagsList) {
//                     tagsList.innerHTML = '';
//                 }
//             }
//         })
//     }
//     var tagsListId = element.dataset && element.dataset.tagsId;
//     if (!tagsListId) {
//         return;
//     }
//     console.log(element);
//     console.log(tagsListId);
//     let tagsList = document.getElementById(tagsListId);
//     if (!tagsList) {
//         return;
//     }
//     tagsList.addEventListener('click', function(event) {
//         console.log('click ' + event.target.classList && event.target.classList[0]);
//         if (event.target.classList.contains('filter-tags__delete') || closest(event.target,'filter-tags__delete')) {
//             let filter = document.querySelector(`select[data-tags-id="${tagsListId}"]`);
//             if (filter) {
//               filter.dispatchEvent(new Event('set-default'));  
//             }
//         }
//     })
//     element.addEventListener('change', function(e) {
//         console.log('select changed');
//         console.log(event.target.value);
//         setTags(tagsList, choice, event.target.value);
//     })
//     refreshChoiceFiler(choice, tagsList);
// }


// function refreshChoiceFiler(choice, tagsListEl) {
//     console.log('refreshChoiceFiler');
//     let value = choice.getValue();
//     console.log(value);
//     setTags(tagsListEl, choice, value.value);
// }