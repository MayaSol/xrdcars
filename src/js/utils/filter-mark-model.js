const Choices = require('choices.js');
const closest = require('closest');



class FilterMarkModel {
    // методы класса
    constructor(markEl, modelEl) {
        if (!markEl || !modelEl) {
            return;
        }
        // this._config = Object.assign({}, CONFIG_DEFAULT, config)
        this._markEl = markEl;
        this._modelEl = modelEl;
        this._init();
        // [this._markChoice,this._modelChoice] = this._init();
    }

    _init() {
        const _this = this;
        //
        // ВЫБОР МАРКИ
        //
        this._markChoicesData = this._getJSONChoices(this._markEl);
        this._markChoice = new Choices(this._markEl, {
            allowHTML: true,
            renderSelectedChoices: 'always',
            removeItemButton: true,
            callbackOnCreateTemplates: function(template) {
                return {
                    item: ({ classNames }, data) => {
                        // console.log('item');
                        // console.log(data);
                        return template(`
                              <div class="${classNames.item} ${
                              data.highlighted
                                ? classNames.highlightedState
                                : classNames.itemSelectable
                            } ${
                              data.placeholder ? classNames.placeholder : ''
                            }" data-item data-id="${data.id}" data-value="${data.value}" ${
                              data.active ? 'aria-selected="true"' : ''
                            } ${data.disabled ? 'aria-disabled="true"' : ''}>
                                 ${data.label}
                                 <button type="button" class="choices__button" aria-label="Удалить марку: ${data.label}" data-button="">Удалить марку</button>
                              </div>
                            `);
                    },
                    choice: ({ classNames }, data) => {
                        // console.log('MARK choice callback');
                        // console.log(data);
                        var icon = (data.selected) ? 'checked' : 'unchecked';
                        return template(`
                              <div class="${classNames.item} ${classNames.itemChoice} ${
                              data.disabled ? classNames.itemDisabled : classNames.itemSelectable
                            }" data-select-text="${this.config.itemSelectText}" data-choice ${
                              data.disabled
                                ? 'data-choice-disabled aria-disabled="true"'
                                : 'data-choice-selectable'
                            } data-id="${data.id}" data-value="${data.value}" ${
                              data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
                            }>
                                <i class="flaticon-${icon}"></i> 
                                ${data.label}
                                <span>${data.customProperties.num}</span>
                              </div>
                            `);
                    },
                };
            }, //callbackOnCreateTemplates
        });
        // Загружаем выпадающий список с data-custom
        this._markChoice.clearStore();
        this._markChoice.setChoices(this._markChoicesData, 'value', 'label', true);
        // Удаление выбора по клику на выбранный пункт в выпадающем списке
        this._markChoice.passedElement.element.addEventListener('choice', function(event) {
            if (event.detail.choice.selected) {
                setTimeout(() => {
                    _this._markChoice.removeActiveItemsByValue(event.detail.choice.value);
                    _this._markChoice._triggerChange(event.detail.choice.value);
                }, 100)
            }
        })

        //
        // ВЫБОР МОДЕЛИ
        //
        this._allMarkChoices = [...this._markChoice._currentState.choices];
        //  Берем data-custom из html
        this._modelChoicesData = this._getJSONChoices(this._modelEl);
        this._modelChoice = new Choices(this._modelEl, {
            allowHTML: true,
            renderSelectedChoices: 'always',
            removeItemButton: true,
            noChoicesText: 'Выберите марку для выбора модели',
            callbackOnCreateTemplates: function(template) {
                return {
                    item: ({ classNames }, data) => {
                        // console.log('item');
                        // console.log(data);
                        return template(`
                              <div class="${classNames.item} ${
                              data.highlighted
                                ? classNames.highlightedState
                                : classNames.itemSelectable
                            } ${
                              data.placeholder ? classNames.placeholder : ''
                            }" data-item data-id="${data.id}" data-value="${data.value}" ${
                              data.active ? 'aria-selected="true"' : ''
                            } ${data.disabled ? 'aria-disabled="true"' : ''}>
                                 ${data.label}
                                 <button type="button" class="choices__button" aria-label="Удалить модель: ${data.label}" data-button="">Удалить модель</button>
                              </div>
                            `);
                    },
                    choice: ({ classNames }, data) => {
                        // console.log('MODEL choice callback');
                        // console.log(data);
                        var icon = (data.selected) ? 'checked' : 'unchecked';
                        return template(`
                              <div class="${classNames.item} ${classNames.itemChoice} ${
                              data.disabled ? classNames.itemDisabled : classNames.itemSelectable
                            }" data-select-text="${this.config.itemSelectText}" data-choice ${
                              data.disabled
                                ? 'data-choice-disabled aria-disabled="true"'
                                : 'data-choice-selectable'
                            } data-id="${data.id}" data-value="${data.value}" ${
                              data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
                            }>
                                <i class="flaticon-${icon}"></i> 
                                ${data.label}
                                <span>${data.customProperties.num}</span>
                              </div>
                            `);
                    },
                };
            }, //callbackOnCreateTemplates
        });
        //  Загруажем список с  data-custom 
        this._modelChoice.clearStore();
        this._modelChoice.setChoices(this._modelChoicesData, 'value', 'label', true);
        // Все возможные группы моделей
        this._allModelGroups = this._modelChoice._currentState.groups;
        console.log('allModelGroups')
        console.log(this._allModelGroups);
        // Все возможные модели
        this._allModelChoices = [...this._modelChoice._currentState.choices];
        console.log('allModelChoices');
        console.log(this._allModelChoices);
        //
        this._renderModels(this._markChoice, this._modelChoice,this._allModelChoices,this._allModelGroups, null);
        // Удаление выбора по клику на выбранный пункт в выпадающем списке
        this._modelEl.addEventListener('choice', function(event) {
            console.log('choice event model');
            if (event.detail.choice.selected) {
                setTimeout(() => {
                    _this._modelChoice.removeActiveItemsByValue(event.detail.choice.value);
                    _this._modelChoice._triggerChange(event.detail.choice.value);
                }, 100)
                // choiceChecked = true;
            }
        });
        this._markChoice.passedElement.element.addEventListener('change', function(e) {
            console.log('selected MARKS change');
            console.log(e);
            _this._renderModels(_this._markChoice,_this._modelChoice,_this._allModelChoices,_this._allModelGroups,e.detail.value);
        });

        console.log('this._markChoice.passedElement.element');
        console.log(this._markChoice.passedElement.element);

        this._markChoice.passedElement.element.addEventListener('clear-filter', function(event) {
            _this._clearMarks();
        } );
    } //_init


    _clearMarks() {
        console.log('clear mark model filter');
        this._markChoice.clearStore();
        this._markChoice.setChoices(this._markChoicesData, 'value', 'label', true);
        this._modelChoice.clearStore();
        this._modelChoice.setChoices(this._modelChoicesData, 'value', 'label', true);
    }

    //
    //  Берем список из html, добавляя данные из data-custom в customProperites
    //
    _getJSONChoices(selectEl) {
        var choices = [];
        var groups = selectEl.querySelectorAll('optgroup');
        if (groups.length > 0) {
            for (var i = 0; i < groups.length; i++) {
                var choicesItem = {};
                choicesItem.label = groups[i].label;
                choicesItem.groupValue = groups[i].dataset.value;
                choicesItem.id = i;
                choicesItem.disabled = false;
                var options = groups[i].children;
                choicesItem.choices = [];
                for (var j = 0; j < options.length; j++) {
                    var optionsItem = {};
                    optionsItem.value = options[j].value;
                    optionsItem.label = options[j].label;
                    optionsItem.selected = options[j].selected;
                    optionsItem.disabled = (options[j].disabled) ? true : false;
                    if (options[j].dataset && options[j].dataset.custom) {
                        var customProperties = options[j].dataset.custom.replaceAll('\'', '"');
                        optionsItem.customProperties = JSON.parse(customProperties);
                    }
                    choicesItem.choices.push(optionsItem);
                }
                choices.push(choicesItem);
            }
        } else {
            var options = selectEl.options;
            for (var i = 0; i < options.length; i++) {
                var choicesItem = {};
                choicesItem.label = options[i].label;
                choicesItem.value = options[i].value;
                choicesItem.selected = options[i].selected;
                if (options[i].dataset && options[i].dataset.custom) {
                    var customProperties = options[i].dataset.custom.replaceAll('\'', '"');
                    choicesItem.customProperties = JSON.parse(customProperties);
                }
                choices.push(choicesItem);
            }
        }
        console.log('choices');
        console.log(choices);
        return choices;
    }
    //
    // Перезапоняем список моделей в соответствии со списком марок
    //
    _renderModels(markChoice, modelChoice, allChoices, allGroups, lastChangedMarkValue) {
        console.log('lastChangedMarkValue');
        console.log(lastChangedMarkValue);
        // lastChangedMarkValue - Последняя марка добавленная/удаленная из списка марок
        var lastChangedMarkLabel = this._allMarkChoices.reduce((acc,curr) => {
            if (curr.value == lastChangedMarkValue) {
                return acc + curr.label.toUpperCase();
            }
            else {
                return acc + '';
            }
            console.log(acc);
        },'');
        console.log('lastChangedMarkLabel');
        console.log(lastChangedMarkLabel);
        //  Выбранные марки в селекте Марки
        var selectedMarksAll = Array.prototype.slice.call(markChoice.passedElement.element.selectedOptions)
            .map((item) => {
                console.log(item.value);
                if (item.value == lastChangedMarkValue) {
                    lastChangedMarkLabel = item.label.toUpperCase();
                }
                return {
                    'value': item.value,
                    'label': item.label.toUpperCase()
                }
            });
        console.log('selectedMarksAll');
        console.log(selectedMarksAll);
        console.log('lastChangedMarkLabel');
        console.log(lastChangedMarkLabel);
        //  Массив label выбранных марок
        var selectedMarksLbls = selectedMarksAll.map(item => item.label.toUpperCase());
        console.log('selectedMarksLbls');
        console.log(selectedMarksLbls);
        // Группы для выбранных марок
        var selectedGroups = allGroups.filter((group) => {
            let result = selectedMarksLbls.find((mark) => {
                return (mark == group.value.toUpperCase());
            })
            return result;
        })
        console.log('selectedGroups');
        console.log(selectedGroups);
        // Список выбранных моделей 
        var selectedModels = modelChoice._currentState.items
            .map((item) => {
                return item.label.toUpperCase();
                }
            );
        console.log('selectedModels');
        console.log(selectedModels);
        // Новые данные для селекта Моделей
        var newChoiceData = [];
        for (let group of selectedGroups) {
            var item = {};
            item.label = group.value;
            item.id = group.id;
            item.disabled = false;
            //  Если марка только добавлена, то снимаем выбор с моделей
            // if (lastChangedMarkLabel && lastChangedMarkLabel == group.value) {
            //  item.selected = false;
            // }
            item.choices = {};
            // Добавляем в список все модели, для групп выбранных марок
            item.choices = allChoices.filter((choice) => {
                return item.id == choice.groupId;
            });
            item.choices.map(item => {
                // Делаем все модели доступными
                item.disabled = false;
                 if (lastChangedMarkLabel.length > 0 && lastChangedMarkLabel == group.value.toUpperCase()) {
                    //  Марка была только что добавлена или удалена
                    item.selected = false;
                 }
                 else {
                    // Если модели были выбраны ранее, оставляем выбор
                    if (selectedModels.includes(item.label.toUpperCase())) {
                        item.selected = true;
                    }
                 }
            });
            newChoiceData.push(item);
        }
        //
        console.log('newChoiceData');
        console.log(newChoiceData);
        modelChoice.clearStore();
        modelChoice.setChoices(newChoiceData,'value','label',true);
    }
}


export default FilterMarkModel;