'use strict';

(function () {
  var OFFERS_AMOUNT = 8;

  var randomSettings = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
      'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    PRICE_MIN: 1000,
    PRICE_MAX: 1000000,
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    ROOMS_MAX: 5,
    GUESTS_MAX: 10,
    CHECKINS: ['12:00', '13:00', '14:00'],
    CHECKOUTS: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    MIN_Y: 130,
    MAX_Y: 630
  };

  var getAvatar = function (count) {
    var pictureNumber = count < 10 ? '0' + count : count;
    return ('img/avatars/user' + pictureNumber + '.png');
  };

  var generatePin = function (mapWidth, count) {
    var x = Math.floor(Math.random() * mapWidth);
    var y = Math.floor((Math.random() * (randomSettings.MAX_Y - randomSettings.MIN_Y)) + randomSettings.MIN_Y);
    var featuresCount = Math.floor(Math.random() * randomSettings.FEATURES.length - 1);
    var features = window.randomSort(randomSettings.FEATURES).slice(featuresCount);
    var pin = {
      author: {
        avatar: getAvatar(count)
      },
      offer: {
        title: window.getRandomValue(randomSettings.TITLES),
        address: x + ', ' + y,
        price: Math.floor((Math.random() * (randomSettings.PRICE_MAX - randomSettings.PRICE_MIN)) + randomSettings.PRICE_MIN),
        type: window.getRandomValue(randomSettings.TYPES),
        rooms: Math.floor((Math.random() * (randomSettings.ROOMS_MAX - 1)) + 1),
        guests: Math.floor((Math.random() * (randomSettings.GUESTS_MAX - 1)) + 1),
        checkin: window.getRandomValue(randomSettings.CHECKINS),
        checkout: window.getRandomValue(randomSettings.CHECKOUTS),
        features: features,
        description: '',
        photos: window.randomSort(randomSettings.PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
    return pin;
  };

  window.getPinsObjects = function (mapWidth) {
    var pins = [];
    for (var i = 1; i <= OFFERS_AMOUNT; i++) {
      pins.push(generatePin(mapWidth, i));
    }
    return pins;
  };

})();
