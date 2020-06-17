'use strict';
'use strict';

(function () {
  var urls = {
    SAVE: 'https://reqres.in/api/users'
  };
  var textErrors = {
    STATUS: 'Статус ответа: ',
    CONNECTION: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    TIME: 'мс'
  };
  var responses = {
    STATUS_OK: 201
  };
  var TIMEOUT = 10000;

  var createRequest = function createRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
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

  var save = function save(data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', urls.SAVE);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  };

  window.backend = {
    save: save
  };
})();
'use strict';

(function () {
  function popup() {
    var popup = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    var popupTrigger = document.querySelector('.button.button--footer');
    var popupForm = popup.querySelector('form');
    var body = document.querySelector('body');
    var ESC = 27;

    var isEscEvent = function isEscEvent(evt) {
      if (evt.keyCode === ESC) {
        closePopupHandler();
      }
    };

    var closePopupHandler = function closePopupHandler() {
      popup.classList.remove('popup--active');
      body.classList.remove('scroll-hidden');
    };

    var openPopupHandler = function openPopupHandler() {
      popup.classList.add('popup--active');
      body.classList.add('scroll-hidden');
    };

    var openFeedback = function openFeedback() {
      openPopupHandler();
      popupClose.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', isEscEvent);
      popupForm.reset();
    };

    var closeFeedback = function closeFeedback(evt) {
      closePopupHandler();
      popupClose.removeEventListener('click', closePopupHandler);
      document.removeEventListener('keydown', isEscEvent);
      popupForm.reset();
    };

    popupTrigger.addEventListener('click', openFeedback);
    popupClose.addEventListener('click', closeFeedback);
  }

  popup();
})();
'use strict';

(function () {
  function validate() {
    var usernameInput = document.querySelector('#username');
    var emailInput = document.querySelector('#email');
    var inputs = document.querySelectorAll('input:not([type="submit"])');
    var form = document.querySelector('.contact form');
    var success = document.querySelector('.popup__success');
    var submit = document.querySelector('.button--submit');
    var contact = document.querySelector('.contact');
    var popup = document.querySelector('.popup');

    function CustomValidation(input) {
      this.invalidities = [];
      this.validityChecks = [];
      this.inputNode = input;
      this.registerListener();
    }

    CustomValidation.prototype = {
      addInvalidity: function addInvalidity(message) {
        this.invalidities.push(message);
      },
      getInvalidities: function getInvalidities() {
        return this.invalidities.join('. \n');
      },
      checkValidity: function checkValidity(input) {
        for (var i = 0; i < this.validityChecks.length; i++) {
          var isInvalid = this.validityChecks[i].isInvalid(input);

          if (isInvalid) {
            this.addInvalidity(this.validityChecks[i].invalidityMessage);
          }

          var requirementElement = this.validityChecks[i].element;

          if (requirementElement) {
            if (isInvalid) {
              requirementElement.classList.add('contact__invalid');
              requirementElement.classList.remove('contact__valid');
            } else {
              requirementElement.classList.remove('contact__invalid');
              requirementElement.classList.add('contact__valid');
            }
          }
        }
      },
      checkInput: function checkInput() {
        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
          this.inputNode.setCustomValidity('');
        } else {
          var message = this.inputNode.CustomValidation.getInvalidities();
          this.inputNode.setCustomValidity(message);
        }
      },
      registerListener: function registerListener() {
        var CustomValidation = this;
        this.inputNode.addEventListener('keyup', function () {
          CustomValidation.checkInput();
        });
      }
    };
    var usernameValidityChecks = [{
      isInvalid: function isInvalid(input) {
        return input.value.length < 2;
      },
      invalidityMessage: 'Не меньше 2 символов',
      element: document.querySelector('label[for="username"] + .contact__requirements li:nth-child(1)')
    }, {
      isInvalid: function isInvalid(input) {
        var illegalCharacters = input.value.match(/[^a-zA-Zа-яА-Я0-9]/g);
        return illegalCharacters ? true : false;
      },
      invalidityMessage: 'Только цифры и буквы',
      element: document.querySelector('label[for="username"] + .contact__requirements li:nth-child(2)')
    }];
    var emailValidityChecks = [{
      isInvalid: function isInvalid(input) {
        var emailPattern = input.value.match(/[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i);
        return emailPattern ? false : true;
      },
      invalidityMessage: 'Пример почты: example@yandex.ru',
      element: document.querySelector('label[for="email"] + .contact__requirements li:nth-child(1)')
    }];
    usernameInput.CustomValidation = new CustomValidation(usernameInput);
    usernameInput.CustomValidation.validityChecks = usernameValidityChecks;
    emailInput.CustomValidation = new CustomValidation(emailInput);
    emailInput.CustomValidation.validityChecks = emailValidityChecks;

    var successHandler = function successHandler(evt) {
      contact.classList.add('visually-hidden');
      success.classList.remove('visually-hidden');
      console.log('Success');
      setTimeout(resetState, 3000);
    };

    var resetState = function resetState() {
      contact.classList.remove('visually-hidden');
      success.classList.add('visually-hidden');
      popup.classList.remove('popup--active');
    };

    var errorHandler = function errorHandler(evt) {
      console.log('Error');
    };

    function validate(evt) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
      }
    }

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(form), successHandler, errorHandler);
    });
    submit.addEventListener('click', validate);
  }

  validate();
})();