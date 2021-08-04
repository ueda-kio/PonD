// import { toggleScrollStop } from '../_scroll-stop'
import ScrollManage from './_scrollManage';

class Modal {
  private _isOpen: boolean;
  private html: HTMLElement;
  private root: HTMLElement;
  private clickedOpener: HTMLElement | null = null;
  private handler = {
    focusManager: {
      /**
       * @summary モーダル自身にフォーカスをあてる
       */
      open: () => {
        this.root.focus();
      },
      /**
       * @summary トリガーにフォーカスを戻す
       */
      close: () => {
        if(this.clickedOpener) {
          this.clickedOpener.focus();
        }
      },
    },
    openClick: (e: MouseEvent) => {
      this.openModal(e);
    },
    openKeydown: (e: KeyboardEvent) => {
      if(
        e.key === ' ' ||
        e.key === 'Spacebar'
      ) {
        this.openModal(e);
      }
    },
    closeClick: () => {
      this.closeModal();
    },
    closeKeydown: (e: KeyboardEvent) => {
      if(
        e.key === 'Escape' ||
        e.key === 'Esc'
      ) {
        this.closeModal();
      }
    }
  }

  constructor(elem: HTMLElement) {
    this._isOpen = false;
    this.html = document.documentElement;
    this.root = elem;
    const openers = document.querySelectorAll<HTMLAnchorElement>(`[data-dialog-trigger="${this.root.id}"]`);
    const closers = this.root.querySelectorAll<HTMLElement>('.js-modal-closer');

    const setModal = () => {
      this.root.setAttribute('role', 'dialog');
      this.root.setAttribute('aria-modal', 'true');
      this.root.setAttribute('tabindex', '-1');
      this.root.hidden = true;
      this.root.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      const handler = (e: KeyboardEvent) => {
        if(
          e &&
          e.key === ' ' ||
          e.key === 'Space'
        ) {
          e.preventDefault();
        }
      };

      this.root.addEventListener('focus', () => {
        window.addEventListener('keydown', handler)
      });
      this.root.addEventListener('blur', () => {
        window.removeEventListener('keydown', handler)
      });
    };

    const setOpener = () => {
      if(openers) {
        openers.forEach((opener) => {
          if(opener.tagName !== 'BUTTON') {
            opener.setAttribute('role', 'button')
          }

          if(opener.tagName === 'A') {
            opener.href = `#${this.root.id}`
          }

          opener.setAttribute('aria-controls', `${this.root.id}`);
          opener.setAttribute('aria-haspopup', 'dialog');


          opener.addEventListener('click', (e) => {
            this.handler.openClick(e);
            this.clickedOpener = <HTMLElement>e.currentTarget;
          });

          if(opener.tagName === 'A') {
            opener.addEventListener('keydown', (e) => {
              this.handler.openKeydown(e);
              this.clickedOpener = <HTMLElement>e.currentTarget;
            })
          }
        });
      }
    };

    const setCloser = () => {
        if(closers) {
          closers.forEach((closer) => {
            closer.addEventListener('click', () => {
              if(this._isOpen) {
                console.log('btn');
                this.handler.closeClick();
              }
            })
          })
        }

        // Escボタンで閉じる処理
        window.addEventListener('keydown', (e: KeyboardEvent) => {
          if(this._isOpen) {
            this.handler.closeKeydown(e);
          }
        });
    }

    const init = () => {
      setModal();
      setOpener();
      setCloser();
    };

    init();
  }

  /**
   * @summary モーダルを開く
   * @param {Event} e クリックイベント、キーボードイベント
   */
  private openModal(e: MouseEvent | KeyboardEvent) {
    this._isOpen = true;
    e.preventDefault();
    e.stopPropagation();
    ScrollManage.scrollLock(true);
    this.root.classList.add('is-show');
    this.html.classList.add('is-modal');
    this.root.hidden = false;
    this.handler.focusManager.open();

    window.addEventListener('click', this.handler.closeClick);
  }

  /**
   * @summary モーダルを閉じる
   */
  private closeModal() {
    this._isOpen = false;
    ScrollManage.scrollLock(false);
    this.root.classList.remove('is-show');
    this.html.classList.remove('is-modal');
    this.root.hidden = true;
    this.handler.focusManager.close();

    window.removeEventListener('click', this.handler.closeClick);
  }

  // 強制的にモーダルを開く処理
  public forceOpenModal(event?: Event) {
    if(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this._isOpen = true;
    ScrollManage.scrollLock(true);
    this.root.classList.add('is-show');
    this.html.classList.add('is-modal');
    this.root.hidden = false;
    this.handler.focusManager.open();

    window.addEventListener('click', this.handler.closeClick);
  }
}

/**
 * 渡されたidのモーダルを開く
 * @param {string} id モーダルのid
 * @param {?Event} event
 */
const forceOpenModal = (id: string, event?: Event) => {
  const modal = document.getElementById(id);
  if(modal) {
    new Modal(modal).forceOpenModal(event);
  }
};

document.querySelectorAll<HTMLElement>('.js-modal').forEach((el) => {
  new Modal(el);
})

export { Modal, forceOpenModal }