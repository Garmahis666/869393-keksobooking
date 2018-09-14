'use strict';

var COUNT_OF_JS_OBJECTS = 8;

var randomSettings = {
  AVATARS: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
    'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
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
  MAX_Y: 630,
  PIN_WIDTH: 50,
  PIN_HEIGHT: 70
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createPin = function (pin) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = pin.location.x - Math.round(randomSettings.PIN_WIDTH / 2) + 'px';
  newPin.style.top = pin.location.y + randomSettings.PIN_HEIGHT + 'px';
  var pinImg = newPin.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  return newPin;
};

var typeOfHousing = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  getType: function (name) {
    return this[name];
  }
};

var featuresClasses = {
  wifi: 'popup__feature--wifi',
  dishwasher: 'popup__feature--dishwasher',
  parking: 'popup__feature--parking',
  washer: 'popup__feature--washer',
  elevator: 'popup__feature--elevator',
  conditioner: 'popup__feature--conditioner',
  getKey: function (className) {
    for (var key in featuresClasses) {
      if (featuresClasses[key] === className) {
        return key;
      }
    }
    return '';
  }
};

var createPhoto = function (src) {
  var newPhoto = document.createElement('img');
  newPhoto.src = src;
  newPhoto.classList.add('popup__photo');
  newPhoto.width = 45;
  newPhoto.height = 40;
  newPhoto.alt = 'Фотография жилья';
  return newPhoto;
};

var createCard = function (pin) {
  var map = document.querySelector('.map');
  var filter = document.querySelector('.map__filters-container');
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__avatar').src = pin.author.avatar;
  newCard.querySelector('.popup__title').textContent = pin.offer.title;
  newCard.querySelector('.popup__text--address').textContent = pin.offer.address;
  newCard.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = typeOfHousing.getType(pin.offer.type);
  newCard.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  newCard.querySelector('.popup__description').textContent = pin.offer.description;
  var features = newCard.querySelector('.popup__features');
  var fetuareChild = features.querySelectorAll('.popup__feature');
  for (i = 0; i < fetuareChild.length; i++) {
    var featureName = fetuareChild[i].classList[1];
    if (pin.offer.features.indexOf(featuresClasses.getKey(featureName)) === -1) {
      features.removeChild(fetuareChild[i]);
    }
  }
  var popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.removeChild(popupPhotos.querySelector('.popup__photo'));
  for (var i = 0; i < pin.offer.photos.length; i++) {
    popupPhotos.appendChild(createPhoto(pin.offer.photos[i]));
  }
  map.insertBefore(newCard, filter);
};

var createPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var newPin = createPin(pins[i]);
    fragment.appendChild(newPin);
    createCard(pins[i]);
  }
  return fragment;
};

var eraseTagsClasses = function () {
  var element = document.querySelector('.map.map--faded');
  element.classList.remove('map--faded');
};

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var generatePin = function (mapWidth) {
  var x = Math.floor(Math.random() * mapWidth);
  var y = Math.floor((Math.random() * (randomSettings.MAX_Y - randomSettings.MIN_Y)) + randomSettings.MIN_Y);
  var featuresCount = Math.floor(Math.random() * randomSettings.FEATURES.length - 1);
  var features = randomSettings.FEATURES.sort(function () {
    return 0.5 - Math.random();
  }).slice(featuresCount);
  var pin = {
    author: {
      avatar: getRandomValue(randomSettings.AVATARS)
    },
    offer: {
      title: getRandomValue(randomSettings.TITLES),
      address: x + ', ' + y,
      price: Math.floor((Math.random() * (randomSettings.PRICE_MAX - randomSettings.PRICE_MIN)) + randomSettings.PRICE_MIN),
      type: getRandomValue(randomSettings.TYPES),
      rooms: Math.floor((Math.random() * (randomSettings.ROOMS_MAX - 1)) + 1),
      guests: Math.floor((Math.random() * (randomSettings.GUESTS_MAX - 1)) + 1),
      checkin: getRandomValue(randomSettings.CHECKINS),
      checkout: getRandomValue(randomSettings.CHECKOUTS),
      features: features,
      description: '',
      photos: randomSettings.PHOTOS.sort(function () {
        return 0.5 - Math.random();
      })
    },
    location: {
      x: x,
      y: y
    }
  };
  return pin;
};

var generatePinsJs = function (mapWidth) {
  var pins = [];
  for (var i = 0; i < COUNT_OF_JS_OBJECTS; i++) {
    pins.push(generatePin(mapWidth));
  }
  return pins;
};

var prepareMap = function () {
  var mapPins = document.querySelector('.map__pins');
  var jsPins = generatePinsJs(mapPins.offsetWidth);
  var pins = createPins(jsPins);
  mapPins.appendChild(pins);
  eraseTagsClasses();
};

prepareMap();
