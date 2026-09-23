# Intro: video + pixel typewriter
Only index.html and assets/intro are involved. All later pages remain unchanged.

config.js contains the two video paths, welcomeText, typingStartTime (3 seconds),
typingSpeed (90 ms/character), cursorHoldDuration (650ms), original screenBounds
and existing zoom/crossfade timings.

The idle flicker video loops forever until the real screen is clicked.
Intro plays once. At movie.currentTime >= 3, typing starts once.
The complete HTML text becomes a link to the existing home.html only after typing.
The final decoded frame remains on screen after ended; no gradient or navigation.
No Welcome image is loaded; previous unused image/media files are retained only
as source assets, not referenced by the active Intro.

Press Start 2P is bundled locally with its SIL Open Font License in
PressStart2P-OFL.txt. Source: google/fonts, ofl/pressstart2p.