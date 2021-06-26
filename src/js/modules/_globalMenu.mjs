import { setScrollStop, removeScrollStop } from "./_scroll-stop.mjs";

export const GlobalMenu = () => {
  const html = document.documentElement;
  const trigger = document.querySelector('.js-menuTrigger');

  /**
   * @param {}
   */
  const toggleMenu = (e) => {
    e.currentTarget.classList.toggle('is-open');
    document.querySelector('.p-globalMenu').classList.toggle('is-open');

    if(html.getAttribute('data-scroll-disabled') !== 'true') {
      html.setAttribute('data-scroll-disabled', 'true');
      setScrollStop();
    }else {
      html.setAttribute('data-scroll-disabled', 'false');
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