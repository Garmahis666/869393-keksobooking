'use strict';

(function () {
  var OK_TIMEOUT = 5000;
  var ESC_KEYCODE = 'Escape';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EMPTY_AVATAR_IMAGE = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var typeOfHousing = document.querySelector('#type');
  var costOfHousing = document.querySelector('#price');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var clearFormButton = document.querySelector('.ad-form__reset');
  var fotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var fotoBox = document.querySelector('.ad-form__photo-container');

  var typesOfHousing = {
    flat: {name: 'Квартира', minCost: 1000},
    bungalo: {name: 'Бунгало', minCost: 0},
    house: {name: 'Дом', minCost: 5000},
    palace: {name: 'Дворец', minCost: 10000}
  };

  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var styleClasses = {
    PIN_ACTIVE: 'map__pin--active',
    FROM_DISABLE: 'ad-form--disabled'
  };

  var onTimeinChange = function () {
    timeout.value = timein.value;
  };

  var onTimeoutChange = function () {
    timein.value = timeout.value;
  };

  var onRoomNumberChange = function () {
    roomNumberChange();
  };

  var setMinPrice = function () {
    costOfHousing.min = typesOfHousing[typeOfHousing.value].minCost;
  };

  var roomNumberChange = function () {
    var capacityOptions = capacity.querySelectorAll('option');
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = roomsCapacity[roomNumber.value].indexOf(capacityOptions[i].value) === -1;
    }
    capacity.value = roomsCapacity[roomNumber.value][0];
  };

  var onUploadForm = function () {
    disableFrom();
    window.map.deactivate();
    var newMessage = successTemplate.cloneNode(true);
    main.appendChild(newMessage);
    (window.utils.debounce(function () {
      main.removeChild(newMessage);
    }, OK_TIMEOUT))();
    newMessage.addEventListener('click', function () {
      main.removeChild(newMessage);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEYCODE) {
        main.removeChild(newMessage);
      }
    });
  };

  var onUploadFormError = function (message) {
    var newMessage = errorTemplate.cloneNode(true);
    newMessage.querySelector('p').innerText = message;
    var button = newMessage.querySelector('.error__button');
    button.addEventListener('click', function () {
      main.removeChild(newMessage);
      window.backend.upload(new FormData(adForm), onUploadForm, onUploadFormError);
    });
    newMessage.addEventListener('click', function () {
      main.removeChild(newMessage);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEYCODE) {
        main.removeChild(newMessage);
      }
    });
    main.appendChild(newMessage);
  };

  var enableForm = function () {
    adForm.classList.remove(styleClasses.FROM_DISABLE);
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    address.readOnly = true;
    roomNumberChange();
    clearFormButton.addEventListener('click', onClearForm);
    typeOfHousing.addEventListener('change', setMinPrice);
    roomNumber.addEventListener('change', onRoomNumberChange);
    timein.addEventListener('change', onTimeinChange);
    timeout.addEventListener('change', onTimeoutChange);
    avatarChooser.addEventListener('change', onChangeAvatar);
    fotoChooser.addEventListener('change', onAddPhoto);
    adForm.addEventListener('submit', function (evt) {
      window.backend.upload(new FormData(adForm), onUploadForm, onUploadFormError);
      evt.preventDefault();
    });
  };

  var clearAllPhoto = function () {
    clearAvatar();
    clearPhotos();
  };

  var onClearForm = function () {
    disableFrom();
    window.map.deactivate();
  };

  var createPhotoContainer = function () {
    var divContainer = document.createElement('div');
    divContainer.classList.add('ad-form__photo');
    return divContainer;
  };

  var disableFrom = function () {
    adForm.classList.add(styleClasses.FROM_DISABLE);
    adForm.reset();
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
    clearAllPhoto();
    typeOfHousing.removeEventListener('change', setMinPrice);
    roomNumber.removeEventListener('change', onRoomNumberChange);
    timein.removeEventListener('change', onTimeinChange);
    timeout.removeEventListener('change', onTimeoutChange);
    avatarChooser.removeEventListener('change', onChangeAvatar);
    clearFormButton.removeEventListener('click', onClearForm);
    fotoChooser.removeEventListener('change', onAddPhoto);
  };

  var onChangeAvatar = function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var clearAvatar = function () {
    avatar.src = EMPTY_AVATAR_IMAGE;
  };

  var clearPhotos = function () {
    var elements = fotoBox.querySelectorAll('.ad-form__photo');
    if (elements) {
      Array.prototype.forEach.call(elements, function (node) {
        node.parentNode.removeChild(node);
      });
    }
  };

  var createPhoto = function (photo) {
    var divContainer = createPhotoContainer();
    var photoContainer = document.createElement('img');
    photoContainer.style.width = '100%';
    photoContainer.style.height = '100%';
    photoContainer.src = photo;
    divContainer.appendChild(photoContainer);
    return divContainer;
  };

  var onAddPhoto = function () {
    for (var i = 0; i < fotoChooser.files.length; i++) {
      var file = fotoChooser.files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.onload = (function () {
          return function (e) {
            fotoBox.appendChild(createPhoto(e.target.result));
          };
        })(file);
        reader.readAsDataURL(file);
      }
    }
  };

  window.form = {
    activate: function () {
      enableForm();
    },
    deactivate: function () {
      disableFrom();
    },
    setAddress: function (addressText) {
      address.value = addressText;
    }
  };
})();
