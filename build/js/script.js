'use strict';

(function () {
  var offerLink = document.querySelector('.offer__link');
  var popup = document.querySelector('.popup');
  var popupInner = document.querySelector('.popup__inner');
  var closeButton = document.querySelector('.popup__close');

  var popupOpenHandler = function () {
    popup.classList.add('show');
    document.addEventListener('keydown', escCloseHandler);
    popup.addEventListener('click', outOfPopupHandler);
  };

  var popupCloseHandler = function () {
    popup.removeEventListener('keydown', escCloseHandler);
    popup.removeEventListener('click', outOfPopupHandler);
    popup.classList.remove('show');
  };

  var outOfPopupHandler = function (evt) {
    var isClickInside = popupInner.contains(evt.target);

    if (!isClickInside) {
      popupCloseHandler();
    }
  };

  var escCloseHandler = function (evt) {
    if (evt.keyCode === 27) {
      popupCloseHandler();
    }
  };

  offerLink.addEventListener('click', function (e) {
    e.preventDefault();
    popupOpenHandler();
  });


  closeButton.addEventListener('click', popupCloseHandler);
})();
