(() => {
  document.querySelectorAll("[data-chat-return]").forEach(link => {
    link.addEventListener("click", event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      // This one-shot flag restores only the greeting, never temporary messages.
      try { sessionStorage.setItem("left-chat-return", "1"); } catch (_) {}
    });
  });
})();
