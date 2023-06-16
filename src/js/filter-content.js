const ready = require('./utils/documentReady.js');
const closest = require('closest');
import filterRadio from './utils/filter-radio.js';

ready(function() {
    const filter = document.getElementById('advanced-search-page-filter');
    if (!filter) {
        return;
    }
    filter.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn--clear-filter')) {
            console.log('btn clear click');
            var filterMark = this.querySelector('.filter-main__mark-select');
            if (filterMark) {
                filterMark.dispatchEvent(new Event('clear-filter'));
            }
            let filterYear = this.querySelector('#advanced-search-page-filter .filter-year');
            if (filterYear) {
                filterYear.dispatchEvent(new Event('clear-filter'));
            }
            let filterMilage = this.querySelector('#advanced-search-page-filter .filter-milage');
            if (filterMilage) {
                filterMilage.dispatchEvent(new Event('clear-filter'));
            }
            let filterPrice = this.querySelector('.filter-price');
            if (filterPrice) {
                filterPrice.dispatchEvent(new Event('clear-filter'));
            }
            let filterCondition = this.querySelector('.filter-condition');
            if (filterCondition) {
                filterCondition.dispatchEvent(new Event('set-default'));
            }
            let filterTest = this.querySelector('.filter-test');
            if (filterTest) {
            	filterTest.dispatchEvent(new Event('set-default'));
            }
            let filterType = this.querySelector('.filter-type select');
            if (filterType) {
                filterType.dispatchEvent(new Event('set-default'));
            }
            let filterTransmission = this.querySelector('.filter-transmission select');
            if (filterTransmission) {
                filterTransmission.dispatchEvent(new Event('set-default'));
            }
            let filterEngine = this.querySelector('.filter-engine select');
            if (filterEngine) {
                filterEngine.dispatchEvent(new Event('set-default'));
            }
            let filterDrive = this.querySelector('.filter-drive input[name="drive"]');
            if (filterDrive) {
                filterDrive.checked = false;
                filterDrive.dispatchEvent(new Event('change',{bubbles: true}));
            }
        }
    });
    const clearBtn = document.querySelector('#advanced-search-page-filter .btn--clear-filter');

    // Теги радиобаттонов Состояние
    let fitlerRadioCondition = new filterRadio(document.querySelector('#advanced-search-page-filter .filter-condition'));
    fitlerRadioCondition.refresh();

    //test
    // let testFilterRadio = new filterRadio(document.querySelector('#advanced-search-page-filter .filter-test'));



	const DELETE_TAG_BUTTON_CLASS = "filter-tags__delete";	

	const DELETE_TAG_BUTTON =
	    `<button type="button" class="${DELETE_TAG_BUTTON_CLASS} btn" aria-label="Удалить тег">` +
	    `Удалить марку` +
	    `</button>`;

    // Теги чекбокса Привод
    let filterDrive = document.querySelector('#advanced-search-page-filter .filter-drive');
    let tagsListId = filterDrive && filterDrive.dataset && filterDrive.dataset.tagsId;
    let tagsList = tagsListId && document.getElementById(tagsListId);
    if (tagsList) {
	    filterDrive.addEventListener('change', function(event) {
	    	if (event.target.classList.contains('field-checkbox__input')) {
	    		if (event.target.checked) {
    			    let inputWrap = closest(event.target,'.field-checkbox__input-wrap');
                    let nameTextEl = inputWrap && inputWrap.querySelector('.field-checkbox__name-text');
                    let label = nameTextEl ? nameTextEl.innerText : '';
	    			tagsList.innerHTML = 
	    			    `<li><span data-value=${event.target.value} class="filter-tags__item">` +
                        `<span>${label}</span>` +
                        `${DELETE_TAG_BUTTON}` +
                        `</span></li>`;
	    		}
	    		else {
	    			tagsList.innerHTML = "";
	    		}
	    	}
	    });

        tagsList.addEventListener('click', function(event) {
            if (event.target.classList.contains(DELETE_TAG_BUTTON_CLASS) || closest(event.target, `.${DELETE_TAG_BUTTON_CLASS}`)) {
                let driveInput = filterDrive.querySelector('input[type="checkbox"]');
                driveInput.checked = false;
                driveInput.dispatchEvent(new Event('change',{bubbles:true}));
            }
        });

        let filterInput = filterDrive.querySelector('input');
        filterInput.dispatchEvent(new Event('change',{ bubbles:true }));
    }

});