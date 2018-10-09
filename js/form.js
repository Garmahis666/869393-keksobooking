'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var typeOfHousing = document.querySelector('#type');
  var costOfHousing = document.querySelector('#price');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var typesOfHousing = {
    flat: {name: 'Квартира', minCost: 1000},
    bungalo: {name: 'Бунгало', minCost: 0},
    house: {name: 'Дом', minCost: 5000},
    palace: {name: 'Дворец', minCost: 10000}
  };

  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var styleClasses = {
    PIN_ACTIVE: 'map__pin--active',
    FROM_DISABLE: 'ad-form--disabled'
  };

  var onTimeinChange = function () {
    timeout.value = timein.value;
  };

  var onTimeoutChange = function () {
    timein.value = timeout.value;
  };

  var onRoomNumberChange = function () {
    roomNumberChange();
  };

  var setMinPrice = function () {
    costOfHousing.min = typesOfHousing[typeOfHousing.value].minCost;
  };

  var roomNumberChange = function () {
    var capacityOptions = capacity.querySelectorAll('option');
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = roomsCapacity[roomNumber.value].indexOf(capacityOptions[i].value) === -1;
    }
    capacity.value = roomsCapacity[roomNumber.value][0];
  };

  var onUploadForm= function () {
    disableFrom();
    window.map.deactivate();
    var newMessage = successTemplate.cloneNode(true);
    main.appendChild(newMessage);
    (window.utils.debounce(function () {
      main.removeChild(newMessage);
    }, 2000))();
  };

  var onUploadFormError = function (message) {
    var newMessage = errorTemplate.cloneNode(true);
    newMessage.querySelector('p').innerText = message;
    var button = newMessage.querySelector('.error__button');
    button.addEventListener('click', function () {
      main.removeChild(newMessage);
      window.backend.upload(new FormData(adForm), onUploadForm, onUploadFormError);
    });
    main.appendChild(newMessage);
  };

  var enableForm = function () {
    adForm.classList.remove(styleClasses.FROM_DISABLE);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    address.readOnly = true;
    roomNumberChange();
    typeOfHousing.addEventListener('change', setMinPrice);
    roomNumber.addEventListener('change', onRoomNumberChange);
    timein.addEventListener('change', onTimeinChange);
    timeout.addEventListener('change', onTimeoutChange);
    adForm.addEventListener('submit', function (evt) {
      window.backend.upload(new FormData(adForm), onUploadForm, onUploadFormError);
      evt.preventDefault();
    });
  };

  var disableFrom = function () {
    adForm.classList.add(styleClasses.FROM_DISABLE);
    adForm.reset();
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
    typeOfHousing.removeEventListener('change', setMinPrice);
    roomNumber.removeEventListener('change', onRoomNumberChange);
    timein.removeEventListener('change', onTimeinChange);
    timeout.removeEventListener('change', onTimeoutChange);
  };

  window.form = {
    activate: function () {
      enableForm();
    },
    deactivate: function () {
      disableFrom();
    },
    setAddress: function (addressText) {
      address.value = addressText;
    }
  };
})();
