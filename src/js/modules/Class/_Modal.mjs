import { toggleScrollStop } from '../_scroll-stop.mjs'

class Modal {
  constructor(elem) {
    this.html = document.documentElement;
    this.root = elem;
    this.openers = document.querySelectorAll(`[data-dialog-trigger="${this.root.id}"]`);
    this.clickedOpener = undefined;
    this.closers = this.root.querySelectorAll('.js-modal-closer');
    this.handler = {
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
      openClick: (e) => {
        this.openModal(e);
      },
      openKeydown: (e) => {
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
      closeKeydown: (e) => {
        if(
          e.key === 'Escape' ||
          e.key === 'Esc'
        ) {
          this.closeModal();
        }
      }
    }

    const setModal = () => {
      this.root.setAttribute('role', 'dialog');
      this.root.setAttribute('aria-modal', 'true');
      this.root.setAttribute('tabindex', '-1');
      this.root.hidden = true;
    };

    const setOpener = () => {
      if(this.openers) {
        this.openers.forEach((opener) => {
          if(opener.tagName !== 'BUTTON') {
            opener.setAttribute('role', 'button')
          }

          if(
            opener.tagName === 'A' &&
            !opener.href
          ) {
            opener.href = `#${this.root.id}`
          }

          opener.setAttribute('aria-controls', `${this.root.id}`);
          opener.setAttribute('aria-haspopup', 'dialog');


          opener.addEventListener('click', (e) => {
            this.handler.openClick(e);
            this.clickedOpener = e.currentTarget;
          });

          if(opener.tagName === 'A') {
            opener.addEventListener('keydown', (e) => {
              this.handler.openKeydown(e);
              this.clickedOpener = e.currentTarget;
            })
          }
        });
      }
    };

    const setCloser = () => {
        if(this.closers) {
          this.closers.forEach((closer) => {
            closer.addEventListener('click', () => {
              if(this._isOpen) {
                this.handler.closeClick();
              }
            })
          })
        }

        // モーダル以外の画面クリックで閉じる処理
        document.addEventListener('click', (e) => {
          if(
            this.root.classList.contains('is-show') &&
            !e.target.closest('.js-modal') &&
            this._isOpen
          ) {
            this.closeModal();
          }
        });

        // Escボタンで閉じる処理
        window.addEventListener('keydown', (e) => {
          if(this._isOpen) {
            this.handler.closeKeydown(e);
          }
        })
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
  openModal(e) {
    this._isOpen = true;
    e.preventDefault();
    e.stopPropagation();
    toggleScrollStop();
    this.root.classList.add('is-show');
    this.html.classList.add('is-modal');
    this.root.hidden = false;
    this.handler.focusManager.open();
  }

  closeModal() {
    this._isOpen = false;
    toggleScrollStop();
    this.root.classList.remove('is-show');
    this.html.classList.remove('is-modal');
    this.root.hidden = true;
    this.handler.focusManager.close();
    // if(this.openers) {
    //   this.openers[0].focus(true);
    // }
  }

  // 強制的にモーダルを開く処理
  forceOpenModal(event) {
    if(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this._isOpen = true;
    toggleScrollStop();
    this.root.classList.add('is-show');
    this.html.classList.add('is-modal');
    this.root.hidden = false;
    this.handler.focusManager.open();
  }
}

/**
 * 渡されたidのモーダルを開く
 * @param {string} id モーダルのid
 * @param {?Event} event
 * @returns {void}
 */
const forceOpenModal = (id, event) => {
  const modal = document.getElementById(id);
  if(modal) {
    new Modal(modal).forceOpenModal(event);
  }
};

document.querySelectorAll('.js-modal').forEach((el) => {
  new Modal(el);
})

export { Modal, forceOpenModal }