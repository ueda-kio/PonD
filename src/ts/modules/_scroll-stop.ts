const html: HTMLElement = document.documentElement;
const preventFunc = (e: Event) => {
  e.preventDefault();
};
const option: Partial<AddEventListenerOptions> = {
  passive: false,
};

/**
 *@summary 矢印キーでのスクロールを停止
 * @param {KeyboardEvent} e
 */
const preventFuncArrow = (e: KeyboardEvent) => {
  if(
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown'
  ) {
    preventFunc(e);
  }
};

const toggleScrollStop = (): void => {
  if(!html.getAttribute('data-scroll-disabled')) {
    html.setAttribute('data-scroll-disabled', 'false');
  }

  if(html.getAttribute('data-scroll-disabled') === 'false') {
    html.setAttribute('data-scroll-disabled', 'true');
    console.log('stop');
    window.addEventListener('mousewheel', preventFunc, { passive: false });
    window.addEventListener('touchmove', preventFunc, { passive: false });
    window.addEventListener('keydown', preventFuncArrow);
  } else if (html.getAttribute('data-scroll-disabled') === 'true') {
    html.setAttribute('data-scroll-disabled', 'false');
    console.log('move');
    window.removeEventListener('mousewheel', preventFunc, option);
    window.removeEventListener('touchmove', preventFunc, option);
    window.removeEventListener('keydown', preventFuncArrow);
  }
}

export { toggleScrollStop }