'use strict';

(function () {
  if ($('.goods__wrapper') && ($(window).width() < 1260)) {
    let goodsList = new Swiper('.goods__wrapper', {
      slidesPerView: 'auto',
      touchRatio: 1
    })
  } else {
    $('.goods__wrapper').removeClass('swiper-container');
    $('.goods__list').removeClass('swiper-wrapper');
    $('.goods__item').removeClass('swiper-slide');
  }
})();


