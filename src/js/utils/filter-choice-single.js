const Choices = require('choices.js');
const closest = require('closest');

const DELETE_TAG_BUTTON_CLASS = "filter-tags__delete";

const DELETE_TAG_BUTTON =
    `<button type="button" class="${DELETE_TAG_BUTTON_CLASS} btn" aria-label="Удалить тег">` +
    `Удалить марку` +
    `</button>`;



class FilterChoiceSingle {
    constructor(element, config, settings) {
        if (!element) {
            return;
        }
        this._element = element;
        this._tagsListId = this._element.dataset && this._element.dataset.tagsId;
        this._tagsList = this._tagsListId && document.getElementById(this._tagsListId);
        this._config = config || {};
        this._settings = settings || {};
        this._settings.default = this._settings.default || '0'; //начальное значение, фильтр отключен
        this._resetInput = this._element.querySelector(`input[value="${this._config._noFilterValue}"]`);
        this._init();
    }

    _init() {
        const _this = this;

        this._choice = this._element && new Choices(this._element, this._config);

        if (this._tagsList) {

            // При изменении значения добавляем тег в список тегов c id в data-tags-id
            this._element.addEventListener('change', function(e) {
                console.log('select changed');
                console.log(event.target.value);
                _this.setTags(event.target.value);
            })

            // По клику на кнопку в элементе тега, устанавливаем начальное значение, при котором фильтр отключен
            this._tagsList.addEventListener('click', function(event) {
                console.log('click: ' + (event.target.classList && event.target.classList[0]));
                console.log(event.target.classList.contains(DELETE_TAG_BUTTON_CLASS));
                console.log(closest(event.target, DELETE_TAG_BUTTON_CLASS));
                if (event.target.classList.contains(DELETE_TAG_BUTTON_CLASS) || closest(event.target, `.${DELETE_TAG_BUTTON_CLASS}`)) {
                    console.log('1!');
                    _this._setDefault();
                }
            });
        }

        // Событие для установки начального значения
        this._element.addEventListener('set-default', function() {
            _this._setDefault();
        })

        this.refresh();
    }//_init()

    _setDefault() {
        console.log('set-default');
        console.log(this._settings.default);
        this._choice.setChoiceByValue(this._settings.default);
        //!!!! Перенести в onchange и вызвать dispatch
        if (this._tagsList) {
            this._tagsList.innerHTML = '';
        }
    }

    setTags(value) {
        if (!this._tagsListId) {
            return;
        }
        let currentValue = value.value ? value.value : value;
        if (currentValue == this._settings.default) {
            this._tagsList.innerHTML = '';
        }
        else {
            let choiceValue = this._choice.getValue();
            this._tagsList.innerHTML = 
                `<li><span data-value=${choiceValue.value} class="filter-tags__item">` + 
                `<span>${choiceValue.label}</span>` +
                `${DELETE_TAG_BUTTON}` +
                `</span></li>`
        }
    }

    refresh() {
        this.setTags(this._choice.getValue());
    }
}
export default FilterChoiceSingle;