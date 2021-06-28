import Swiper from 'swiper/bundle'

export const swiper = () => {

  const swiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'fade',
    speed: 500,

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.p-home__swiperBtn--next',
      prevEl: '.p-home__swiperBtn--prev',
    },

    autoplay: {
      delay: 5000,
    },
  })

  const autoPlayBtn = document.querySelector('.p-home__swiperAutoBtn');
  const hashId = document.querySelector('.swiper-wrapper').getAttribute('id');
  const pauseBtn = document.querySelector('.p-home__swiperAutoBtn--pause');
  const playBtn = document.querySelector('.p-home__swiperAutoBtn--play');

  const toggleAutoPlay = () => {
    if(swiper.autoplay.running) {
      swiper.autoplay.stop()
      playBtn.hidden = false;
      pauseBtn.hidden = true;
    } else {
      swiper.autoplay.start();
      playBtn.hidden = true;
      pauseBtn.hidden = false;
    }

    autoPlayBtn.classList.toggle('is-play');
    autoPlayBtn.classList.toggle('is-pause');
  }

  // TODO focusループができない。要検討。
  // const pauseBtn = document.querySelector('.p-home__swiperAutoBtn--pause');
  // const playBtn = document.querySelector('.p-home__swiperAutoBtn--play');

  // pauseBtn.addEventListener('keydown', (e) => {
  //   if(e.key === 'Enter' || e.key === ' ') {
  //     playBtn.focus();
  //     console.log(e.key);
  //   }
  //   console.log(document.activeElement);
  // })
  // playBtn.addEventListener('keydown', (e) => {
  //   if(e.key === 'Enter' || e.code === 'Space') {
  //     pauseBtn.focus();
  //     console.log('press play');
  //   }
  //   console.log(document.activeElement);
  // })

  const init = () => {
    autoPlayBtn.setAttribute('aria-controls', hashId);

    playBtn.hidden = true;

    autoPlayBtn.addEventListener('click', () => {
      toggleAutoPlay();
    });
  };

  init();
}
