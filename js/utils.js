'use strict';

(function () {
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
})();
