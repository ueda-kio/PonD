import { modalManage } from "./Classes/_Modal-module";

export default (() => {
  class SwipeCloseModal {
    private modal: Element;
    private modalInner!: HTMLElement;
    private modalHeader!: Element;
    private startPosition: number = 0;

    constructor(modal: Element) {
      this.modal = modal;
    }

    setModalContent(modalInner: HTMLElement, modalHeader: Element) {
      this.modalInner = modalInner;
      this.modalHeader = modalHeader;
    }

    setStartPosition(startPosition: number) {
      this.startPosition = startPosition;
    }

    swipeModal(fingerPosition: number) {
      const movingPosition = this.startPosition - fingerPosition < 0 ? this.startPosition - fingerPosition : 0;
      this.modalInner.style.setProperty('transition', 'none');
      this.modalInner.style.transform = `translateY(${-1 * movingPosition}px)`;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('[data-modal-content]');

    modals.forEach((modal) => {
      const modalInner = modal.querySelector<HTMLElement>('[data-modal-swipe]');
      const modalHeader = modal.querySelector('[data-modal-header]');
      if (
        modalInner === null ||
        modalHeader === null
      ) return;

      const swipeCloseModal = new SwipeCloseModal(modal);
      swipeCloseModal.setModalContent(modalInner, modalHeader);

      let startPosition = 0;



      let preTime = 0;
      let nextTime = 0;
      let prePosition = 0;
      let nextPosition = 0;

      modalHeader.addEventListener('touchstart', (e: TouchEvent) => {
        startPosition = e.changedTouches[0].clientY;
      });

      modalHeader.addEventListener('touchmove', (e: TouchEvent) => {
        e.preventDefault();
        const fingerPosition = e.changedTouches[0].clientY
        const movingPosition = fingerPosition - startPosition > 0 ? fingerPosition - startPosition : 0;
        modalInner.style.setProperty('transition', 'none');
        modalInner.style.setProperty('transform', `translateY(${movingPosition}px)`);

        // ?????????timestamp????????????timestamp?????????????????????
        preTime = nextTime;
        nextTime = e.timeStamp;

        // ?????????fingerPosition????????????fingerPosition?????????????????????
        prePosition = nextPosition;
        nextPosition = fingerPosition;
      });

      modalHeader.addEventListener('touchend', (e: TouchEvent) => {
        const endPoint = e.changedTouches[0].clientY;
        const diff = endPoint - startPosition;

        modalInner.style.removeProperty('transition');
        modalInner.style.removeProperty('transform');

        const limitDistance = 200;
        if (diff > limitDistance) {
          modalManage.closeModal(`${modal.id}`);
        }

        if (
          preTime !== 0 ||
          nextTime !== 0 ||
          prePosition !== 0 ||
          nextPosition !== 0
        ) {
          // ??????????????????????????????
          const dx = nextPosition - prePosition;
          const dt = nextTime - preTime;

          // ???????????????
          console.log(dx / dt);
          const limitVelocity = 2.5;
          if (dx / dt > limitVelocity) {
            modalManage.closeModal(`${modal.id}`);
          }
        }
        preTime = 0;
        prePosition = 0;
      });
    });
  });
})();