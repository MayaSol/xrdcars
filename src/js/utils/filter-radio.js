const closest = require('closest');

const DELETE_TAG_BUTTON_CLASS = "filter-tags__delete";

const DELETE_TAG_BUTTON =
    `<button type="button" class="${DELETE_TAG_BUTTON_CLASS} btn" aria-label="Удалить тег">` +
    `Удалить марку` +
    `</button>`;



class FilterRadio {
    constructor(element, config) {
        if (!element) {
            return;
        }
        this._element = element;
        this._tagListId = this._element.dataset && this._element.dataset.tagsId;
        this._tagsList = this._tagListId && document.getElementById(this._tagListId);
        this._config = config || {};
        this._config._noFilterValue = this._config.noFilterValue || 'all'; //начальное значение, фильтр отключен
        this._resetInput = this._element.querySelector(`input[value="${this._config._noFilterValue}"]`);
        this._init();
    }

    _init() {
        const _this = this;
        console.log(this);

        if (this._tagsList) {
            // При изменении значения добавляем тег в список тегов c id в data-tags-id
            this._element.addEventListener('change', function(event) {
                console.log('condition filter change');
                console.log(event.target);
                if (event.target.classList.contains('field-radio__input')) {
                    if (event.target.value === 'all') {
                        _this._tagsList.innerHTML = '';
                    } else {
                        let inputWrap = closest(event.target,'.field-radio__input-wrap');
                        let nameTextEl = inputWrap && inputWrap.querySelector('.field-radio__name-text');
                        let label = nameTextEl ? nameTextEl.innerText : '';
                        _this._tagsList.innerHTML =
                            `<li><span data-value=${event.target.value} class="filter-tags__item">` +
                            `<span>${label}</span>` +
                            `${DELETE_TAG_BUTTON}` +
                            `</span></li>`

                    }
                }
            });

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

        // Событие для отключения филтра
        this._element.addEventListener('set-default', function() {
            _this._setDefault();
        })
    }//_inti()

    _setDefault() {
        if (this._resetInput) {
            this._resetInput.checked = true;
            this._resetInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    refresh() {
        console.log(this._element);
        let inputs = this._element.querySelectorAll('input');
        for (let input of inputs) {
            if (input.checked) {
                input.dispatchEvent(new Event('change',{bubbles: true}));
                return;
            }
        }
    }
}
export default FilterRadio;