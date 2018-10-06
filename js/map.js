'use strict';

(function () {

  var randomSettings = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 87
  };

  var startCoords = {
    x: 0,
    xStart: 0,
    y: 0,
    yStart: 0
  };

  var typesOfHousing = {
    flat: {name: 'Квартира', minCost: 1000},
    bungalo: {name: 'Бунгало', minCost: 0},
    house: {name: 'Дом', minCost: 5000},
    palace: {name: 'Дворец', minCost: 10000}
  };

  var activeMap = false;

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var typeOfHousing = document.querySelector('#type');
  var costOfHousing = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var address = document.querySelector('#address');

  var calculateAddress = function () {
    var x = parseInt(mapPinMain.style.left.split('px')[0], 0) + Math.round(randomSettings.MAIN_PIN_WIDTH / 2);
    var y = parseInt(mapPinMain.style.top.split('px')[0], 0) + randomSettings.MAIN_PIN_HEIGHT;
    return x + ', ' + y;
  };

  var onMapPinMainMouseUpActivate = function (evt) {
    evt.preventDefault();
    if (!activeMap) {
      activateMap();
      typeOfHousing.addEventListener('change', setMinPrice);
      roomNumber.addEventListener('change', window.onRoomNumberChange);
      timein.addEventListener('change', window.onTimeinChange);
      timeout.addEventListener('change', window.onTimeoutChange);
    }
    document.removeEventListener('mouseup', onMapPinMainMouseUpActivate);
    document.removeEventListener('mousemove', onMapPinMainMouseMove);
    mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
    address.value = calculateAddress();
  };

  var onMapPinMainMouseDown = function (evt) {
    evt.preventDefault();
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    if (!(startCoords.xStart + startCoords.yStart)) {
      startCoords.xStart = mapPinMain.style.left;
      startCoords.yStart = mapPinMain.style.top;
    }
    document.addEventListener('mousemove', onMapPinMainMouseMove);
    document.addEventListener('mouseup', onMapPinMainMouseUpActivate);
    mapPinMain.removeEventListener('mousedown', onMapPinMainMouseDown);
  };

  var onMapPinMainMouseMove = function (evt) {
    evt.preventDefault();
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    var newCoords = window.checkCoords(mapPinMain.offsetLeft - shift.x, mapPinMain.offsetTop - shift.y);
    mapPinMain.style.top = newCoords[1] + 'px';
    mapPinMain.style.left = newCoords[0] + 'px';
    address.value = calculateAddress();
  };

  var setMinPrice = function () {
    costOfHousing.min = typesOfHousing[typeOfHousing.value].minCost;
  };

  var eraseTagsClasses = function () {
    var element = document.querySelector('.map.map--faded');
    element.classList.remove('map--faded');
  };

  var activateMap = function () {
    var pinsObject = window.getPinsObjects(mapPins.offsetWidth);
    var pins = window.createFragmentPins(pinsObject);
    mapPins.appendChild(pins);
    eraseTagsClasses();
    window.enableForms();
    window.roomNumberChange();
    activeMap = true;
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  window.disableForms();

})();
