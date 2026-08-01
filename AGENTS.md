# OpenCode Agent Instructions

## Overview
Simple static HTML5 Canvas Snake game. No bundler, no package manager, no build steps.

## Development & Verification
- **Entry point**: `index.html` loads `style.css` and `snake.js`.
- **Server**: Run local static server to test (e.g., `python3 -m http.server 8000` or VS Code Live Server).
- **No tests**: Manual verification in browser is required.
- **Font dependencies**: External Google Fonts (`Plus Jakarta Sans`, `Space Mono`) loaded in `index.html`.

## Code Quirks
- **Grid size**: 40 cols x 16 rows. Box size is 30px (1200x480 canvas).
- **Controls**: Arrow keys and WASD.
- **State**: Game loop starts only after clicking **Start Game** and choosing a direction. Timer does not count down while snake is stationary.
- **DOM updates**: Always use `textContent` instead of `innerHTML` for performance and safety.
