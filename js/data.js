'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var pinsDatebase;

  var onError = function (message) {
    var newMessage = errorTemplate.cloneNode(true);
    newMessage.querySelector('p').innerHTML = message;
    main.appendChild(newMessage);
  };

  var onSuccess = function (data) {
    pinsDatebase = data;
  };

  window.data = {
    getPinsObjects: function () {
      return pinsDatebase;
    },
    load: function () {
      window.backend.load(onSuccess, onError);
    }
  };
})();
