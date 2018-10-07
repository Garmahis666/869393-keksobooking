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

  var activeMap = false;

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  var rangeOfCoords = {
    minX: 0,
    maxX: mapPins.offsetWidth - randomSettings.MAIN_PIN_WIDTH,
    minY: 130 - randomSettings.MAIN_PIN_HEIGHT,
    maxY: 630 - randomSettings.MAIN_PIN_HEIGHT
  };

  var calculateAddress = function () {
    var x = parseInt(mapPinMain.style.left.split('px')[0], 0) + Math.round(randomSettings.MAIN_PIN_WIDTH / 2);
    var y = parseInt(mapPinMain.style.top.split('px')[0], 0) + randomSettings.MAIN_PIN_HEIGHT;
    return x + ', ' + y;
  };

  var checkCoords = function (x, y) {
    if (x < rangeOfCoords.minX) {
      x = rangeOfCoords.minX;
    }
    if (y < rangeOfCoords.minY) {
      y = rangeOfCoords.minY;
    }
    if (x > rangeOfCoords.maxX) {
      x = rangeOfCoords.maxX;
    }
    if (y > rangeOfCoords.maxY) {
      y = rangeOfCoords.maxY;
    }
    return [x, y];
  };

  var onMapPinMainMouseUpActivate = function (evt) {
    evt.preventDefault();
    if (!activeMap) {
      activateMap();
      window.form.activateForm();
    }
    document.removeEventListener('mouseup', onMapPinMainMouseUpActivate);
    document.removeEventListener('mousemove', onMapPinMainMouseMove);
    mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
    window.form.setAddress(calculateAddress());
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
    var newCoords = checkCoords(mapPinMain.offsetLeft - shift.x, mapPinMain.offsetTop - shift.y);
    mapPinMain.style.top = newCoords[1] + 'px';
    mapPinMain.style.left = newCoords[0] + 'px';
    window.form.setAddress(calculateAddress());
  };

  var eraseTagsClasses = function () {
    var element = document.querySelector('.map.map--faded');
    element.classList.remove('map--faded');
  };

  var createFragmentPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var newPin = window.pin.createPin(pins[i]);
      fragment.appendChild(newPin);
    }
    return fragment;
  };

  var activateMap = function () {
    var pinsObject = window.data.getPinsObjects(mapPins.offsetWidth);
    var pins = createFragmentPins(pinsObject);
    mapPins.appendChild(pins);
    eraseTagsClasses();
    activeMap = true;
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  window.form.disableForm();

})();
