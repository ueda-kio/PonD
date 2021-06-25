export const headerStyleChanger = () => {

  const toggleHeaderActive = () => {
    const scrollHeight = window.pageYOffset;
    const header = document.querySelectorAll('.p-header, .p-header--home')[0];
    const headerTop = document.querySelector('.p-header__top');

    if(scrollHeight > header.clientHeight - 40 && !headerTop.classList.contains('is-active')) {
      headerTop.classList.add('is-active');
    } else if (scrollHeight <= header.clientHeight && headerTop.classList.contains('is-active')) {
      headerTop.classList.remove('is-active');
    }
  };

  const toggleHeaderPadding = () => {
    const scrollHeight = window.pageYOffset;
    const headerTop = document.querySelector('.p-header__top');
    const menu = document.querySelector('.p-hamburgerMenu');

    if(scrollHeight !== 0 && !headerTop.classList.contains('is-moved')) {
      headerTop.classList.add('is-moved');
      menu.classList.add('is-moved');
    } else if (scrollHeight === 0 && headerTop.classList.contains('is-moved')) {
      headerTop.classList.remove('is-moved');
      menu.classList.remove('is-moved');
    }
  };

  window.addEventListener('scroll', () => {
    toggleHeaderActive();
    toggleHeaderPadding();
  });
};

