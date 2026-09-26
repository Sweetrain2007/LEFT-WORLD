# Intro video compatibility

## Sources and encoding
See codec-report.json for decoded stream metadata.
All four MP4 files currently use HEVC Main, yuv420p, with AAC-LC audio.
Original active sources: screen-flicker.mp4 (1280×720), new-intro-video.mp4 (1920×1080).
After explicit user approval, configuration now selects screen-flicker-h264.mp4 and new-intro-video-h264.mp4. Both use H.264/yuv420p, CRF 18, original dimensions and exact per-frame timestamps. Flicker has no audio; main video retains the original AAC stream. MP4 faststart enabled.
Archived sources: eyes.mp4, intro-video.mp4.
Original files remain untouched. Compatible copies were transcoded with user approval. See h264-verification.json: all original frames retained, maximum frame timestamp difference 0.0 seconds. Average-rate metadata differs slightly because the MP4 muxer assigns the terminal frame duration.
screen-fallback.webp is a lossless original frame from screen-flicker.mp4 at approximately 9.431 seconds.

## Runtime behavior
- Idle: try muted inline flicker playback. Only playing makes the video visible.
- Rejected autoplay: show the static frame and wait indefinitely for the existing screen gesture.
- Screen pointerup/click: synchronously call play on both media elements before scheduling zoom/crossfade.
- Main video has no autoplay attribute, preventing playback before the user's screen gesture. It never loops.
- Crossfade waits for playing and readyState >= 2.
- Error/rejection or 8 seconds without playback progress: freeze a decoded frame when available, otherwise retain the static screen; finish zoom and reveal the same Welcome typing entry. Never navigate automatically.
- Normal typing uses movie.currentTime >= 3; static-only mode uses a 3-second fallback delay.
- visibilitychange pauses/resumes without resetting currentTime, zoom or typing state.
- No retry button, native controls, browser-name branches, or controls-hiding pseudo-element workaround.
- Original main-video object-fit:contain is retained to avoid cropping the visual content.
- Existing fixed media viewport is clipped and follows the unchanged screenBounds/zoom geometry.

## Diagnostics
Inspect body.dataset.playbackMode:
pending / autoplay / gesture-fallback / user-gesture / static-fallback.
body.dataset.autoplayAllowed records the autoplay outcome when known.
A fulfilled play promise is handled, but visible video requires the playing event.

## Verification performed
Scripted DOM/media simulation:
- Allowed autoplay, blocked autoplay followed by successful user gesture.
- Rejected playback and indefinitely pending playback with watchdog.
- No idle auto-advance, duplicate screen activation ignored.
- Welcome starts at movie time 3, never duplicates, remains after ending.
- Background/foreground recovery.
- Original zoom geometry compared unchanged.
Fallback frame visually inspected.

## Real-environment results
Desktop Chrome: NOT TESTED.
Desktop Safari: NOT TESTED.
iPhone Safari: NOT TESTED.
iOS App WebView: NOT TESTED.
Android Chrome: NOT TESTED.
Android embedded browser: NOT TESTED.
Firefox: NOT TESTED.
Edge: NOT TESTED.
Actual modes cannot be assigned by browser name. Test the real device/application with its policy, codec support and network; record the dataset result.
