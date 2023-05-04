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
        this._rangeSlider = new rangeSlider(
            this._element, 
            this._rangeConfig
        );
        if (this._selectFrom && this._selectTo) {

            this._choicesConfigFrom = {
                searchEnabled: false,
                shouldSort: false,
            };
            this._choicesConfigTo = {...this._choicesConfigFrom};

            if (this._values) {
                console.log(this._values);
                this._choiceListFrom = this._values.map((value) => {
                    return {
                        value: value,
                        label: new Intl.NumberFormat('ru-RU').format(value),
                        selected: false,
                        disabled: false
                    };
                });
                // console.log(this._choicesConfigFrom);
                this._choicesConfigFrom.choices = cloneDeep(this._choiceListFrom);
                this._choicesConfigFrom.choices[0].selected = true;
                console.log(this._choicesConfigFrom);
                // console.log(this._choicesConfigTo);
                this._choiceListTo = this._choiceListFrom;
                this._choiceListTo[this._choiceListTo.length-1].selected = true;
                this._choicesConfigTo.choices = this._choiceListTo;
                console.log(this._choicesConfigTo);
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

        this._element.addEventListener('clear-filter', function(event) {
            _this._cleanFilter();
        } );

    } //_init

    _cleanFilter() {
        this._rangeSlider._sliderEl.noUiSlider.reset();
    }


}


export default FilterRange;