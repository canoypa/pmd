function tooltip() {
    const tooltip = document.createElement('div'); tooltip.id = 'pmd-tooltip'; tooltip.setAttribute('aria-hidden', true);
    document.body.appendChild(tooltip);

    document.on('mouseover', '*[data-pmd-tooltip]', e => {
        const c = e.currentTarget_.getBoundingClientRect();
        tooltip.textContent = e.currentTarget_.getAttribute('data-pmd-tooltip');
        tooltip.style.top = ((c.top - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetHeight / .9 : tooltip.offsetHeight) - 8 >= 8) ? (c.top - ((tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetHeight / .9 : tooltip.offsetHeight) / .9) - 4) : (c.top + c.height + 4)) + 'px';
        tooltip.style.left = (((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2) >= 8) ? (((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2) <= document.body.offsetWidth - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetWidth / .9 : tooltip.offsetWidth) - 8) ? ((c.left + (c.width / 2)) - (tooltip.offsetWidth / 2)) : (document.body.offsetWidth - (tooltip.getAttribute('aria-hidden') === true ? tooltip.offsetWidth / .9 : tooltip.offsetWidth) - 8)) : (8)) + 'px';
        tooltip.setAttribute('aria-hidden', false);
    });
    document.on('mouseout', '*[data-pmd-tooltip]', e => {
        tooltip.setAttribute('aria-hidden', true);
    });
}

export { tooltip }
