'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var randomSettings = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 87
  };

  var getRandom = function () {
    return 0.5 - Math.random();
  };

  window.randomSort = function (arrayToSort) {
    return arrayToSort.sort(getRandom);
  };

  window.getFeatureFromClass = function (classText) {
    return classText.split('--')[1];
  };

  window.getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var rangeOfCoords = {
    minX: 0,
    maxX: mapPins.offsetWidth - randomSettings.MAIN_PIN_WIDTH,
    minY: 130 - randomSettings.MAIN_PIN_HEIGHT,
    maxY: 630 - randomSettings.MAIN_PIN_HEIGHT
  };

  window.checkCoords = function (x, y) {
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
})();
