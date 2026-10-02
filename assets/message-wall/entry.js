(() => {
  document.querySelectorAll('[data-message-wall]').forEach(button => {
    button.addEventListener('click', () => { window.location.href = 'message-wall.html'; });
  });
})();
