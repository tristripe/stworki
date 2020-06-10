'use strict';

(function () {
  function validate() {
    const usernameInput = document.querySelector('#username');
    const emailInput = document.querySelector('#email');
    const inputs = document.querySelectorAll('input:not([type="submit"])');
    const form = document.querySelector('.contact form');


    function CustomValidation(input) {
      this.invalidities = [];
      this.validityChecks = [];

      this.inputNode = input;

      this.registerListener();
    }

    CustomValidation.prototype = {
      addInvalidity: function(message) {
        this.invalidities.push(message);
      },

      getInvalidities: function() {
        return this.invalidities.join('. \n');
      },

      checkValidity: function(input) {
        for (var i = 0; i < this.validityChecks.length; i++) {

          let isInvalid = this.validityChecks[i].isInvalid(input);
          if (isInvalid) {
            this.addInvalidity(this.validityChecks[i].invalidityMessage);
          }

          let requirementElement = this.validityChecks[i].element;

          if (requirementElement) {
            if (isInvalid) {
              requirementElement.classList.add('contact__invalid');
              requirementElement.classList.remove('contact__valid');
            } else {
              requirementElement.classList.remove('contact__invalid');
              requirementElement.classList.add('contact__valid');
            }

          } // end if
        } // end for
      },

      checkInput: function() {

        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
          this.inputNode.setCustomValidity('');
        } else {
          let message = this.inputNode.CustomValidation.getInvalidities();
          this.inputNode.setCustomValidity(message);
        }
      },

      registerListener: function() {

        let CustomValidation = this;

        this.inputNode.addEventListener('keyup', function() {
          CustomValidation.checkInput();
        });
      }
    };


    const usernameValidityChecks = [{
        isInvalid: function(input) {
          return input.value.length < 2;
        },
        invalidityMessage: 'Не меньше 2 символов',
        element: document.querySelector('label[for="username"] .contact__requirements li:nth-child(1)')
      },
      {
        isInvalid: function(input) {
          let illegalCharacters = input.value.match(/[^a-zA-Zа-яА-Я0-9]/g);
          return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Только цифры и буквы',
        element: document.querySelector('label[for="username"] .contact__requirements li:nth-child(2)')
      }
    ];

    const emailValidityChecks = [{
      isInvalid: function(input) {
        let emailPattern = input.value.match(/[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i);
        return emailPattern ? false : true;
      },
      invalidityMessage: 'Пример почты: example@yandex.ru',
      element: document.querySelector('label[for="email"] .contact__requirements li:nth-child(1)')
    }];

    usernameInput.CustomValidation = new CustomValidation(usernameInput);
    usernameInput.CustomValidation.validityChecks = usernameValidityChecks;
    emailInput.CustomValidation = new CustomValidation(emailInput);
    emailInput.CustomValidation.validityChecks = emailValidityChecks;

    function validate() {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
      }
    }


    const submit = document.querySelector('.button--submit');
    submit.addEventListener('click', validate);
    form.addEventListener('submit', validate);
  }

  validate();
}());
