const targetSelector = 'data-modal-content';
const triggerSelector = 'data-modal-trigger';
const closeBtnSelector = 'data-modal-close';

class Modal {
	private modal: HTMLElement;
	private triggerElms!: NodeListOf<HTMLElement>;
	private closeBtns!: NodeListOf<HTMLElement>
	private transitionTime: number = 500;
	private activeTrigger?: undefined | HTMLElement;

	constructor(modal: HTMLElement) {
		this.modal = modal;
	}

	setContentElms(triggerElms: NodeListOf<HTMLElement>, closeBtns: NodeListOf<HTMLElement>) {
		this.triggerElms = triggerElms;
		this.closeBtns = closeBtns;
	}

	setConfig() {
		const transitionTime = this.modal.getAttribute('data-modal-transition');
		const extractedNumber = transitionTime?.match(/[0-9]/g);

		if (
			typeof extractedNumber !== 'undefined' &&
			extractedNumber !== null
		) {
			this.transitionTime = Number(extractedNumber.join(''));
		}

		this.modal.style.setProperty('--transition-time', `${this.transitionTime}ms`);
		const isOpen = this.modal.getAttribute('aria-hidden') === 'false' ? true : false;
		this.triggerElms.forEach((trigger) => {
			trigger.setAttribute('aria-controls', `${this.modal.id}`);
			isOpen ? trigger.setAttribute('aria-expanded', 'true') : trigger.setAttribute('aria-expanded', 'false');
		});
	}

	openModal(activeTrigger?: HTMLElement | HTMLElement) {
		this.activeTrigger = activeTrigger;
		if (typeof this.activeTrigger !== 'undefined') this.activeTrigger.setAttribute('aria-expanded', 'true');
		this.modal.setAttribute('aria-hidden', 'false');
		this.modal.focus();
		document.body.classList.add('is-scrollLock');

		window.addEventListener('keydown', this.closeTypeEsc);
	}

	closeModal() {
		this.modal.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('is-scrollLock');

		if (typeof this.activeTrigger !== 'undefined') {
			this.activeTrigger.focus();
			this.activeTrigger.setAttribute('aria-expanded', 'false');
		}

		window.removeEventListener('keydown', this.closeTypeEsc);
	}

	private closeTypeEsc = (e: KeyboardEvent) => {
		if (
			e.key === 'Escape' ||
			e.key === 'Esc'
		) {
			this.closeModal();
		}
	}

	addEvent() {
		this.triggerElms.forEach((triggerElm) => {
			triggerElm.addEventListener('click', (e: MouseEvent) => {
				this.openModal(<HTMLElement>e.currentTarget);
			});

			triggerElm.addEventListener('keydown', (e: KeyboardEvent) => {
				if (
					e.key === ' ' ||
					e.key === 'Space'
				) {
					e.preventDefault();
					const activeTrigger = e.currentTarget as HTMLElement;
					this.openModal(activeTrigger);
				}
			});
		})

		this.closeBtns.forEach((closeBtn) => {
			closeBtn.addEventListener('click', () => {
				this.closeModal();
			});
			closeBtn.addEventListener('keydown', (e: KeyboardEvent) => {
				if (
					e.key === ' ' ||
					e.key === 'Space'
				) {
					e.preventDefault();
					this.closeModal();
				}
			});
		});

		const overlay = this.modal.querySelector('[data-modal-overlay]');
		if (overlay !== null) {
			overlay.addEventListener('click', () => {
				this.closeModal();
			});
		}
	}
}

// init
(() => {
	window.addEventListener('DOMContentLoaded', () => {
		const modalTargets = document.querySelectorAll<HTMLElement>(`[${targetSelector}]`);
		if (modalTargets.length === 0) return;

		modalTargets.forEach((modalTarget) => {
			const modal = new Modal(modalTarget);
			const triggerElms = document.querySelectorAll<HTMLElement>(`[${triggerSelector}="${modalTarget.id}"]`);
			const closeBtns = modalTarget.querySelectorAll<HTMLElement>(`[${closeBtnSelector}="${modalTarget.id}"]`);

			modal.setContentElms(triggerElms, closeBtns);
			modal.setConfig();
			modal.addEvent();
		});
	});
})();

const modalManage = {
	/**
	 * 特定のモーダルを開く処理
	 * @param {string} modalId 開きたいモーダルのid
	 * @returns {void}
	 */
	openModal: (modalId: string, triggerElm?: HTMLElement) => {
		const targetModal = document.getElementById(modalId);
		if (targetModal === null) return;

		new Modal(targetModal).openModal(triggerElm);
	},
	/**
	 * 特定のモーダルを閉じる処理
	 * @param {string} modalId 閉じたいモーダルのid
	 * @returns {void}
	 */
	closeModal: (modalId: string) => {
		const targetModal = document.getElementById(modalId);
		if (targetModal === null) return;

		new Modal(targetModal).closeModal();
	}
};

export { modalManage };