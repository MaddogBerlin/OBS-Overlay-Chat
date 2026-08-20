# Changelog

## v1.5

### New

- New `Browser Chat Settings` Windows application
- Added `OBSOverlayChat.exe` for opening the local Browser Chat Settings interface
- Added Microsoft WebView2 integration
- Added self-contained Windows x64 release build
- Browser Chat Settings can now be opened without manually opening `settings.html` in a browser
- Added application icon for Browser Chat Settings
- Added dark Windows title bar
- Added dedicated application error logging

### Browser Chat Settings Application

- Browser Chat Settings interface integrated into a native WPF application window
- Local `overlay/settings.html` loaded through WebView2
- Application uses the local release directory as its base path
- External WebView2 navigation is blocked
- Local file navigation remains available for Browser Chat Settings
- WebView2 initialization failures are handled and shown to the user
- WebView2 navigation failures are handled and shown to the user
- WebView2 process failures are handled and shown to the user
- Application resources are released when Browser Chat Settings is closed
- Multiple Browser Chat Settings instances can run simultaneously

### Application Language

- Browser Chat Settings application reads the selected Settings language from local storage
- Close confirmation supports English
- Close confirmation supports German
- Close confirmation supports Spanish
- Close confirmation supports French
- Close confirmation supports Portuguese (Brazil)
- Close confirmation supports Hindi
- English remains the fallback language
- Selected language remains available after restarting Browser Chat Settings

### Close Protection

- Added confirmation dialog when closing Browser Chat Settings
- Unsaved changes warning shown before closing
- Selecting `No` keeps Browser Chat Settings open
- Selecting `Yes` closes Browser Chat Settings
- Close confirmation uses the currently selected interface language
- Additional close requests are protected while the confirmation check is running

### Error Logging

- Added `OBSOverlayChat_ErrorLog.txt`
- Application errors are written to the local `Log` directory
- Settings file path errors are recorded
- WebView2 initialization errors are recorded
- WebView2 navigation errors are recorded
- WebView2 process errors are recorded
- Error log includes timestamp, error type and additional details
- Error log rotation added at 10 MB
- Existing error log is moved to `OBSOverlayChat_ErrorLog.old` when the size limit is reached
- Previous `.old` error log is replaced during the next rotation
- No error log is created during normal error-free operation

### Release Structure

- Added Windows x64 release structure for Browser Chat Settings
- `OBSOverlayChat.exe` is located next to the existing `overlay` directory
- Browser Chat Settings loads `overlay/settings.html` from the release directory
- Added required native WPF and WebView2 runtime files
- Added WebView2 runtime support files
- .NET runtime included through self-contained publishing
- Browser Chat Settings no longer requires a separate .NET installation for the self-contained release
- Development-only fixed local path removed from the release application
- WebView2 user data is generated locally when the application is started

### Release Testing

- Browser Chat Settings release application successfully started outside Visual Studio
- `overlay/settings.html` successfully loaded from the final release structure
- Settings tablet successfully opened
- Language switching successfully tested
- Selected language successfully restored after application restart
- Close confirmation successfully tested with `Yes` and `No`
- Multiple application instances successfully tested
- Release tested without WebView2 XML documentation files
- Release tested without Visual Studio PDB debug symbols
- Normal application operation produces no unnecessary error log

### Improvements

- Browser Chat Settings version updated to v1.5
- `settings.html` updated for Browser Chat v1.5
- `settingsBase.html` updated for Browser Chat v1.5
- Existing Browser Chat rendering foundation remains unchanged
- Existing `chat.js` Browser Chat v1.4 rendering logic remains unchanged
- Existing `style.css` Browser Chat v1.4 styling foundation remains unchanged
- Browser Chat Settings can now be distributed together with the existing local overlay
- Release application and Browser Chat web files remain separated for easier maintenance
- Project prepared for a separate local development workflow application

---

<details>
<summary><strong>v1.4</strong></summary>

### New

- New local Browser Chat Settings interface
- New `settings.html` project starter
- Three-column tablet layout for settings, navigation and preview
- Responsive power button for opening and closing the Settings tablet
- Separate settings for Twitch, Kick and YouTube
- Shared local chat width setting from 320 to 960 px
- Live Browser Chat preview
- Streamer.bot Save Settings integration
- Persistent `settings.json` configuration

### Tablet Customization

- Separate tablet button and border colors
- Color modes for separate and linked colors
- New `Djain-Schweif` tablet preset
- New `Harmony` tablet preset
- Dedicated Tablet Save function
- Separate tablet save status
- Theme-aware buttons, borders and power button effects
- `Djain-Schweif` uses a flowing violet-blue glow with two synchronized power button pulses
- `Harmony` uses a permanently split red-silver border with a soft two-color power button pulse

### Language System

- Added English
- Added German
- Added Spanish
- Added French
- Added Portuguese (Brazil)
- Added Hindi
- English used as the main fallback language
- Local language flag assets
- Selected language stored locally
- Settings interface and status messages support language switching

### Live Chat Settings

- Real Browser Chat overlay integrated into the Settings preview
- Dedicated Live Chat Settings section
- Display duration control from 10 to 45 seconds
- Default message display duration set to 18 seconds
- Browser Source information section
- Live Chat preview remains independent from animation demo previews
- Live Chat data loaded without stale browser cache
- Open tablet and active Settings section restored after browser reload
- Intentional power-button close clears the temporary interface state

### Animation Preview

- Preview support for Fade
- Preview support for Pop
- Preview support for Slide Left
- Preview support for Slide Right
- Preview support for Zoom
- Separate Self Create animation preview
- Multi-platform preview sequence using Twitch, Kick and YouTube messages
- Maximum of four preview messages displayed simultaneously
- New messages enter from the bottom while older messages move upward
- Automatic preview restart after the completed sequence
- Preview animation speed and display duration controls
- Existing Browser Chat base animations remain unchanged

### Twitch Emotes & Filters

- Improved native Twitch emote support
- Improved Twitch badge support
- BetterTTV Global and Channel emote support
- 7TV Global and Channel emote support
- FrankerFaceZ Global and Room emote support
- Twitch chat command filtering
- Configurable command prefix
- Optional list of individual commands to hide
- Hidden commands remain active inside Streamer.bot
- Bot responses to hidden commands remain visible in the overlay

### Streamer.bot & Settings Storage

- Added `Chat Overlay - Save Settings` Streamer.bot Action
- Settings interface connected to Streamer.bot through WebSocket
- C# validation for saved settings
- Added persistent `data/settings.json`
- Added configuration schema version 1
- Twitch, Kick and YouTube settings stored separately
- Themes, colors, fonts, animations, chat width and display duration validated before saving
- `data.json` remains reserved for current chat and event data
- Added dedicated `chatOverlay_saveSettingsLog.txt`
- Settings log records save status, command filter state and settings path

### Improvements

- Settings interface separated from the protected Browser Chat base
- Existing `chat.js` and `style.css` remain the protected Browser Chat foundation
- Platform themes affect only their corresponding Twitch, Kick or YouTube preview
- Tablet colors remain independent from platform chat colors
- Unsaved Settings changes are protected when closing the tablet
- Saved Settings survive browser reloads
- Animation previews remain independent from the real Live Chat
- Settings and language files standardized for future expansion

</details>

---

<details>
<summary><strong>v1.3</strong></summary>

### New

- YouTube Platform Integration
- YouTube Chat Support
- YouTube Super Chat Support
- YouTube Super Sticker Support
- YouTube Emote Support
- YouTube Badge Support
- YouTube Platform Streamer.bot Action
- Multi Platform Messenger

### Browser Chat

- Twitch, Kick and YouTube Chat Messages unified
- Platform data processing reworked
- Platform favicons provided through Streamer.bot C#
- Kick Chat normalization moved from chat.js to Streamer.bot C#
- YouTube Chat normalization moved from chat.js to Streamer.bot C#
- chat.js platform normalization simplified
- style.css extended for YouTube events
- Super Chat display support
- Super Sticker display support

### Streamer.bot

- Chat Overlay rebuilt as Chat Overlay - Multi Platform
- Twitch Message trigger integrated into Multi Platform
- Kick Message trigger integrated into Multi Platform
- YouTube Message trigger integrated into Multi Platform
- Shared C# message handler for Twitch, Kick and YouTube
- Chat Overlay - Kick Platform Action removed
- Chat Overlay - Youtube Action added for Super Chat and Super Sticker
- YouTube Message trigger removed from the separate YouTube Action
- Platform favicon URLs added to C# output
- C# JSON output structure unified for normal chat messages

### Logging

- YouTube Log Module added
- Super Chat logging added
- Super Sticker logging added
- Separate Kick Chat Log Module removed
- Multi Platform message logging handled through Streamer.bot

### Improvements

- Browser Chat message architecture completely reworked
- Reduced duplicate platform-specific processing
- Kick and YouTube normalization removed from chat.js
- Normal chat messages now use one shared Multi Platform Action
- Platform-specific events remain separated
- Updated chat.js for the new Multi Platform structure
- Updated style.css for YouTube support
- Prepared Browser Chat architecture for additional platforms
- Updated project structure for Browser Chat v1.3

</details>

---

<details>
<summary><strong>v1.2</strong></summary>

### New

- Kick Platform Integration
- Kick Chat Support
- Kick Emote Support
- Kick Badge Support
- Multi-platform Support
- Unified JSON Structure
- Kick Platform Streamer.bot Action

### Browser Chat

- Platform Support extended
- Kick Chat Messages
- Kick Emotes
- Kick Badges

### Streamer.bot

- New Chat Overlay - Kick Platform Action
- C# Sub-Action JSON path configuration

### Logging

- Kick Platform Log Module
- Community Event Logging structure updated

### Improvements

- Updated Browser Chat README
- Updated Folder Structure
- Updated Installation Guide
- Improved JSON path configuration instructions

</details>

---

<details>
<summary><strong>v1.1</strong></summary>

### New

- Community Event Module
- Raid
- Hype Train
- Poll
- Prediction
- Channel Point Redemption

### Browser Chat

- Theme System
- Streamer Accent Theme
- Dark Theme
- Yellow Theme
- Green Theme
- Purple Theme
- Self Create Theme

### Animation

- Animation System
- Fade
- Slide Left
- Slide Right
- Pop
- Zoom
- Self Create Animation

### Improvements

- Browser Chat CSS restructured
- Browser Chat HTML updated
- Browser Chat JavaScript updated
- Modular Theme support
- Modular Animation support
- Updated Browser Chat screenshot

</details>

---

<details>
<summary><strong>v1.0</strong></summary>

- First Release
- Browser Chat Overlay
- Follow
- Subscription
- Resubscription
- Gift Subscription
- Cheer
- Event Logger
- Streamer.bot Main Event

</details>