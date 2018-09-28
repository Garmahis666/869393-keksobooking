'use strict';

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
  MAX_Y: 630,
  PIN_WIDTH: 50,
  PIN_HEIGHT: 70,
  PICTURE_WIDTH: 45,
  PICTURE_HEIGHT: 40
};

var styleClasses = {
  PIN_ACTIVE: 'map__pin--active',
  FROM_DISABLE: 'ad-form--disabled'
};

var typesOfHousing = {
  flat: {name: 'Квартира', minCost: 1000},
  bungalo: {name: 'Бунгало', minCost: 0},
  house: {name: 'Дом', minCost: 5000},
  palace: {name: 'Дворец', minCost: 10000}
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var filter = document.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var activeCard = document.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('fieldset');
var activePin;
var typeOfHousing = document.querySelector('#type');
var costOfHousing = document.querySelector('#price');
var address = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var onMapPinMainMouseUpActivate = function () {
  activateMap();
  mapPinMain.removeEventListener('mouseup', onMapPinMainMouseUpActivate);
  typeOfHousing.addEventListener('change', setMinPrice);
  roomNumber.addEventListener('change', onRoomNumberChange);
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);
  address.value = mapPinMain.style.left.split('px')[0] + ', ' + mapPinMain.style.top.split('px')[0];
};

var onTimeinChange = function () {
  timeout.value = timein.value;
};

var onTimeoutChange = function () {
  timein.value = timeout.value;
};

var roomNumberChange = function () {
  var capacityOptions = capacity.querySelectorAll('option');
  var notChange = false;
  for (var i = 0; i < capacityOptions.length; i++) {
    if (roomNumber.value <= 3) {
      if (capacityOptions[i].value <= roomNumber.value && capacityOptions[i].value > 0) {
        capacityOptions[i].removeAttribute('disabled');
        if (!notChange) {
          capacity.value = capacityOptions[i].value;
          notChange = true;
        }
      } else {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      }
    } else {
      if (capacityOptions[i].value === '0') {
        capacityOptions[i].removeAttribute('disabled');
        if (!notChange) {
          capacity.value = capacityOptions[i].value;
          notChange = true;
        }
      } else {
        capacityOptions[i].setAttribute('disabled', 'disabled');
      }
    }
  }
};

var onRoomNumberChange = function () {
  roomNumberChange();
};

var setMinPrice = function () {
  costOfHousing.min = typesOfHousing[typeOfHousing.value].minCost;
};

var getAvatar = function (count) {
  var pictureNumber = count < 10 ? '0' + count : count;
  return ('img/avatars/user' + pictureNumber + '.png');
};

var getRandom = function () {
  return 0.5 - Math.random();
};

var randomSort = function (arrayToSort) {
  return arrayToSort.sort(getRandom);
};

var togglePinActive = function () {
  if (activePin) {
    activePin.classList.toggle(styleClasses.PIN_ACTIVE);
  }
};

var createPin = function (pin) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = pin.location.x - Math.round(randomSettings.PIN_WIDTH / 2) + 'px';
  newPin.style.top = pin.location.y - randomSettings.PIN_HEIGHT + 'px';
  var pinImg = newPin.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  newPin.addEventListener('click', function () {
    if (activeCard) {
      activeCard.remove();
      togglePinActive();
    }
    newPin.classList.add(styleClasses.PIN_ACTIVE);
    createCard(pin);
    activePin = newPin;
  });
  return newPin;
};

var getFeatureFromClass = function (classText) {
  return classText.split('--')[1];
};

var createPhoto = function (src) {
  var newPhoto = document.createElement('img');
  newPhoto.src = src;
  newPhoto.classList.add('popup__photo');
  newPhoto.width = randomSettings.PICTURE_WIDTH;
  newPhoto.height = randomSettings.PICTURE_HEIGHT;
  newPhoto.alt = 'Фотография жилья';
  return newPhoto;
};

var createCard = function (pin) {
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__avatar').src = pin.author.avatar;
  newCard.querySelector('.popup__title').textContent = pin.offer.title;
  newCard.querySelector('.popup__text--address').textContent = pin.offer.address;
  newCard.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = typesOfHousing[pin.offer.type].name;
  newCard.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  newCard.querySelector('.popup__description').textContent = pin.offer.description;
  var closedCard = newCard.querySelector('.popup__close');
  closedCard.addEventListener('click', function () {
    togglePinActive();
    activePin = null;
    newCard.remove();
  });
  var features = newCard.querySelector('.popup__features');
  var featureChild = features.querySelectorAll('.popup__feature');
  for (i = 0; i < featureChild.length; i++) {
    var featureName = featureChild[i].classList[1];
    if (pin.offer.features.indexOf(getFeatureFromClass(featureName)) === -1) {
      features.removeChild(featureChild[i]);
    }
  }
  var popupPhoto = newCard.querySelector('.popup__photos');
  for (var i = 0; i < pin.offer.photos.length; i++) {
    popupPhoto.appendChild(createPhoto(pin.offer.photos[i]));
  }
  activeCard = newCard;
  map.insertBefore(newCard, filter);
};

var createFragmentPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var newPin = createPin(pins[i]);
    fragment.appendChild(newPin);
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

var generatePin = function (mapWidth, count) {
  var x = Math.floor(Math.random() * mapWidth);
  var y = Math.floor((Math.random() * (randomSettings.MAX_Y - randomSettings.MIN_Y)) + randomSettings.MIN_Y);
  var featuresCount = Math.floor(Math.random() * randomSettings.FEATURES.length - 1);
  var features = randomSort(randomSettings.FEATURES).slice(featuresCount);
  var pin = {
    author: {
      avatar: getAvatar(count)
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
      photos: randomSort(randomSettings.PHOTOS)
    },
    location: {
      x: x,
      y: y
    }
  };
  return pin;
};

var getPinsObjects = function (mapWidth) {
  var pins = [];
  for (var i = 1; i <= OFFERS_AMOUNT; i++) {
    pins.push(generatePin(mapWidth, i));
  }
  return pins;
};

var activateMap = function () {
  var pinsObject = getPinsObjects(mapPins.offsetWidth);
  var pins = createFragmentPins(pinsObject);
  mapPins.appendChild(pins);
  eraseTagsClasses();
  enableForms();
  roomNumberChange();
};

var disableForms = function () {
  adForm.classList.add(styleClasses.FROM_DISABLE);
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
};

var enableForms = function () {
  adForm.classList.remove(styleClasses.FROM_DISABLE);
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  address.setAttribute('disabled', 'disabled');
};

var prepareMap = function () {
  mapPinMain.addEventListener('mouseup', onMapPinMainMouseUpActivate);
  disableForms();
};

prepareMap();
