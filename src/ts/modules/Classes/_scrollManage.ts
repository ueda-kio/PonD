const {documentElement: html, body} = document;

export class ScrollManage {
  /**
   * 再帰的な凍結
   * @param obj - 凍結させたいオブジェクト
   * @returns - 渡されたオブジェクト
   */
  public deepFreeze<T>(obj: T): Readonly<T> {
    Object.freeze(obj);

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const item = obj[key];

        if (
          typeof item === 'object' &&
          item !== null &&
          !Object.isFrozen(item)
        ) {
          this.deepFreeze(item);
        }
      }
    }

    return obj;
  }

  /**
   * スクロール量を渡すとその位置までスムーススクロールを実施する
   * スムーススクロール中にホイールや方向キー入力を検知するとスクロールを中断し、rejectする
   * @param _range スクロールする先
   * @returns Promise object.
   */
  public smoothScrollTo = (() => {
    return (_range: number): Promise<null> => {
      const range = Math.floor(_range); // 画面の拡大縮小に伴う小数点の回避
      const callback = (resolve: Function) => {
        const stop = () => {
          window.scroll({
            top: window.pageYOffset + 1,
            behavior: 'smooth',
          });
        };
        const keydown = (e?: KeyboardEvent) => {
          if (
            e &&
            (
              /Arrow/.test(e.key) ||
              [
                // for IE
                'Up',
                'Right',
                'Down',
                'Left',
              ].some(item => item === e!.key)
            )
          ) {
            stop();
          }
        };
        const once: Partial<AddEventListenerOptions> = {
          once: true,
        };

        if (range === Math.floor(window.pageYOffset)) {
          resolve();

          return;
        }

        window.addEventListener('keydown', keydown, once);
        window.addEventListener('wheel', stop, once);
        window.addEventListener('scrollend', () => {
          resolve(true);
          window.removeEventListener('keydown', keydown, once);
          window.removeEventListener('wheel', stop, once);
        }, once);
      };

      window.scroll({
        top: range,
        behavior: 'smooth',
      });

      return new Promise(callback);
    };
  })();

  /**
   * スクロール禁止切り替え
   * @param {boolean} bool trueの場合スクロールを禁止し、falseの場合はスクロールを許可する
   */
  scrollLock = (() => {
    let scrollbar = 0;
    let count = 0;
    const init = () => {
      if (html.getAttribute('data-scroll-disabled') === 'true') {
        return;
      }

      scrollbar = body.clientWidth;
      body.style.overflow = 'hidden';
      scrollbar = Math.abs(body.clientWidth - scrollbar);
      body.style.overflow = '';
    };

    const handler = (e: Event) => {
      e.preventDefault();
    };

    /**
     *@summary 矢印キーでのスクロールを停止
    * @param {KeyboardEvent} e
    */
    const handlerArrow = (e: KeyboardEvent) => {
      if (
        e &&
        (
          /Arrow/.test(e.key) ||
          [
            // for IE
            'Up',
            'Down',
          ].some(item => item === e!.key)
        )
      ) {
        handler(e);
      }
    };

    const option: Partial<AddEventListenerOptions> = {
      passive: false,
    };

    window.addEventListener('load', init);
    window.addEventListener('windowresized', init);

    return (bool: boolean): void => {
      if (bool === true) {
        count++;
        if (
          html.getAttribute('data-scroll-disabled') === 'true'
        ) {
          return;
        }

        // body.style.paddingRight = `${scrollbar}px`;

        html.setAttribute('data-scroll-disabled', 'true');
        window.addEventListener('touchmove', handler, option);
        window.addEventListener('mousewheel', handler, option);
        window.addEventListener('keydown', handlerArrow);

        return;
      } else if (bool === false) {
        count--;
        if (
          html.getAttribute('data-scroll-disabled') !== 'true' || count > 0
        ) {
          return;
        }

        html.setAttribute('data-scroll-disabled', 'false');
        // body.style.paddingRight = '';

        window.removeEventListener('touchmove', handler, option);
        window.removeEventListener('mousewheel', handler, option);
        window.removeEventListener('keydown', handlerArrow);

        return;
      }

      throw new TypeError('Argument is must be boolean, and required.');
    };
  })();

  private static _instance: ScrollManage | null;
  public static get instance(): ScrollManage {
    if (!this._instance) {
      this._instance = new ScrollManage();
    }

    return this._instance;
  }
}

const scrollManage = ScrollManage.instance;

export default scrollManage.deepFreeze(scrollManage);