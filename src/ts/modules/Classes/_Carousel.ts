// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Swiper, {Pagination, Autoplay} from 'swiper';
import { SwiperOptions } from 'swiper';
// import Autoplay from 'swiper'

export class Carousel {
  public _swiper: Swiper;
  public autoplay: Autoplay | undefined;
  private _swiperOptions: SwiperOptions;
  private _navigationBtn: HTMLElement | null = null;
  private _currentNavigationBtn: HTMLButtonElement | null = null;

  constructor(root: HTMLElement, nextBtn: HTMLElement | null, prevBtn: HTMLElement | null, navigationBtn: HTMLElement | null, options?: SwiperOptions) {
    this._swiperOptions = {
      loop: true,
      threshold: 15,
      centeredSlides: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: `.${navigationBtn?.classList[0]}`,
      },
      navigation: {
        nextEl: `.${nextBtn?.classList[0]}`,
        prevEl: `.${prevBtn?.classList[0]}`,
      },
    };

    if (options) {
      this._swiperOptions = Object.assign(this._swiperOptions, options);
    }

    const modules = [
      Pagination,
    ];

    Swiper.use(modules);

    console.log(`${navigationBtn?.classList[0]}`)
    this._swiper = new Swiper(root, this._swiperOptions);
    // this.autoplay = this._swiper.autoplay;
    this._navigationBtn = navigationBtn;

    if (navigationBtn) {
      // this._navigationBtn = navigationBtn.querySelectorAll('button');
      // 最初のボタンをカレントに設定しておく
      // this._currentNavigationBtn = navigationBtn.item(0);
      // this._currentNavigationBtn.classList.add('is-active');
    }
  }

  public getHashId () {
    return document.querySelector<HTMLElement>('.swiper-wrapper')!.getAttribute('id');
  }

}
