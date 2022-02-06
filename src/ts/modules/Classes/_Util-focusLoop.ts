import { TABBABLE_ELEMS } from "../utils/constants";

export default (() => {
  const targetSelector = '[data-focus-loop]';

  class FocusLoop {
    private root: HTMLElement;
    private firstElm!: HTMLElement;
    private lastElm!: HTMLElement;

    constructor(target: HTMLElement) {
      this.root = target;
    }

    setBothEndElms(firstElm: HTMLElement, lastElm: HTMLElement) {
      this.firstElm = firstElm;
      this.lastElm = lastElm;
    }

    /**
     * 最初の要素にフォーカスを戻す
     * @param {KeyboardEvent} e キーイベント
     * @returns {void}
     */
    private focusOnFirstElm = (e: KeyboardEvent) => {
      if(!e.shiftKey && e.key === 'Tab') {
        this.firstElm.focus();
        e.preventDefault();
      }
    }

    /**
     * 最初の要素にフォーカスを戻す
     * @param {KeyboardEvent} e キーイベント
     * @returns {void}
     */
    private focusOnLastElm = (e: KeyboardEvent) => {
      if(e.shiftKey && e.key === 'Tab') {
        this.lastElm.focus();
        e.preventDefault();
      }
    };

    addEvent() {
      this.firstElm.addEventListener('keydown', (e: KeyboardEvent) => {
        this.focusOnLastElm(e);
      });

      this.lastElm.addEventListener('keydown', (e: KeyboardEvent) => {
        this.focusOnFirstElm(e);
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const targetElms = document.querySelectorAll<HTMLElement>(targetSelector);
    if (targetElms.length === 0) return;

    targetElms.forEach((targetElm) => {
      const focusLoop = new FocusLoop(targetElm);
      const focusElmList = Array.from(targetElm.querySelectorAll<HTMLElement>(TABBABLE_ELEMS));
      if (focusElmList.length === 0) return;

      const firstElm = focusElmList[0];
      const lastElm = focusElmList.slice(-1)[0]; // focusElmListの最後の要素
      focusLoop.setBothEndElms(firstElm, lastElm);

      focusLoop.addEvent();
    });
  });
})();