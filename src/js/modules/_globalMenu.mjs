import { setScrollStop, removeScrollStop } from "./_scroll-stop.mjs";

export const GlobalMenu = () => {
  const html = document.documentElement;
  const trigger = document.querySelector('.js-menuTrigger');

  /**
   * @param {}
   */
  const toggleMenu = (e) => {
    e.currentTarget.classList.toggle('is-open');
    const globalMenu = document.querySelector('.p-globalMenu');

    globalMenu.classList.toggle('is-open');

    if(html.getAttribute('data-scroll-disabled') !== 'true') {
      html.setAttribute('data-scroll-disabled', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      globalMenu.hidden = false;
      setScrollStop();
    }else {
      html.setAttribute('data-scroll-disabled', 'false');
      trigger.setAttribute('aria-expanded', 'false');
      globalMenu.hidden = true;
      removeScrollStop();
    }
  };

  const addEvents = () => {
    trigger.addEventListener('click', (e) => {
      toggleMenu(e);
    });

    trigger.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        toggleMenu(e);
      } else {
        return false;
      }
      toggleMenu(e);
    });
  };

  addEvents();
};