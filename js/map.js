'use strict';

var dataBase = [{
  author: {
    avatar: 'img/avatars/user02.png'
  },
  offer: {
    title: 'Большая уютная квартира',
    address: '600, 350',
    price: 1000,
    type: 'flat',
    rooms: 4,
    guests: 4,
    checkin: '12:00',
    checkout: '13:00',
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
    description: '',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },
  location: {
    x: 600,
    y: 350
  }
}];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createPin = function (pin) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = pin.location.x + parseInt(newPin.width, 40) / 2 + 'px';
  newPin.style.top = pin.location.y + parseInt(newPin.height, 40) + 'px;';
  newPin.src = pin.author.avatar;
  newPin.alt = pin.offer.title;
  return newPin;
};

var popupTypes = {
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
  newCard.querySelector('.popup__type').textContent = popupTypes.getType(pin.offer.type);
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

var mapPins = document.querySelector('.map__pins');
var pins = createPins(dataBase);
mapPins.appendChild(pins);

