'use strict';

(function () {
  var getRandom = function () {
    return 0.5 - Math.random();
  };

  window.utils = {
    randomSort: function (arrayToSort) {
      return arrayToSort.sort(getRandom);
    },
    getFeatureFromClass: function (classText) {
      return classText.split('--')[1];
    },
    getRandomValue: function (values) {
      return values[Math.floor(Math.random() * values.length)];
    }
  };
})();
