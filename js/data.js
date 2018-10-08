'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var pinDatebase;

  var onError = function (message) {
    var newMessage = errorTemplate.cloneNode(true);
    newMessage.querySelector('p').innerHTML = message;
    main.appendChild(newMessage);
  };

  var onSuccess = function (data) {
    pinDatebase = data;
  };

  window.data = {
    getPinsObjects: function () {
      var pins = [];
      for (var i = 0; i < pinDatebase.length; i++) {
        pins.push(pinDatebase[i]);
      }
      return pins;
    },
    load: function () {
      window.backend.load(onSuccess, onError);
    }
  };
})();
