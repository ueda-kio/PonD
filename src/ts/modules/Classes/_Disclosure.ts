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
			const contentHeight = content.clientHeight;
			content.style.setProperty('height', '0');

			summary.addEventListener('click', (e: MouseEvent) => {
				e.preventDefault();
				const self = e.currentTarget as HTMLElement;
				const isOpen = self.getAttribute('aria-expanded') as 'true' | 'false' | null;
				switch (true) {
					case (isOpen === null): {
						return;
					}
					case (isOpen === 'true'): {
						self.setAttribute('aria-expanded', 'false');
						self.classList.remove('is-open');
						content.setAttribute('aria-hidden', 'true');
						content.style.setProperty('height', '0');
						content.classList.remove('is-open');
						break;
					}
					case (isOpen === 'false'): {
						self.setAttribute('aria-expanded', 'true');
						self.classList.add('is-open');
						content.setAttribute('aria-hidden', 'false');
						content.style.setProperty('height', `${contentHeight}px`);
						content.classList.add('is-open');
						break;
					}
				}
			})

		});
	});
})();