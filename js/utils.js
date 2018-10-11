'use strict';

(function () {
  window.utils = {
    getFeatureFromClass: function (classText) {
      return classText.split('--')[1];
    },
    debounce: function (fun, interval) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, interval);
      };
    }
  };
})();
