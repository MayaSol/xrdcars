const Choices = require('choices.js');
const closest = require('closest');
const ready = require('./utils/documentReady.js');

ready(function() {
    if (document.querySelector('.filter-main')) {

        // ВЫБОР МАРКИ
        var markSelectEl = document.querySelector('.filter-main__mark-select');
        // 	Получаем data-custom из html
        var markChoicesData = getJSONChoices(markSelectEl);
        var markChoice = markSelectEl && new Choices(markSelectEl, {
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
        markChoice.clearStore();
        markChoice.setChoices(markChoicesData, 'value', 'label', true);

        markSelectEl.addEventListener('choice', function(event) {
            if (event.detail.choice.selected) {
                setTimeout(() => {
                    markChoice.removeActiveItemsByValue(event.detail.choice.value);
                    markChoice._triggerChange(event.detail.choice.value);
                }, 100)
            }

        })
        //
        // ВЫБОР МОДЕЛИ
        //
        var modelSelectEl = document.querySelector('.filter-main__model-select');
        const allMarkChoices = [...markChoice._currentState.choices];
        console.log(modelSelectEl);
        //	Берем data-custom из html
        var modelChoicesData = getJSONChoices(modelSelectEl);
        var modelChoice = modelSelectEl && new Choices(modelSelectEl, {
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
        //	Загруажем список с  data-custom 
        modelChoice.clearStore();
        modelChoice.setChoices(modelChoicesData, 'value', 'label', true);
        // Все возможные группы моделей
        const allModelGroups = modelChoice._currentState.groups;
        console.log('allModelGroups')
        console.log(allModelGroups);
        // Все возможные модели
        const allModelChoices = [...modelChoice._currentState.choices];
        console.log('allModelChoices');
        console.log(allModelChoices);
        renderModels(markChoice, modelChoice,allModelChoices,allModelGroups, null);

        console.log('modelChoice');
        console.log(modelChoice);


        modelSelectEl.addEventListener('choice', function(event) {
            console.log('choice event model');
            if (event.detail.choice.selected) {
                setTimeout(() => {
                    modelChoice.removeActiveItemsByValue(event.detail.choice.value);
                    modelChoice._triggerChange(event.detail.choice.value);
                }, 100)
                // choiceChecked = true;
            }
        });
        // modelChoice.passedElement.element.addEventListener('change', function(event){
        // });
        console.log('markChoice');
        console.log(markChoice);
        markChoice.passedElement.element.addEventListener('change', function(e) {
        	console.log('selected MARKS change');
        	console.log(e);
        	renderModels(markChoice,modelChoice,allModelChoices,allModelGroups,e.detail.value);
        });


	//
	// 	Берем список из html, добавляя данные из data-custom в customProperites
	//
    function getJSONChoices(selectEl) {
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
    function renderModels(markChoice, modelChoice, allChoices, allGroups, lastChangedMarkValue) {
    	console.log('lastChangedMarkValue');
    	console.log(lastChangedMarkValue);
    	// lastChangedMarkValue - Последняя марка добавленная/удаленная из списка марок
    	var lastChangedMarkLabel = allMarkChoices.reduce((acc,curr) => {
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
    	//	Выбранные марки в селекте Марки
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
    	//	Массив label выбранных марок
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
        for (group of selectedGroups) {
            var item = {};
            item.label = group.value;
            item.id = group.id;
            item.disabled = false;
            //	Если марка только добавлена, то снимаем выбор с моделей
            // if (lastChangedMarkLabel && lastChangedMarkLabel == group.value) {
            // 	item.selected = false;
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
            	 	//	Марка была только что добавлена или удалена
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



    } // if (document.querySelector('.filter-main'))


});



        //
