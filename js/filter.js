'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var elementsSelect = filters.querySelectorAll('select');

  var valueToPrice = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var compareValues = function (filter, value) {
    return value.toString() === filter.toString();
  };

  var rulesOfFilter = {
    'housing-type': function (element, pin) {
      return compareValues(element.value, pin['offer']['type']);
    },
    'housing-price': function (element, pin) {
      if (pin['offer']['price'] < valueToPrice[element.value].min || pin['offer']['price'] > valueToPrice[element.value].max) {
        return false;
      }
      return true;
    },
    'housing-rooms': function (element, pin) {
      return compareValues(element.value, pin['offer']['rooms']);
    },
    'housing-guests': function (element, pin) {
      return compareValues(element.value, pin['offer']['guests']);
    }
  };

  var inputFiltersToPin = function (arrayInPin, arrayInFilter) {
    for (var i = 0; i < arrayInFilter.length; i++) {
      if (!arrayInPin.includes(arrayInFilter[i])) {
        return false;
      }
    }
    return true;
  };

  window.filter = {
    addAction: function () {
      var elements = filters.querySelectorAll('select,input');
      elements.forEach(function (element) {
        element.addEventListener('change', window.map.refreshPins);
      });
    },
    doFilter: function (pin) {
      var elements = filters.querySelectorAll('input:checked');
      var featuresFilter = [];
      if (elements.length > 0) {
        featuresFilter = Array.prototype.slice.call(elements).map(function (element) {
          return element.value;
        });
      }
      if (!inputFiltersToPin(pin['offer']['features'], featuresFilter)) {
        return false;
      }
      for (var i = 0; i < elementsSelect.length; i++) {
        var element = elementsSelect[i];
        if (element.value !== 'any') {
          if (!rulesOfFilter[element.name](element, pin)) {
            return false;
          }
        }
      }
      return true;
    }
  };
})();
