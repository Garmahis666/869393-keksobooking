'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

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

  window.onTimeinChange = function () {
    timeout.value = timein.value;
  };

  window.onTimeoutChange = function () {
    timein.value = timeout.value;
  };

  window.onRoomNumberChange = function () {
    window.roomNumberChange();
  };

  window.roomNumberChange = function () {
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

  window.enableForms = function () {
    adForm.classList.remove(styleClasses.FROM_DISABLE);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    address.setAttribute('disabled', 'disabled');
  };
})();
