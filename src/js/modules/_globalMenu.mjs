import { toggleScrollStop } from "./_scroll-stop.mjs";

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
    toggleScrollStop()

    if(html.getAttribute('data-scroll-disabled') !== 'true') {
      trigger.setAttribute('aria-expanded', 'false');
      globalMenu.hidden = true;
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      globalMenu.hidden = false;
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

    document.querySelectorAll('.p-globalMenu__link').forEach((link) => {
      link.addEventListener('keydown', (e) => {
        if(
          e.key === ' ' ||
          e.key === 'Space'
        ) {
          e.preventDefault();
          location.href = `${link.children[0].href}`;
        }
      })
    })
  };

  addEvents();
};