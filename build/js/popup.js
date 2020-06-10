'use strict';

(function () {
  function popup() {
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup__close');
    const popupTrigger = document.querySelector('.button.button--footer');
    const ESC = 27;

    const isEscEvent = function(evt) {
      if (evt.keyCode === ESC) {
        closePopupHandler();
      }
    }

    const closePopupHandler = function () {
      popup.classList.remove('popup--active');
    }

    const openPopupHandler = function () {
      popup.classList.add('popup--active');
    }


    const openFeedback = function (evt) {
      openPopupHandler();
      popupClose.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', isEscEvent);
    }

    const closeFeedback = function (evt) {
      closePopupHandler();
      popupClose.removeEventListener('click', closePopupHandler);
      document.removeEventListener('keydown', isEscEvent);
    };

    popupTrigger.addEventListener('click', openFeedback);
    popupClose.addEventListener('click', closeFeedback);
  }

  popup();
})();
