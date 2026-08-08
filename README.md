<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-banner.png"
         alt="Browser Chat v1.1">
</p>

# Browser Chat v1.3

> A modular Browser Source chat overlay for **OBS Studio**, powered by **Streamer.bot**.

> Browser Chat displays Twitch, Kick and YouTube Chat Messages, Main Events and Community Events directly inside OBS Studio as a lightweight Browser Source.

> With **v1.3**, the multi-platform architecture has been completely reworked. Normal chat messages from Twitch, Kick and YouTube are now processed together through the Streamer.bot Action **Chat Overlay - Multi Platform**.

> Platform-specific events remain separated. YouTube Super Chat and Super Sticker are handled through a dedicated YouTube Action.

> Every supported platform uses a shared standardized JSON structure that can be processed by Browser Chat.

> The project continues to use a modular architecture. Themes, animations and future extensions can be added independently from the Browser Chat core.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-favorit-trenner.png"
         alt="Features">
</p>

# ✨ Features

## Browser Chat

- Lightweight Browser Source
- Optimized for OBS Studio
- Streamer.bot integration
- Twitch Chat support
- Kick Chat support
- YouTube Chat support
- Twitch Main Event support
- Twitch Community Event support
- YouTube Super Chat support
- YouTube Super Sticker support
- Automatic JSON processing
- Unified JSON structure
- Multi-platform architecture
- Shared processing for normal Twitch, Kick and YouTube chat messages
- Twitch Emote support
- Kick Emote support
- YouTube Emote support
- Twitch Badge support
- Kick Badge support
- YouTube Badge support
- Platform icons
- Automatic message cleanup
- Modern modular architecture

---

## Community Events

Supported Community Events

- Follow
- Subscription
- Resubscription
- Gift Subscription
- Cheer
- Raid
- Hype Train
- Poll
- Prediction
- Channel Point Redemption

---

## Theme System

Browser Chat supports modular CSS themes.

### Included Themes

- Default
- Streamer Accent Theme
- Dark
- Yellow
- Green
- Purple
- Self Create Theme

### Theme Features

- Streamer Accent Color
- Reward Accent Color
- Main Event support
- Community Event support
- Independent CSS files
- Easy customization

Every theme can be enabled, replaced or extended independently.

---

## Animation System

Browser Chat supports modular CSS animations.

### Included Animations

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

### Animation Features

- Lightweight CSS animations
- Independent animation files
- Easy customization
- Modular architecture

Animations override only the message entrance.

Fade-out remains part of the Browser Chat core.

---

## Streamer.bot

## Streamer.bot

Browser Chat currently uses four Streamer.bot Actions.

- Chat Overlay - Multi Platform
- Chat Overlay – Main Event
- Chat Overlay – Community Event
- Chat Overlay – Youtube

Normal chat messages from Twitch, Kick and YouTube are processed together through **Chat Overlay - Multi Platform**.

Platform-specific events remain separated in their own Actions:

- Twitch Main Events → Chat Overlay – Main Event
- Twitch Community Events → Chat Overlay – Community Event
- YouTube Super Chat / Super Sticker → Chat Overlay – Youtube

---

## Logging

Optional log files are available for debugging and development.

Current log modules

- YouTube
  - Super Chat
  - Super Sticker
- Main Event
  - Follow
  - Subscription
  - Resubscription
  - Gift Subscription
  - Cheer
- Community Event
  - Raid / Hype Train
  - Poll
  - Prediction
  - Channel Point Redemption

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-theme-system.png"
         alt="Theme System">
</p>

# 🎨 Theme System

Browser Chat completely separates its appearance from the Browser Chat core.

Themes only override the visual design while Browser Chat itself remains unchanged.

Every theme supports

- Streamer Accent Color
- Reward Accent Color
- Main Events
- Community Events

New themes can be created simply by adding another CSS file.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-animation-system.png"
         alt="Animation System">
</p>

# ✨ Animation System

Animations are fully separated from the Browser Chat core.

Each animation is stored inside its own CSS file and can be replaced at any time.

Included Animations

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

The default Fade animation is part of Browser Chat.

Additional animation files override only the message entrance animation.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-community-events.png"
         alt="Community Events">
</p>

# 🚀 Community Events

Community Events extend Browser Chat with Twitch event notifications.

Every event automatically creates a standardized JSON structure that is fully compatible with Browser Chat.

Every Community Event supports

- JSON output
- Optional log files
- Individual event icons
- Individual event styling
- Theme support
- Animation support

For a complete overview of all Community Events, see:

**README_COM_EVENT.md**

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-folder-strukture.png"
         alt="Folder Structure">
</p>

# 📁 Folder Structure

```text
OBS-Overlay-Chat/
│
├── overlay/
│   ├── asset/
│   │   ├── badges/
│   │   ├── events/
│   │   └── platform/
│   ├── data/
│   ├── logs/
│   ├── styles/
│   │   ├── animation/
│   │   └── themes/
│   ├── chat.js
│   ├── style.css
│   └── index.html
│
├── Streamer.bot/
│   ├── Chat Overlay - Multi Platform
│   ├── Chat Overlay - Main Event
│   ├── Chat Overlay - Community Event
│   └── Chat Overlay - Youtube
│
├── screenshots/
│
├── README.md
├── README.de.md
├── README_COM_EVENT.md
├── README_COM_EVENT.de.md
├── CHANGELOG.md
└── LICENSE
```

Browser Chat is designed as a modular multi-platform project.

Normal chat messages from Twitch, Kick and YouTube are processed together, while platform-specific events remain separated in their own Streamer.bot Actions.

Themes and animations continue to be loaded independently from the Browser Chat core.
---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-installation.png"
         alt="Installation">
</p>

# ⚙ Installation

1. Copy the Browser Chat folder to a location of your choice.
2. Add `overlay/index.html` as a Browser Source in OBS Studio.
3. Import the required Streamer.bot Actions from the `Streamer.bot` folder.
4. Connect the platforms you want to use in Streamer.bot and enable the corresponding triggers.
5. Configure the JSON output path(s) inside the C# Sub-Actions if required.
6. Select your preferred Theme and Animation in `overlay/index.html`.
7. Start streaming.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-license.png"
         alt="License">
</p>

# 📄 License

This project is released under the MIT License.

Feel free to use, modify and extend Browser Chat for your own projects.

---

<p align="center">

**Browser Chat v1.3**

Made with ❤️ for the Streamer.bot Community.

</p>