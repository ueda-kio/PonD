export default (() => {
	const targetSelector: {
		details: '[data-disclosure="wrapper"]',
		summary: '[data-disclosure="summary"]',
		content: '[data-disclosure="content"]'
	} = {
		details: '[data-disclosure="wrapper"]',
		summary: '[data-disclosure="summary"]',
		content: '[data-disclosure="content"]'
	};

	window.addEventListener('DOMContentLoaded', () => {
		const disclosures = document.querySelectorAll(`${targetSelector.details}`);
		disclosures.forEach((disclosure) => {
			const summary = disclosure.querySelector(`${targetSelector.summary}`);
			const content = disclosure.querySelector<HTMLElement>(`${targetSelector.content}`);
			if (
				summary === null ||
				content === null
			) return;

			summary.setAttribute('aria-expanded', 'false');
			content.setAttribute('aria-hidden', 'true');

			summary.addEventListener('click', (e: MouseEvent) => {
				e.preventDefault();
				const self = e.currentTarget as HTMLElement;
				const isOpen = self.getAttribute('aria-expanded') as 'true' | 'false' | null;

				const reflow = (elm: HTMLElement) => {
					elm.clientHeight;
				};

				switch (true) {
					case (isOpen === null): {
						return;
					}
					// 閉じる処理
					case (isOpen === 'true'): {
						self.setAttribute('aria-expanded', 'false');
						self.classList.remove('is-open');
						content.setAttribute('aria-hidden', 'true');
						content.style.setProperty('height', `${content.scrollHeight}px`);
						reflow(content);
						content.style.setProperty('height', '0');
						content.classList.remove('is-open');
						content.classList.add('is-hidden');
						break;
					}
					// 開く処理
					case (isOpen === 'false'): {
						self.setAttribute('aria-expanded', 'true');
						self.classList.add('is-open');
						content.setAttribute('aria-hidden', 'false');

						const height = content.scrollHeight;
						content.style.setProperty('height', `${height}px`);
						content.classList.remove('is-hidden');

						content.classList.add('is-open');
						break;
					}
				}
			});

			content.addEventListener('transitionend', (e: TransitionEvent) => {
				const self = e.currentTarget as HTMLElement;
				if (e.propertyName === 'height') {
					self.style.removeProperty('height');
				}
			});

		});
	});
})();