export const focusLoop = () => {
  const backFocusToTrigger = (e) => {
    if(e.shiftKey && e.key === 'Tab') {
      return false;
    } else if (e.key === 'Tab') {
      document.querySelector('.js-menuTrigger').focus();
      e.preventDefault();
    }
  }

  document.querySelector('.p-globalMenu__list > li:last-child').addEventListener('keydown', (e) => {
    backFocusToTrigger(e);
  });
};