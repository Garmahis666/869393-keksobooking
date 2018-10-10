'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var OK_CODE = 200;

  var prepareRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = prepareRequest(onLoad, onError);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = prepareRequest(onSuccess, onError);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();
