<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-banner.png"
         alt="Browser Chat v1.5">
</p>

# Browser Chat v1.5

> A modular Browser Source chat overlay for **OBS Studio**, powered by **Streamer.bot**.

> Browser Chat displays Twitch, Kick and YouTube chat messages, Main Events and Community Events directly inside OBS Studio as a lightweight Browser Source.

> With **v1.5**, Browser Chat additionally introduces its own Windows application for the local Settings interface.

> **Browser Chat Settings** can now be opened directly inside its own application without manually opening `settings.html` in a browser.

> Settings for Twitch, Kick and YouTube, themes, animations, tablet design, Live Chat display duration and additional options can still be managed directly through the Settings interface.

> Settings are processed through **Streamer.bot** and permanently stored in a dedicated `settings.json`.

> The project continues to use a modular architecture. The Browser Chat core, themes, animations, Settings and the new Windows application remain clearly separated from each other.

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
- Dedicated Windows application for Browser Chat Settings
- Local Settings interface accessible through `OBSOverlayChat.exe`
- WebView2 integration for the Settings interface
- Live Browser Chat preview
- Separate settings for Twitch, Kick and YouTube
- Multilingual Settings interface
- Multilingual close confirmation for the Windows application
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
- Browser Chat Settings Application
  - Settings file loading errors
  - WebView2 initialization errors
  - WebView2 navigation errors
  - WebView2 process errors
  - Timestamp and error details

The Settings log is written to `Log/chatOverlay_saveSettingsLog.txt` and is only updated when the settings are saved.

The Browser Chat Settings application additionally uses `Log/OBSOverlayChat_ErrorLog.txt`.

The error log is only created or updated when an application error occurs. During normal error-free operation, no additional log entry is created.

The error log is limited to a maximum size of 10 MB. When this limit is reached, the existing log is moved to `OBSOverlayChat_ErrorLog.old` and a new error log is started.

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
├── OBSOverlayChat.exe
├── D3DCompiler_47_cor3.dll
├── PenImc_cor3.dll
├── PresentationNative_cor3.dll
├── vcruntime140_cor3.dll
├── WebView2Loader.dll
├── wpfgfx_cor3.dll
│
├── runtimes/
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

With **v1.5**, the local Settings interface can be started through `OBSOverlayChat.exe`. The application loads the existing `overlay/settings.html` through WebView2.

`settings.html` remains part of the overlay and continues to act as the starter for the actual Settings interface located at `settings/settingsBase.html`.

The runtime files required by the Windows application are located together with `OBSOverlayChat.exe` in the project's main directory.

When the application is started for the first time, WebView2 automatically creates a local user data directory.

`data.json` remains reserved for current chat and event data, while the persistent configuration is stored separately in `settings.json`.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-installation.png"
         alt="Installation">
</p>

# ⚙ Installation

> **Note about the Browser Chat Settings application**
>
> `OBSOverlayChat.exe` is not included directly in the Git repository due to GitHub's file size limit.
>
> Download `OBSOverlayChat.exe` separately from the corresponding **GitHub Release** and place the file directly inside the main `OBS-Overlay-Chat` folder.
>
> After that, `OBSOverlayChat.exe` can be started directly from the main folder.

1. Download or clone the project.

2. Store the complete project folder locally.

3. Create a new **Browser Source** in OBS Studio.

4. Select `overlay/index.html` as a local file.

5. Import the required Streamer.bot Actions:

   - Chat Overlay - Multi Mesaanger
   - Chat Overlay - Main Event
   - Chat Overlay - Community Event
   - Chat Overlay - Youtube
   - Chat Overlay - Save Settings

6. In the imported **Streamer.bot Actions**, adjust the local file paths used by the Actions to match your own Browser Chat project folder:

   - **Chat Overlay - Multi Mesaanger**
   - **Chat Overlay - Main Event**
   - **Chat Overlay - Community Event**
   - **Chat Overlay - Youtube**
   - **Chat Overlay - Save Settings**

   The respective paths for chat and event data, logs and `settings.json` must be adjusted according to your own local installation.

7. Start `OBSOverlayChat.exe` to open **Browser Chat Settings**.

8. Configure Twitch, Kick and YouTube as well as themes, animations, colors, fonts, window width and any additional options you want to use.

9. Save the configuration using **Save Settings**.

The saved configuration is stored in `overlay/data/settings.json`.

The file `overlay/data/data.json` remains reserved exclusively for current chat and event data.

`OBSOverlayChat.exe` and the included runtime files must remain together with the `overlay` folder in their intended project structure.

When the application is started for the first time, WebView2 automatically creates local user data. This data is not part of the Browser Chat project and does not need to be configured manually.

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

**Browser Chat v1.5**

Made with ❤️ for the Streamer.bot Community.

</p>