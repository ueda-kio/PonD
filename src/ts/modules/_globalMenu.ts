import ScrollManage from "./Classes/_scrollManage";
// import { toggleScrollStop } from "./_scroll-stop";

export const GlobalMenu = () => {
  const html = document.documentElement;
  const trigger = document.querySelector<HTMLElement>('.js-menuTrigger');
  const globalMenu = document.querySelector<HTMLElement>('.p-globalMenu');

  /**
   * @param {}
   */
  const toggleMenu = (el: HTMLElement | null = null) => {
    if(el) {
      el.classList.toggle('is-open');

      globalMenu!.classList.toggle('is-open');

      if(
        !html.getAttribute('data-scroll-disabled') ||
        html.getAttribute('data-scroll-disabled') === 'false'
      ) {
        el.setAttribute('aria-expanded', 'true');
        globalMenu!.hidden = false;
        ScrollManage.scrollLock(true);
      } else {
        el.setAttribute('aria-expanded', 'false');
        globalMenu!.hidden = true;
        ScrollManage.scrollLock(false);
      }
    }
  };

  const addEvents = () => {
    if(trigger) {
      trigger.addEventListener('click', (e: MouseEvent) => {
        toggleMenu(<HTMLElement>e.currentTarget);
      });

      trigger.addEventListener('keydown', (e: KeyboardEvent) => {
        if(e.key === 'Enter') {
          toggleMenu(<HTMLElement>e.currentTarget);
        } else {
          return false;
        }
        toggleMenu(<HTMLElement>e.currentTarget);
      });
    }

    document.querySelectorAll<HTMLAnchorElement>('.p-globalMenu__link > a').forEach((link) => {
      link.addEventListener('keydown', (e) => {
        if(
          e.key === ' ' ||
          e.key === 'Space'
        ) {
          e.preventDefault();
          location.href = `${link.href}`;
        }
      })
    })
  };

  addEvents();
};