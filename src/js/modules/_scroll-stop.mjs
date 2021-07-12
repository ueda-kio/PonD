const html = document.documentElement;

const preventFunc = (e) => {
  e.preventDefault();
};

/**
 *@summary 矢印キーでのスクロールを停止
 * @param {KeyboardEvent} e
 */
const preventFuncArrow = (e) => {
  if(
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown'
  ) {
    preventFunc(e);
  }
};

/**
 * @summary html要素のdata-scroll-disabled属性がtrueの時にスクロール停止、falseでスクロール可能
 */
const toggleScrollStop = () => {
  if(!html.getAttribute('data-scroll-disabled')) {
    html.setAttribute('data-scroll-disabled', 'false');
  }

  if(html.getAttribute('data-scroll-disabled') === 'false') {
    html.setAttribute('data-scroll-disabled', 'true');
    window.addEventListener('mousewheel', preventFunc, { passive: false });
    window.addEventListener('touchmove', preventFunc, { passive: false });
    window.addEventListener('keydown', preventFuncArrow);
  } else if (html.getAttribute('data-scroll-disabled') === 'true') {
    html.setAttribute('data-scroll-disabled', 'false');
    window.removeEventListener('mousewheel', preventFunc, { passive: false });
    window.removeEventListener('touchmove', preventFunc, { passive: false });
    window.removeEventListener('keydown', preventFuncArrow);
  }
}

export { toggleScrollStop }