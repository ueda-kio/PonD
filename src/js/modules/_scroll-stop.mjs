const preventFunc = (e) => {
  e.preventDefault();
};

const setScrollStop = () => {
  window.addEventListener('mousewheel', preventFunc, { passive: false });
  window.addEventListener('touchmove', preventFunc, { passive: false });
};

const removeScrollStop = () => {
  window.removeEventListener('mousewheel', preventFunc, { passive: false });
  window.removeEventListener('touchmove', preventFunc, { passive: false });
};

export { setScrollStop, removeScrollStop }