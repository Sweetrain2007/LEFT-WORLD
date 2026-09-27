(() => {
  "use strict";
  // Paths are relative to route.html. Leave blank to retain the paper placeholders.
  const ticketAssets = {
    railFront: "", // assets/location/train-ticket-01.png
    railBack: "",  // assets/location/train-ticket-02.png
    air: ""        // assets/location/boarding-pass.png
  };
  for (const [key, src] of Object.entries(ticketAssets)) {
    if (!src) continue;
    const ticket = document.querySelector('[data-ticket="' + key + '"]');
    if (!ticket) continue;
    const image = new Image();
    image.alt = "";
    image.className = "ticket-image";
    image.addEventListener("load", () => {
      ticket.append(image);
      ticket.classList.add("has-image");
    }, {once:true});
    // A missing replacement keeps the styled placeholder instead of a broken image.
    image.src = src;
  }
})();