(function () {
  const openButtons = document.querySelectorAll('[data-awg-popup-open]');
  if (!openButtons.length) return;

  const openPopup = id => {
    const popup = document.querySelector(`[data-awg-popup="${id}"]`);
    if (!popup) return;

    popup.classList.add('is-active');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePopup = popup => {
    popup.classList.remove('is-active');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Abrir
  openButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openPopup(btn.dataset.awgPopupOpen);
    });
  });

  // Cerrar
  document.addEventListener('click', e => {
    const popup = e.target.closest('.awg-popup.is-active');
    if (!popup) return;

    if (
      e.target.matches('[data-awg-popup-close]') ||
      e.target.classList.contains('awg-popup-overlay')
    ) {
      closePopup(popup);
    }
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.awg-popup.is-active')
      .forEach(closePopup);
  });
})();
