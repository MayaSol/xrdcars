import noUiSlider from 'nouislider';

const CONFIG_DEFAULT = {
    start: [0, 100],
    step: 1,
    connect: true,
    range: {
        'min': 0,
        'max': 100
    },
}

const RANGE_SELECTOR_FROM = 'range__value-item--from';
const RANGE_SELECTOR_TO = 'range__value-item--to';
const SLIDER_SELECTOR = 'range-slider';

class RangeSlider {
    // методы класса
    constructor(element, config) {
        if (!element) {
            return;
        }
        this._config = Object.assign({}, CONFIG_DEFAULT, config)
        this._element = element;
        this._sliderEl = element.getElementsByClassName(SLIDER_SELECTOR)[0];
        this._instance = this._init();
        this._inputAddListeners(this._elementFrom);
        this._inputAddListeners(this._elementTo);
    }

    _init() {
        var sliderInstance = noUiSlider.create(this._sliderEl, {
            start: this._config.start,
            step: this._config.step,
            connect: this._config.connect,
            range: this._config.range
        });

        this._elementFrom = this._element.getElementsByClassName(RANGE_SELECTOR_FROM)[0];
        this._elementTo = this._element.getElementsByClassName(RANGE_SELECTOR_TO)[0];
        this._inputFrom = this._elementFrom.querySelector('input');
        this._inputTo = this._elementTo.querySelector('input');

        //Добавить блоки для отформатированных значений
        function addFormatted(element) {
            var formatted = document.createElement('div');
            formatted.classList.add('formatted-value');
            formatted.innerText = 'TEST';
            element.append(formatted);
            return formatted;
        }

        this._elementFromFormatted = addFormatted(this._elementFrom);
        this._elementToFormatted = addFormatted(this._elementTo);

        sliderInstance.on('update', (values, handle, unencoded, tap, positions, noUiSlider) => { this._onUpdateSlider(values, handle) });

        return sliderInstance;
    } //_init

    _inputAddListeners(element) {
        var max = this._config.range.max;
        var min = this._config.range.min;
        var updateFormattedValue = this._updateFormattedValue;
        var instance = this._instance;
        var input = element.querySelector('input');
        var formattedEl;
        if (element.classList.contains(this._config.selectorFrom)) {
            formattedEl = this._elementFromFormatted;
        }
        else {
            formattedEl = this._elementToFormatted;
        }
        input.addEventListener('click', function() {
            event.preventDefault();
            element.classList.add('focused');
            this.focus();
        })
        input.addEventListener('blur', function(event) {
            element.classList.remove('focused');
        })
        input.addEventListener('change', function(event) {
            if (element.classList.contains(RANGE_SELECTOR_FROM)) {
                instance.set([this.value,null]);
            }
            else {
                instance.set([null,this.value]);
            }
            updateFormattedValue(formattedEl,this);
        })
        // input.addEventListener('input', function(event) {
        //     if (max && +this.value > max) {
        //         this.value = max;
        //     }
        //     if (min && +this.value < min) {
        //         this.value = min;
        //     }
        // })
        // input.addEventListener('keyup', function(event) {
        //     const regExp = new RegExp('^[0-9]*$', 'gi');
        //     const result = regExp.test(this.value);
        //     if (!result) {
        //         this.value = this.value.slice(0, this.value.length - 1);
        //     }
        // })
    }


    _updateFormattedValue(formattedEl, inputEl) {
        if (this._config.noFormat) {
            formattedEl.textContent = parseInt(inputEl.value);
        } else {
            formattedEl.textContent = new Intl.NumberFormat('ru-RU').format(parseInt(inputEl.value));
        }
    }

    _onUpdateSlider(values, handle) {

        var input;
        var formattedEl;
        if (handle == 0) {
            input = this._inputFrom;
            formattedEl = this._elementFromFormatted;
        } else {
            input = this._inputTo;
            formattedEl = this._elementToFormatted;
        }
        var value = values[handle];
        input.value = parseInt(value).toString();
        this._updateFormattedValue(formattedEl, input);
    }

}


export default RangeSlider;