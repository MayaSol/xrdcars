import tippy from 'tippy.js';
var throttle = require('lodash.throttle');


class InfoTip {
    constructor(element, config) {
        if (!element) {
            return;
        }
        this._element = element;
        this._contentId = this._element.dataset.content;
        if (!this._contentId) {
            retrurn;
        }
        this._placement = this._element.classList.contains('info-tip--right') ? 'right' : 'top';
        this._widthFrom = this._element.dataset.widthFrom;
        this._prevScreenWidth = this._widthFrom ? this._widthFrom - 1 : 10000;
        this._init();
        this._addListeners();
    }

    _init() {

        this._instance = this._makeTippy(this._element)();

    } //_init()

    _addListeners() {
       
        window.addEventListener('resize', throttle(this._makeTippy(this._element),100));
    }

    _makeTippy(element) {
    	const _this = this;
        return function() {
        	//Граница не задана
        	//Граница задана, ширина экрана больше границы и метод запускается впервые
        	//Граница задана, ширина экрана изменилась: была меньше, стала больше границы
            if (!_this._widthFrom || (document.documentElement.clientWidth >= _this._widthFrom && _this._prevScreenWidth < _this._widthFrom)) {
            	// Подсказка не инициализирована
            	if (!_this._instance) {
	                let instance = tippy(element, {
	                    content: _this._contentId,
	                    theme: 'info-tip',
	                    allowHTML: true,
	                    interactive: true,
	                    placement: _this._placement,
	                    maxWidth: 300,
	                    // delay: [null, 10000],
	                    // trigger: 'click'
	                });
	                return instance;
            	}
            	// Подсказка инициализирована
            	else {
	                _this._instance.enable();
            	}
            } else {
            	// Граница задана, подсказка инициализирована, ширина экрана изменилась: была больше, стала меньше границы
                if ( _this._widthFrom && _this._instance
                	&& document.documentElement.clientWidth < _this._widthFrom 
                	&& _this._prevScreenWidth >= _this._widthFrom
                ) {
                	_this._instance.disable();
                }
            }
            _this._prevScreenWidth = document.documentElement.clientWidth;
        }
    }


}
export default InfoTip;