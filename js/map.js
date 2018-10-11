'use strict';

(function () {
  var FILTER_TIMEOUT = 500;
  var MAX_PINS = 5;
  var pinSettings = {
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
    maxX: mapPins.offsetWidth - pinSettings.MAIN_PIN_WIDTH,
    minY: 130 - pinSettings.MAIN_PIN_HEIGHT,
    maxY: 630 - pinSettings.MAIN_PIN_HEIGHT
  };

  var calculateAddress = function () {
    var x = parseInt(mapPinMain.style.left.split('px')[0], 0) + Math.round(pinSettings.MAIN_PIN_WIDTH / 2);
    var y = parseInt(mapPinMain.style.top.split('px')[0], 0) + pinSettings.MAIN_PIN_HEIGHT;
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
      window.form.activate();
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
    pins.forEach(function (pin) {
      var newPin = window.pin.create(pin);
      fragment.appendChild(newPin);
    });
    return fragment;
  };

  var filterPins = function () {
    var pinsObject = window.data.getPinsObjects().filter(window.filter.doFilter);
    return pinsObject.slice(0, MAX_PINS);
  };

  var addPins = function () {
    var pinsObject = filterPins();
    var pins = createFragmentPins(pinsObject);
    mapPins.appendChild(pins);
  };

  var activateMap = function () {
    addPins();
    eraseTagsClasses();
    window.filter.addAction();
    activeMap = true;
  };

  var clearPins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.prototype.forEach.call(pins, function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var deactivateMap = function () {
    document.querySelector('.map').classList.add('map--faded');
    clearPins();
    window.card.clear();
    mapPinMain.style.left = startCoords.xStart;
    mapPinMain.style.top = startCoords.yStart;
    activeMap = false;
  };

  window.map = {
    deactivate: function () {
      deactivateMap();
    },
    refreshPins: window.utils.debounce(function () {
      clearPins();
      window.card.clear();
      addPins();
    }, FILTER_TIMEOUT)
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  window.form.deactivate();
  window.form.setAddress(calculateAddress());
  window.data.load();
})();
