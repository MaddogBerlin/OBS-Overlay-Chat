<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-banner.png"
         alt="Browser Chat v1.1">
</p>

# Browser Chat v1.1

A modular Browser Source chat overlay for **OBS Studio** powered by **Streamer.bot**.

Browser Chat displays Twitch Chat Messages, Main Events and Community Events directly inside OBS Studio as a lightweight Browser Source.

The project is built around a modular architecture. Themes, Animations and future extensions can be added independently without modifying the Browser Chat core.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-trenner.png"
         alt="Features">
</p>

# ✨ Features

## Browser Chat

- Lightweight Browser Source
- OBS Studio ready
- Streamer.bot integration
- Twitch Chat support
- Twitch Main Event support
- Twitch Community Event support
- Automatic JSON processing
- Twitch Emote support
- Twitch Badge support
- Platform icons
- Automatic Message Cleanup
- Modern Modular Architecture

---

## Theme System

Browser Chat supports modular CSS Themes.

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

Every Theme can be enabled, replaced or extended without modifying Browser Chat itself.

---

## Animation System

Browser Chat supports modular CSS Animations.

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

Fade-out remains controlled by the Browser Chat core.

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

## Streamer.bot

Browser Chat currently uses three Streamer.bot Actions.

- Chat Overlay
- Chat Overlay – Main Event
- Chat Overlay – Community Event

---

## Logging

Optional log files are available for debugging.

Current log modules include

- Main Event
- Community Raid / Hype Train
- Community Poll
- Community Prediction
- Community Channel Point Redemption

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-theme-system.png"
         alt="Theme System">
</p>

# 🎨 Theme System

Browser Chat separates its visual appearance from the Browser Chat core.

Themes only override the design while Browser Chat itself remains unchanged.

Every Theme supports

- Streamer Accent Color
- Reward Accent Color
- Main Events
- Community Events

New Themes can be created simply by adding another CSS file.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-animation-system.png"
         alt="Animation System">
</p>

# ✨ Animation System

Animations are fully separated from the Browser Chat core.

Each animation is stored inside its own CSS file and can be exchanged at any time.

Included Animations

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

The default Fade animation is part of Browser Chat.

Additional animation files override only the message entrance animation.

Fade-out remains controlled by Browser Chat.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-community-events.png"
         alt="Community Events">
</p>

# 🚀 Community Events

Community Events extend Browser Chat with Twitch Event notifications.

Every event automatically creates a standardized JSON structure compatible with Browser Chat.

Supported Events

- Raid
- Hype Train
- Poll
- Prediction
- Channel Point Redemption

Every Community Event supports

- JSON output
- Optional log file
- Individual Event icon
- Individual Event styling
- Theme support
- Animation support

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-folder-structure.png"
         alt="Folder Structure">
</p>

# 📁 Folder Structure

```text
OBS-Overlay-Chat/
│
├── overlay/
│   ├── asset/
│   ├── data/
│   ├── logs/
│   ├── styles/
│   │   ├── animation/
│   │   │   ├── animation-fade.css
│   │   │   ├── animation-pop.css
│   │   │   ├── animation-slide-left.css
│   │   │   ├── animation-slide-right.css
│   │   │   ├── animation-zoom.css
│   │   │   └── selfCreate-animation.css
│   │   │
│   │   └── themes/
│   │       ├── streamerAccentTheme.css
│   │       ├── theme-dark.css
│   │       ├── theme-yellow.css
│   │       ├── theme-green.css
│   │       ├── theme-purple.css
│   │       └── selfCreate-theme.css
│   │
│   ├── chat.js
│   ├── style.css
│   └── index.html
│
├── Streamer.bot/
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

Browser Chat is designed as a modular project.

The Browser Chat core remains unchanged while Themes and Animations are loaded independently.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-installation.png"
         alt="Installation">
</p>

# ⚙ Installation

1. Copy the Browser Chat folder.
2. Add the folder as a Browser Source inside OBS Studio.
3. Import the Streamer.bot Actions.
4. Adjust the JSON path if necessary.
5. Select your preferred Theme.
6. Select your preferred Animation.
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

**Browser Chat v1.1**

Made with ❤️ for the Streamer.bot Community.

</p>