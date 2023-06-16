const ready = require('./utils/documentReady.js');

ready(function() {

    if (typeof ymaps == 'undefined') {
        return;
    }

    ymaps.ready(function () {
        console.log('contacts.js');
        var myMap = new ymaps.Map('contact-map', {
                center: [55.751574, 37.573856],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'xrdcars',
                balloonContent: 'xrdcards content'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/images/myIcon.gif',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });
            console.log(myMap);
            myMap.geoObjects.add(myPlacemark);
    });

});