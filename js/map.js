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

var createPin = function (pin) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  pinTemplate.style.left = pin.location.x + parseInt(pinTemplate.width, 40) / 2 + 'px';
  pinTemplate.style.top = pin.location.y + parseInt(pinTemplate.height, 40) + 'px;';
  pinTemplate.src = pin.author.avatar;
  pinTemplate.alt = pin.offer.title;
  return pinTemplate;
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
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  cardTemplate.querySelector('.popup__avatar').src = pin.author.avatar;
  cardTemplate.querySelector('.popup__title').textContent = pin.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = popupTypes.getType(pin.offer.type);
  cardTemplate.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  cardTemplate.querySelector('.popup__description').textContent = pin.offer.description;
  var features = cardTemplate.querySelector('.popup__features');
  var fetuareChild = features.querySelectorAll('.popup__feature');
  for (i = 0; i < fetuareChild.length; i++) {
    var featureName = fetuareChild[i].classList[1];
    if (pin.offer.features.indexOf(featuresClasses.getKey(featureName)) === -1) {
      features.removeChild(fetuareChild[i]);
    }
  }
  var popupPhotos = cardTemplate.querySelector('.popup__photos');
  popupPhotos.removeChild(popupPhotos.querySelector('.popup__photo'));
  for (var i = 0; i < pin.offer.photos.length; i++) {
    popupPhotos.appendChild(createPhoto(pin.offer.photos[i]));
  }
  map.insertBefore(cardTemplate, filter);
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

