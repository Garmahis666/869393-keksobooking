'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var OK_CODE = 200;

  var sendRequest = function (xhr, url, type, data) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open(type, url);
    xhr.send(data);
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status === OK_CODE) {
          onLoad();
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
      sendRequest(xhr, URL_UPLOAD, 'POST', data);
    },
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status === OK_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      sendRequest(xhr, URL_LOAD, 'GET', null);
    }
  };
})();
