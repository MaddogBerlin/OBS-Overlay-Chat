<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-banner.png"
         alt="Browser Chat v1.4">
</p>

# Browser Chat v1.4

> A modular Browser Source chat overlay for **OBS Studio**, powered by **Streamer.bot**.

> Browser Chat displays Twitch, Kick and YouTube chat messages, Main Events and Community Events directly inside OBS Studio as a lightweight Browser Source.

> With **v1.4**, Browser Chat introduces its own local Settings interface for configuring and previewing the overlay.

> Settings for Twitch, Kick and YouTube, themes, animations, tablet design, Live Chat display duration and additional options can be managed directly through the Settings interface.

> Settings are processed through **Streamer.bot** and permanently stored in a dedicated `settings.json`.

> The project continues to use a modular architecture. The Browser Chat core, themes, animations, Settings and future extensions remain clearly separated from each other.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-favorit-trenner.png"
         alt="Features">
</p>

# ✨ Features

## Browser Chat

- Lightweight Browser Source overlay
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
- Twitch, Kick and YouTube Emote support
- Twitch, Kick and YouTube Badge support
- BetterTTV, 7TV and FrankerFaceZ Emote support for Twitch
- Platform icons
- Automatic message cleanup
- Adjustable chat message display duration
- Twitch chat command filter
- Dedicated local Settings interface
- Live Browser Chat preview
- Separate settings for Twitch, Kick and YouTube
- Multilingual Settings interface
- Persistent settings storage through Streamer.bot
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

Browser Chat supports modular CSS themes for the chat overlay.

### Included Chat Themes

- Default
- Streamer Accent Theme
- Dark
- Yellow
- Green
- Purple
- Self Create Theme

### Chat Theme Features

- Streamer Accent Color
- Reward Accent Color
- Main Event support
- Community Event support
- Independent CSS files
- Easy customization

### Tablet Design

The Settings interface additionally provides its own visual customization for the tablet.

- Separate Colors
- Link Colors
- Djain Trail
- Harmony

### Tablet Design Features

- Tablet border and button colors can be configured separately
- Tablet border and button colors can be linked together
- Djain Trail with a violet-blue glow and synchronized power button pulse
- Harmony with a split red-silver border and two-color power button pulse

Chat themes and tablet design work independently and can be customized separately.

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
- Dedicated animation preview in the Settings interface
- Preview support for Fade, Pop, Slide Left, Slide Right and Zoom
- Separate preview for Self Create Animation
- Adjustable preview speed
- Adjustable preview display duration

Animations override only the message entrance animation.

Fade-out remains part of the Browser Chat core.

The animation preview in the Settings interface works independently from the real Live Chat and does not modify the existing Browser Chat animations.

---

## Streamer.bot

Browser Chat currently uses five Streamer.bot Actions.

- Chat Overlay - Multi Mesaanger
- Chat Overlay – Main Event
- Chat Overlay – Community Event
- Chat Overlay – Youtube
- Chat Overlay - Save Settings

Normal chat messages from Twitch, Kick and YouTube are processed together through **Chat Overlay - Multi Mesaanger**.

Platform-specific events remain separated in their own Actions:

- Twitch Main Events → Chat Overlay – Main Event
- Twitch Community Events → Chat Overlay – Community Event
- YouTube Super Chat / Super Sticker → Chat Overlay – Youtube

The Settings interface additionally uses **Chat Overlay - Save Settings**.

This Action receives the settings sent by the Settings interface, validates the transferred values and permanently stores them in `data/settings.json`.

---

## Logging

Optional log files are available for debugging and development.

### Current Log Modules

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
- Settings
  - Saving the current settings
  - Twitch command filter status
  - Command prefix in use
  - Number of hidden commands
  - Path of the saved `settings.json`

The Settings log is written to `Log/chatOverlay_saveSettingsLog.txt` and is only updated when the settings are saved.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-theme-system.png"
         alt="Theme System">
</p>

# 🎨 Theme System

Browser Chat completely separates its appearance from the Browser Chat core.

Themes only override the visual design while Browser Chat itself remains unchanged.

### Included Themes

- Default
- Streamer Accent Theme
- Dark
- Yellow
- Green
- Purple
- Self Create Theme

### Theme Features

Every theme supports:

- Streamer Accent Color
- Reward Accent Color
- Main Events
- Community Events
- Twitch, Kick and YouTube
- Independent CSS files

New themes can be created at any time by adding another CSS file.

With **v1.4**, themes can be selected directly through the Settings interface and stored separately for Twitch, Kick and YouTube.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-animation-system.png"
         alt="Animation System">
</p>

# ✨ Animation System

Animations are fully separated from the Browser Chat core.

Each animation is stored inside its own CSS file and can be replaced at any time.

### Included Animations

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

The default Fade animation is part of Browser Chat.

Additional animation files override only the message entrance animation.

### Animation Preview

With **v1.4**, the included animations can be tested and previewed directly inside the Settings interface.

The preview supports:

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation
- Preview messages from Twitch, Kick and YouTube
- A maximum of four messages visible at the same time
- Automatic preview restart
- Adjustable preview speed
- Adjustable display duration

The animation preview works independently from the real Live Chat.

Changes made within the preview do not modify the existing Browser Chat animation files.

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
│   │   ├── languageFlags/
│   │   ├── platform/
│   │   └── sound/
│   │
│   ├── data/
│   │   ├── data.json
│   │   └── settings.json
│   │
│   ├── Log/
│   │   └── optional log files
│   │
│   ├── settings/
│   │   ├── css/
│   │   │   ├── settingsBase.css
│   │   │   ├── settingsAnimations.css
│   │   │   └── settingsLanguage.css
│   │   │
│   │   ├── js/
│   │   │   ├── settingsBase.js
│   │   │   ├── settingsAnimations.js
│   │   │   └── settingsLanguage.js
│   │   │
│   │   ├── lang/
│   │   │   ├── de.json
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   ├── fr.json
│   │   │   ├── pt-BR.json
│   │   │   └── hi.json
│   │   │
│   │   ├── BrowserOBS-Overlaybanner.png
│   │   └── settingsBase.html
│   │
│   ├── styles/
│   │   ├── animation/
│   │   ├── tablet-styleTheme/
│   │   │   ├── tablet-theme-djain-trail.css
│   │   │   └── tablet-theme-harmony.css
│   │   └── themes/
│   │
│   ├── chat.js
│   ├── index.html
│   ├── settings.html
│   └── style.css
│
├── Streamer.bot/
│   ├── Chat Overlay - Community Event
│   ├── Chat Overlay - Main Event
│   ├── Chat Overlay - Multi Mesaanger
│   ├── Chat Overlay - Save Settings
│   └── Chat Overlay - Youtube
│
├── screenshots/
│
├── README_SETTING.md
├── README_SETTING.de.md
├── README_COM_EVENT.md
├── README_COM_EVENT.de.md
├── README.md
├── README.de.md
├── CHANGELOG.md
└── LICENSE
```

Browser Chat is designed as a modular project.

The Browser Chat core remains protected, while themes, animations and the Settings interface are organized independently.

`settings.html` acts as a starter and opens the actual Settings interface located at `settings/settingsBase.html`.

`data.json` remains reserved for current chat and event data, while the persistent configuration is stored separately in `settings.json`.
---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-installation.png"
         alt="Installation">
</p>

# ⚙ Installation

1. Download or clone the project.

2. Store the `overlay` folder locally.

3. Create a new **Browser Source** in OBS Studio.

4. Select `overlay/index.html` as a local file.

5. Import the required Streamer.bot Actions:

   - Chat Overlay - Multi Mesaanger
   - Chat Overlay - Main Event
   - Chat Overlay - Community Event
   - Chat Overlay - Youtube
   - Chat Overlay - Save Settings

6. In **Chat Overlay - Save Settings**, adjust the required local paths for `settings.json` and the optional Settings log to match your own project folder.

7. Open `overlay/settings.html` in your browser to access the Browser Chat Settings interface.

8. Configure Twitch, Kick and YouTube as well as themes, animations, colors, fonts, window width and any additional options you want to use.

9. Save the configuration using **Save Settings**.

The saved configuration is stored in `overlay/data/settings.json`.

The file `overlay/data/data.json` remains reserved exclusively for current chat and event data.

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

**Browser Chat v1.4**

Made with ❤️ for the Streamer.bot Community.

</p>