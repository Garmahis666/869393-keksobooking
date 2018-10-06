'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var activeCard = document.querySelector('.map__card');
  var filter = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var typesOfHousing = {
    flat: {name: 'Квартира', minCost: 1000},
    bungalo: {name: 'Бунгало', minCost: 0},
    house: {name: 'Дом', minCost: 5000},
    palace: {name: 'Дворец', minCost: 10000}
  };
  var activePin = null;
  var styleClasses = {
    PIN_ACTIVE: 'map__pin--active',
    FROM_DISABLE: 'ad-form--disabled'
  };

  var randomSettings = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    PICTURE_WIDTH: 45,
    PICTURE_HEIGHT: 40
  };

  window.createFragmentPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var newPin = createPin(pins[i]);
      fragment.appendChild(newPin);
    }
    return fragment;
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
      if (pin.offer.features.indexOf(window.getFeatureFromClass(featureName)) === -1) {
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

})();
