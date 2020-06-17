'use strict';

(function () {
  function popup() {
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup__close');
    const popupTrigger = document.querySelector('.button.button--footer');
    const popupForm = popup.querySelector('form');
    const body = document.querySelector('body');
    const ESC = 27;

    const isEscEvent = function(evt) {
      if (evt.keyCode === ESC) {
        closePopupHandler();
      }
    }

    const closePopupHandler = () => {
      popup.classList.remove('popup--active');
      body.classList.remove('scroll-hidden');
    }

    const openPopupHandler = function () {
      popup.classList.add('popup--active');
      body.classList.add('scroll-hidden');
    }


    const openFeedback = () => {
      openPopupHandler();
      popupClose.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', isEscEvent);
      popupForm.reset();
    }

    const closeFeedback = function (evt) {
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
