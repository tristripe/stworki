'use strict';

(function () {

  const urls = {
    SAVE: 'https://reqres.in/api/users'
  };

  const textErrors = {
    STATUS: 'Статус ответа: ',
    CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    TIME: 'мс'
  };

  const responses = {
    STATUS_OK: 201
  };

  const TIMEOUT = 10000;

  const createRequest = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === responses.STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(textErrors.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(textErrors.CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      onError(textErrors.TIMEOUT + xhr.timeout + textErrors.TIME);
    });
    return xhr;
  };

  const save = function (data, onLoad, onError) {
    const xhr = createRequest(onLoad, onError);
    xhr.open('POST', urls.SAVE);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  };

  window.backend = {
    save: save
  };

})();
