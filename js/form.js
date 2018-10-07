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

  window.setAddress = function (addressText) {
    address.value = addressText;
  };

  window.onTimeinChange = function () {
    timeout.value = timein.value;
  };

  window.onTimeoutChange = function () {
    timein.value = timeout.value;
  };

  window.onRoomNumberChange = function () {
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

  window.disableForms = function () {
    adForm.classList.add(styleClasses.FROM_DISABLE);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
  };

  window.activateForm = function () {
    enableForms();
    roomNumberChange();
    typeOfHousing.addEventListener('change', setMinPrice);
    roomNumber.addEventListener('change', window.onRoomNumberChange);
    timein.addEventListener('change', window.onTimeinChange);
    timeout.addEventListener('change', window.onTimeoutChange);
  };

  var enableForms = function () {
    adForm.classList.remove(styleClasses.FROM_DISABLE);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    address.setAttribute('disabled', 'disabled');
  };
})();
