/**
 * ! IEで動作しないシンタックスを利用しないこと
 * @see common\_inc\_head-script.ejs
 */
const html = document.documentElement;
export const init = () => {
  if (
    html &&
    html.nodeType === Node.ELEMENT_NODE
  ) {
    // JS有効時のセレクタとして利用するカスタムdata属性を付与
    html.dataset.scriptEnabled = 'true';

    // Trident (IE) 判定
    if ('uniqueID' in document) {
        html.dataset.browserTrident = 'true';
    }
  }

  // document.querySelectorAll('*[tabindex="-1"]').forEach((el) => {
  //   el.setAttribute('aria-disabled', 'true');
  // });
}