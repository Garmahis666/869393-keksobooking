'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var activePin = null;
  var styleClasses = {
    PIN_ACTIVE: 'map__pin--active',
    FROM_DISABLE: 'ad-form--disabled'
  };

  var randomSettings = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  };

  var togglePinActive = function () {
    if (activePin) {
      activePin.classList.toggle(styleClasses.PIN_ACTIVE);
      activePin = null;
    }
  };

  window.pin = {
    create: function (pin) {
      var newPin = pinTemplate.cloneNode(true);
      newPin.style.left = pin.location.x - Math.round(randomSettings.PIN_WIDTH / 2) + 'px';
      newPin.style.top = pin.location.y - randomSettings.PIN_HEIGHT + 'px';
      var pinImg = newPin.querySelector('img');
      pinImg.src = pin.author.avatar;
      pinImg.alt = pin.offer.title;
      newPin.addEventListener('click', function () {
        window.card.show(pin);
        togglePinActive();
        newPin.classList.add(styleClasses.PIN_ACTIVE);
        activePin = newPin;
      });
      return newPin;
    },
    deactivate: function () {
      togglePinActive();
    }
  };
})();
