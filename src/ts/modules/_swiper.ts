import { Carousel } from './Classes/_Carousel';

export const swiper = () => {
  const swiperElement = document.querySelector<HTMLElement>('.swiper-container');

  if(!swiperElement) return false;

  const nextBtn = document.querySelector<HTMLElement>('.p-home__swiperBtn--next');
  const prevBtn = document.querySelector<HTMLElement>('.p-home__swiperBtn--prev');
  const pagination = document.querySelector<HTMLElement>('.swiper-pagination');

  const swiper = new Carousel(swiperElement, nextBtn, prevBtn, pagination)

  // const swiper = new Swiper(swiperElement, {
  //   loop: true,
  //   effect: 'fade',
  //   speed: 500,

  //   keyboard: {
  //     enabled: true,
  //     onlyInViewport: false,
  //   },

  //   pagination: {
  //     el: '.swiper-pagination',
  //   },

  //   navigation: {
  //     nextEl: '.p-home__swiperBtn--next',
  //     prevEl: '.p-home__swiperBtn--prev',
  //   },

  //   autoplay: {
  //     delay: 5000,
  //   },
  // })

  const autoPlayBtn = document.querySelector<HTMLElement>('.p-home__swiperAutoBtn');
  const hashId = document.querySelector<HTMLElement>('.swiper-wrapper')!.getAttribute('id');
  const pauseBtn = document.querySelector<HTMLElement>('.p-home__swiperAutoBtn--pause');
  const playBtn = document.querySelector<HTMLElement>('.p-home__swiperAutoBtn--play');

  const toggleAutoPlay = () => {
    if(swiper.autoplay.running) {
      swiper.autoplay.stop()
      playBtn!.hidden = false;
      pauseBtn!.hidden = true;
    } else {
      swiper.autoplay.start();
      playBtn!.hidden = true;
      pauseBtn!.hidden = false;
    }

    autoPlayBtn!.classList.toggle('is-play');
    autoPlayBtn!.classList.toggle('is-pause');
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
    autoPlayBtn!.setAttribute('aria-controls', hashId!);

    playBtn!.hidden = true;

    autoPlayBtn!.addEventListener('click', () => {
      toggleAutoPlay();
    });
  };

  init();
}
