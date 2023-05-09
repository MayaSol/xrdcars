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
    // let typeChoice = setChoiceFilter(
    //     '#search-advanced .filter-type select',
    //     config,
    //     {default: "0"}
    // );
    let typeChoiceSelect = document.querySelector('#search-advanced .filter-type select');
    let typeChoiceFilter = new filterChoiceSingle(typeChoiceSelect, config);

    // let typeChoiceAdd = setChoiceFilter(
    //     '#add-search-for-newsletter .filter-type select',
    //     config,
    //     {default: "0"}
    // );
    let typeChoiceSelectAdd = document.querySelector('#add-search-for-newsletter .filter-type select');
    let typeChoiceFilterAdd = new filterChoiceSingle(typeChoiceSelectAdd, config);

    // let typeChoicePage = setChoiceFilter(
    //     '#advanced-search-page-filter .filter-type select', 
    //     config, 
    //     {default: '0'}
    // );
    let typeChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-type select');
    let typeChoiceFilterPage = new filterChoiceSingle(typeChoiceSelectPage, config);


    // let transmissionChoice = setChoiceFilter(
    //     '#search-advanced .filter-transmission select',
    //     config,
    //     {default: "0"}
    // );
    let transmissionChoiceSelect = document.querySelector('#search-advanced .filter-transmission select');
    let transmissionChoiceFilter = new filterChoiceSingle(transmissionChoiceSelect, config);


    // let transmissionChoiceAdd = setChoiceFilter(
    //     '#add-search-for-newsletter .filter-transmission select',
    //     config,
    //     {default: "0"}
    // );
    let transmissionChoiceSelectAdd = document.querySelector('#search-advanced .filter-transmission select');
    let transmissionChoiceFilterAdd = new filterChoiceSingle(transmissionChoiceSelectAdd, config);

    // let transmissionChoicePage = setChoiceFilter(
    //     '#advanced-search-page-filter .filter-transmission select', 
    //     config,
    //     {default: '0'}
    // );

    let transmissionChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-transmission select');
    let transmissionChoiceFilterPage = new filterChoiceSingle(transmissionChoiceSelectPage, config);


    // let engineChoice = setChoiceFilter(
    //     '#search-advanced .filter-engine select',
    //     config,
    //     {default: "0"}
    // );
    let engineChoiceSelect = document.querySelector('#search-advanced .filter-engine select');
    let engineChoiceFilter = new filterChoiceSingle(engineChoiceSelect, config);

    // let engineChoiceAdd = setChoiceFilter(
    //     '#add-search-for-newsletter .filter-engine select',
    //     config,
    //     {default: "0"}
    // );
    let engineChoiceSelectAdd = document.querySelector('#add-search-for-newsletter .filter-engine select');
    let engineChoiceFilterAdd = new filterChoiceSingle(engineChoiceSelectAdd, config);

    // let engineChoicePage = setChoiceFilter(
    //     '#advanced-search-page-filter .filter-engine select',
    //     config,
    //     {default: '0'}
    // );
    let engineChoiceSelectPage = document.querySelector('#advanced-search-page-filter .filter-engine select');
    let engineChoiceFilterPage = new filterChoiceSingle(engineChoiceSelectPage, config);



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