import { TABBABLE_ELEMS } from "../utils/constants";

export class FocusLoop {
  constructor(elm: HTMLElement) {
    const root = elm;
    const focusElmList: Array<HTMLElement> = Array.from(root.querySelectorAll<HTMLElement>(TABBABLE_ELEMS));
    if(focusElmList) {
      const firstElm: HTMLElement = focusElmList[0];
      const lastElm: HTMLElement = focusElmList.slice(-1)[0]; // focusElmListの最後の要素

      /**
       * 最初の要素にフォーカスをあてる
       * @param {Event} e キーイベント
       * @returns {void}
       */
      const backFocusToFirst = (e: KeyboardEvent): false | void => {
        if(e.shiftKey && e.key === 'Tab') {
          return false;
        } else if (e.key === 'Tab') {
          firstElm.focus();
          e.preventDefault();
        }
      };

      /**
       * 最後の要素にフォーカスをあてる
       * @param {Event} e キーイベント
       * @returns {void}
       */
      const backFocusToLast = (e: KeyboardEvent): false | void => {
        if(e.shiftKey && e.key === 'Tab') {
          lastElm.focus();
          e.preventDefault();
        } else if (e.key === 'Tab') {
          return false;
        }
      };

      const init = (): void => {
        firstElm.addEventListener('keydown', (e: KeyboardEvent) => {
          backFocusToLast(e);
        });

        lastElm.addEventListener('keydown', (e: KeyboardEvent) => {
          backFocusToFirst(e);
        });
      };
      init();
    }
  }
}

document.querySelectorAll<HTMLElement>('.js-focus-loop').forEach((el) => {
  new FocusLoop(el);
});
