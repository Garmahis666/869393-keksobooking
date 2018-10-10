'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var pinsDatebase;

  var onLoadPinsError = function (message) {
    var newMessage = errorTemplate.cloneNode(true);
    newMessage.querySelector('p').innerText = message;
    main.appendChild(newMessage);
  };

  var onLoadPins = function (data) {
    pinsDatebase = data;
  };

  window.data = {
    getPinsObjects: function () {
      return pinsDatebase;
    },
    load: function () {
      window.backend.load(onLoadPins, onLoadPinsError);
    }
  };
})();
