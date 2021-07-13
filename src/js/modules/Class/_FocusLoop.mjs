import { TABBABLE_ELEMS } from "../utils/constants.mjs";

export class FocusLoop {
  constructor(elm) {
    this.root = elm;
    this.focusElmList = Array.from(this.root.querySelectorAll(TABBABLE_ELEMS));
    if(this.focusElmList.length !== 0) {
      this.firstElm = this.focusElmList[0];
      this.lastElm = this.focusElmList.slice(-1)[0]; // focusElmListの最後の要素

      /**
       * 最初の要素にフォーカスをあてる
       * @param {Event} e キーイベント
       * @returns {void}
       */
      const backFocusToFirst = (e) => {
        if(e.shiftKey && e.key === 'Tab') {
          return false;
        } else if (e.key === 'Tab') {
          this.firstElm.focus();
          e.preventDefault();
        }
      };

      /**
       * 最後の要素にフォーカスをあてる
       * @param {Event} e キーイベント
       * @returns {void}
       */
      const backFocusToLast = (e) => {
        if(e.shiftKey && e.key === 'Tab') {
          this.lastElm.focus();
          e.preventDefault();
        } else if (e.key === 'Tab') {
          return false;
        }
      };

      const init = () => {
        this.firstElm.addEventListener('keydown', (e) => {
          backFocusToLast(e);
        });

        this.lastElm.addEventListener('keydown', (e) => {
          backFocusToFirst(e);
        });
      };
      init();
    }
  }
}

document.querySelectorAll('.js-focus-loop').forEach((el) => {
  new FocusLoop(el);
});