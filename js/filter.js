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
      max: 1000000
    }
  };

  var checkSelectFilters = function (element, pin) {
    switch (element.name) {
      case 'housing-type':
        if (element.value !== pin['offer']['type']) {
          return false;
        }
        break;
      case 'housing-price':
        if (pin['offer']['price'] < valueToPrice[element.value].min || pin['offer']['price'] > valueToPrice[element.value].max) {
          return false;
        }
        break;
      case 'housing-rooms':
        if (parseInt(element.value) !== pin['offer']['rooms']) {
          return false;
        }
        break;
      case 'housing-guests':
        if (parseInt(element.value) !== pin['offer']['guests']) {
          return false;
        }
        break;
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
      if (featuresFilter.some(ele => !pin['offer']['features'].includes(ele))) {
        return false;
      }
      for (var i = 0; i < elementsSelect.length; i++) {
        var element = elementsSelect[i];
        if (element.value !== 'any') {
          return checkSelectFilters(element, pin);
        }
      }
      return true;
    }
  };
})();
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
      max: 1000000
    }
  };

  var checkSelectFilters = function (element, pin) {
    switch (element.name) {
      case 'housing-type':
        if (element.value !== pin['offer']['type']) {
          return false;
        }
        break;
      case 'housing-price':
        if (pin['offer']['price'] < valueToPrice[element.value].min || pin['offer']['price'] > valueToPrice[element.value].max) {
          return false;
        }
        break;
      case 'housing-rooms':
        if (parseInt(element.value) !== pin['offer']['rooms']) {
          return false;
        }
        break;
      case 'housing-guests':
        if (parseInt(element.value) !== pin['offer']['guests']) {
          return false;
        }
        break;
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
      if (featuresFilter.some(ele => !pin['offer']['features'].includes(ele))) {
        return false;
      }
      for (var i = 0; i < elementsSelect.length; i++) {
        var element = elementsSelect[i];
        if (element.value !== 'any') {
          return checkSelectFilters(element, pin);
        }
      }
      return true;
    }
  };
})();
