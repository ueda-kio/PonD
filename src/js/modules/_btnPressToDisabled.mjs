import { ARIA_DISABLED_ELEMS, DISABLED_ELEMS } from "./utils/constants.mjs";

/**
 * ボタンを押した後に非活性状態にする機能
 *
 * @summary 専用のクラスを持つボタン（a要素やbutton要素）を押下した後に非活性状態にする機能です。
 * @returns {void}
 */
export const btnPressToDisabled = () => {
  /**
   * 要素が非活性状態か確認する
   *
   * @param {HTMLElement} elem - 確認対象の要素
   * @returns {boolean} 非活性状態かの判定結果
   */
  const isDisabled = (elem) => {
    if (
      elem.matches(DISABLED_ELEMS) &&
      elem.disabled
    ) {
        return true;
    } else if (
      elem.matches(ARIA_DISABLED_ELEMS) &&
      elem.getAttribute('aria-disabled') === 'true'
    ) {
      return true;
    }

    return false;
  };

  /**
   * 非活性を設定
   *
   * @param {HTMLElement} elem - 対象の要素
   * @returns {HTMLElement} elem - 対象の要素
   */
  const addDisabled = (elem) => {
    if (elem.matches(DISABLED_ELEMS)) {
      elem.disabled = true;
    } else if (elem.matches(ARIA_DISABLED_ELEMS)) {
      elem.setAttribute('aria-disabled', 'true');
      elem.tabIndex = -1;
    }

    return elem;
  };


  const toDisable = () => {
    document.querySelectorAll('.js-btn-press-to-disabled').forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          if (isDisabled(e.currentTarget)) {
            e.preventDefault();
            e.stopPropagation();

            return;
          }

          addDisabled(e.currentTarget);
        });
      }
    });
  };
  toDisable();
}
