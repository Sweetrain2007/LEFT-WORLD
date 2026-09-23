# Desktop chat shell — phase one
home.html is the new desktop entry; Intro still navigates to home.html.
Semantic regions: ChatHome, ContactWindow/ContactItem, ChatWindow, ChatHeader,
ChatHistory, ProfileSidebar and ChatInput. Page-only CSS and JS, no framework.

Only LEFT exists. Selecting LEFT shows the chat. onOpenProfile() dispatches
left:open-profile with {contactId:"left",source:"avatar"}; it does not navigate.
Sharing tools and Send are disabled placeholders. The textarea sends/stores nothing.
Title-bar controls are decorative. No profile window or mobile interface is built.

Desktop uses 28% contacts / remaining conversation and a 14px window gap.
Below 960px retain horizontal scrolling, not a squeezed desktop layout.

legacy-home.html is an unchanged copy of the previous home.html, retaining
About, location routes and the player. legacy-routes.js forwards previous
home.html section anchors to this page. Plain home.html shows the chat shell.
First-message update: config.js centralizes leftAvatar and firstMessageDelay (1000ms). One incoming This is LEFT message is appended after load; duplicate initialization and BFCache returns do not send it again. New-message highlighting ends after 1200ms. No outbound sending or further conversation is implemented.