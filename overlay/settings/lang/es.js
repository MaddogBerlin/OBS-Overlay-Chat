"use strict";

window.browserChatLanguages = window.browserChatLanguages || {};

window.browserChatLanguages.en = {
  "app": {
    "title": "Browser Chat Local Settings",
    "openSettings": "Open settings",
    "closeSettings": "Close settings",
    "settingsAriaLabel": "Browser Chat settings"
  },
  "general": {
    "settings": "Settings",
    "menuSettings": "Menu"
  },
  "welcome": {
    "presentation": "Browser Chat presents our shared work",
    "title": "Browser Chat Local Settings",
    "intro": "Customize your multi-platform chat overlay for Twitch, Kick and YouTube directly in the live preview.",
    "availableTitle": "Already available",
    "featurePlatformDesign": "Custom colors and fonts for each platform",
    "featureWindowDesign": "Adjust window size, rounding and appearance",
    "featureAnimations": "Choose Fade, Pop, Slide and Zoom animations",
    "featureAnimationTiming": "Adjust animation duration and speed",
    "featureEmotesFilters": "Prepare Twitch emotes and chat filters",
    "featureLocalSave": "Save and reload settings locally",
    "hint": "Choose a section from the center menu to start customizing."
  },
  "menu": {
    "chatSettings": "Channel Chat Settings",
    "animationSettings": "Animation Settings",
    "tabletSettings": "Tablet Settings"
  },
  "tabletInfo": {
    "title": "Tablet Design",
    "intro": "Customize only the settings tablet here. The chat overlay remains unchanged.",
    "modesTitle": "Color modes",
    "separateText": "Separate: Individual colors for the power button and tablet border.",
    "linkedText": "Linked: One shared color for the border, power button, and button outlines.",
    "djainTrailText": "Djain Trail: Softly pulsing violet-blue.",
    "harmonyText": "Harmony: Split red-silver border with frost buttons.",
    "controlsTitle": "Controls",
    "confirmText": "Confirm window: Updates only the preview and does not save yet.",
    "saveSettingsText": "Save settings: Saves the chat settings locally and sends them to Streamer.bot.",
    "saveTabletText": "Save tablet: Saves only the color mode and tablet design.",
    "saveHint": "Changes are initially visible only as a preview. Then use the appropriate save button to apply them permanently."
  },
  "channels": {
    "title": "Channel Chat Settings",
    "selectPlatformAriaLabel": "Select chat platform",
    "selectFirst": "Please select a channel first.",
    "local": "Window width",
    "twitch": "Twitch",
    "kick": "Kick",
    "youtube": "YouTube"
  },
  "window": {
    "title": "Window Settings",
    "maxChatWidth": "Maximum chat width",
    "info": "Controls the maximum width of the live chat from 320 to 960 px."
  },
  "theme": {
    "selection": "Theme selection",
    "standard": "Standard – custom color",
    "dark": "Dark",
    "green": "Green",
    "purple": "Purple",
    "yellow": "Yellow",
    "selfCreate": "Self Create"
  },
  "design": {
    "chatDesign": "Chat Design",
    "backgroundColor": "Background color",
    "textColor": "Text color",
    "font": "Font",
    "selectFont": "Select font",
    "resetColors": "Reset colors",
    "resetColorsButton": "Reset to default"
  },
  "twitch": {
    "settingsAriaLabel": "Twitch settings",
    "chatTitle": "Twitch Chat",
    "emotesFilters": "Emotes & Filters",
    "emotes": {
      "title": "Emotes",
      "betterTTV": "Enable BetterTTV",
      "sevenTV": "Enable 7TV",
      "frankerFaceZ": "Enable FrankerFaceZ"
    },
    "filters": {
      "title": "Chat Filter",
      "hideCommands": "Hide chat commands in the overlay",
      "commandPrefix": "Command prefix",
      "specificCommands": "Specific commands",
      "commandInfoAriaLabel": "Information about the command filter",
      "commandInfo": "These commands are hidden only in the overlay. Streamer.bot still executes them. Commands not listed here remain visible in the overlay.",
      "disabled": "The command filter is disabled.",
      "commandPlaceholder": "!discord\n!uptime\n!song"
    }
  },
  "kick": {
    "chatTitle": "Kick Chat"
  },
  "youtube": {
    "chatTitle": "YouTube Chat"
  },
  "animations": {
    "title": "Animation Settings",
    "effect": "Animation Effect",
    "selectEffect": "Select animation",
    "effects": {
      "fade": "Fade",
      "pop": "Pop",
      "slideLeft": "Slide Left",
      "slideRight": "Slide Right",
      "zoom": "Zoom"
    },
    "controlsTitle": "Animation Controls",
    "previewControlsTitle": "Preview controls",
    "previewSpeed": "Fade-in speed",
    "previewInfo": "These controls apply only to the preview window. They show the preset base animation with different fade-in speeds and display durations. The original animation is not changed or saved.",
    "speed": "Animation speed",
    "displayDuration": "Display duration",
    "fadeInDuration": "Fade-in duration",
    "fadeOutDuration": "Fade-out duration",
    "reset": {
      "title": "Reset",
      "enable": "Enable reset",
      "button": "Reset animation",
      "locked": "Reset has not been enabled",
      "unlocked": "Reset is enabled",
      "completed": "Animation reset – not saved yet",
      "info": "Resets the current animation draft to its default values."
    }
  },
  "preview": {
    "title": "Chat Preview Window",
    "twitch": {
      "username": "Alex Carter",
      "message": "Welcome to our multi-platform chat – all messages come together here in one place."
    },
    "kick": {
      "username": "NovaRider",
      "message": "The new Browser Chat overlay looks great and fits perfectly into the stream!"
    },
    "youtube": {
      "username": "LunaStreams",
      "message": "Greetings from the YouTube chat – the shared preview works wonderfully! 👋"
    }
  },
  "tablet": {
    "title": "Tablet Settings",
    "hint": "These colors apply only to the settings tablet.",
    "colorMode": "Color mode",
    "separateColors": "Separate colors",
    "linkedColors": "Link colors",
    "buttonColor": "Button color",
    "borderColor": "Border color",
    "language": "Language",
    "save": "Save Tablet"
  },
  "actions": {
    "confirmWindow": "Confirm Window",
    "saveSettings": "Save Settings"
  },
  "status": {
    "title": "Save Status",
    "tabletTitle": "Tablet Save Status",
    "noChanges": "No changes",
    "unsavedChanges": "Unsaved changes",
    "loaded": "Saved settings were loaded.",
    "previewUpdated": "Preview was updated.",
    "settingsSaved": "Settings saved – please reload the browser source.",
    "colorsResetUnsaved": "Colors reset – not saved yet",
    "settingsDamaged": "Saved settings are corrupted.",
    "tabletUnsaved": "Tablet changes have not been saved yet.",
    "tabletSaved": "Tablet appearance was saved."
  },
  "dialog": {
    "unsavedTitle": "Unsaved Changes",
    "discardQuestion": "Do you want to discard the changes and close the tablet?",
    "cancel": "Cancel",
    "confirm": "OK"
  },
  "liveChat": {
    "title": "Live Chat Settings",
    "infoIntro": "Configure the appearance and display duration of your live chat for the OBS overlay here.",
    "currentStatus": "Current status",
    "featurePreview": "Live chat preview with real messages",
    "featureDuration": "Display duration adjustable from 10 to 45 seconds",
    "featureBrowserSource": "Browser Source is currently integrated manually via index.html",
    "transparencyHint": "The dark background is used only for display in the settings. The live chat remains transparent in the OBS overlay.",
    "settingsAriaLabel": "Live chat settings",
    "emptyPreviewAriaLabel": "Empty display area for the live chat",
    "durationButton": "Display duration",
    "browserSourceButton": "Browser Source",
    "durationTitle": "Live chat display duration",
    "durationLabel": "Display duration",
    "durationInfo": "This will later change how long the live chat is displayed. The slider is currently visible for presentation only.",
    "browserSourceCopyButton": "Copy Browser Source",
    "browserSourceInfo": "The automatic copy function is planned for a future version. Until then, open index.html manually from the project folder and copy the address from the address bar. Alternatively, enable 'Local file' in OBS and select index.html directly.",
    "browserSourceCopySuccess": "Browser Source was copied.",
    "browserSourceCopyError": "Browser Source could not be copied."
  }
};