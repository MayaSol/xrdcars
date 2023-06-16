const Choices = require('choices.js');
import rangeSlider from './range-slider.js';
const cloneDeep = require('lodash.clonedeep');



class FilterRange {
    // методы класса
    constructor(element,config) {
        if (!element) {
            return;
        }
        this._element = element;
        this._rangeConfig = config.rangeConfig;
        this._inputFrom = element.querySelector('.range__value-item--from input');
        this._inputTo = element.querySelector('.range__value-item--to input');
        this._selectFrom = element.querySelector('.filter-selects__from select');
        this._selectTo = element.querySelector('.filter-selects__to select');
        if (config.values) {
            this._values = config.values;
        }
        this._init();
    }


    _init() {
        const _this = this;
        //  Значения От и До
        if (this._inputFrom.value) {
            this._rangeConfig.range.min = +this._inputFrom.value;
            this._rangeConfig.start[0] = +this._inputFrom.value;
        }
        if (this._inputTo.value) {
            this._rangeConfig.range.max = +this._inputTo.value;
            this._rangeConfig.start[1] = +this._inputTo.value;
        }
        //  Если есть range input
        if (this._inputFrom) {
            this._rangeSlider = new rangeSlider(
                this._element, 
                this._rangeConfig
            );
        }
        // Если есть селекты От и До
        if (this._selectFrom && this._selectTo) {

            this._choicesConfigFrom = {
                searchEnabled: false,
                shouldSort: false,
            };
            this._choicesConfigTo = {...this._choicesConfigFrom};

            if (this._values) {
                this._choiceListFrom = this._values.map((value) => {
                    return {
                        value: value,
                        label: new Intl.NumberFormat('ru-RU').format(value),
                        selected: false,
                        disabled: false
                    };
                });
                this._choicesConfigFrom.choices = cloneDeep(this._choiceListFrom);
                this._choicesConfigFrom.choices[0].selected = true;
                this._choiceListTo = this._choiceListFrom;
                this._choiceListTo[this._choiceListTo.length-1].selected = true;
                this._choicesConfigTo.choices = this._choiceListTo;
            }
            this._choiceFrom = new Choices(
                this._selectFrom, 
                this._choicesConfigFrom
            );
            this._choiceTo = new Choices(
                this._selectTo, 
                this._choicesConfigTo
            );
        }

        //  Если есть range input
        if (this._inputFrom) {
            this._element.addEventListener('clear-filter', function(event) {
                _this._cleanFilter();
            } );
        }

    } //_init

    _cleanFilter() {
        this._rangeSlider._sliderEl.noUiSlider.reset();
    }


}


export default FilterRange;
