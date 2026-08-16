"use strict";

window.browserChatLanguages = window.browserChatLanguages || {};

window.browserChatLanguages.de = {
  "app": {
    "title": "Lokale Browser-Chat-Einstellungen",
    "openSettings": "Einstellungen öffnen",
    "closeSettings": "Einstellungen schließen",
    "settingsAriaLabel": "Browser Chat Einstellungen"
  },
  "general": {
    "settings": "Einstellungen",
    "menuSettings": "Einstellungsmenü"
  },
  "welcome": {
    "presentation": "Browser Chat präsentiert unsere gemeinsame Arbeit",
    "title": "Lokale Browser-Chat-Einstellungen",
    "intro": "Gestalte dein Multi-Plattform-Chat-Overlay für Twitch, Kick und YouTube direkt in der Live-Vorschau.",
    "availableTitle": "Bereits verfügbar",
    "featurePlatformDesign": "Eigene Farben und Schriftarten pro Plattform",
    "featureWindowDesign": "Fenstergröße, Rundung und Darstellung anpassen",
    "featureAnimations": "Fade-, Pop-, Slide- und Zoom-Animationen auswählen",
    "featureAnimationTiming": "Animationsdauer und Geschwindigkeit einstellen",
    "featureEmotesFilters": "Twitch-Emotes und Chatfilter vorbereiten",
    "featureLocalSave": "Einstellungen lokal speichern und wieder laden",
    "hint": "Wähle im mittleren Menü einen Bereich aus, um mit der Gestaltung zu beginnen."
  },
  "menu": {
    "chatSettings": "Chat-Einstellungen der Kanäle",
    "animationSettings": "Animationseinstellungen",
    "tabletSettings": "Tablet-Einstellungen"
  },
  "tabletInfo": {
    "title": "Tablet-Design",
    "intro": "Passe hier ausschließlich das Einstellungs-Tablet an. Das Chat-Overlay bleibt unverändert.",
    "modesTitle": "Farbmodi",
    "separateText": "Getrennt: Eigene Farben für Powerknopf und Tablet-Rahmen.",
    "linkedText": "Verbunden: Eine gemeinsame Farbe für Rahmen, Powerknopf und Knopfränder.",
    "djainTrailText": "Djain-Schweif: Weich pulsierendes Violett-Blau.",
    "harmonyText": "Harmony: Geteilter Rot-Silber-Rand mit Frostknöpfen.",
    "controlsTitle": "Bedienung",
    "confirmText": "Fenster bestätigen: Aktualisiert nur die Vorschau und speichert noch nichts.",
    "saveSettingsText": "Einstellungen speichern: Speichert die Chat-Einstellungen lokal und übergibt sie an Streamer.bot.",
    "saveTabletText": "Tablet speichern: Speichert ausschließlich Farbmodus und Tablet-Design.",
    "saveHint": "Änderungen sind zunächst nur als Vorschau sichtbar. Nutze anschließend den jeweils passenden Speicherknopf, um sie dauerhaft zu übernehmen."
  },
  "channels": {
    "title": "Chat-Einstellungen der Kanäle",
    "selectPlatformAriaLabel": "Chat-Plattform auswählen",
    "selectFirst": "Bitte zuerst einen Kanal auswählen.",
    "local": "Fensterbreite",
    "twitch": "Twitch",
    "kick": "Kick",
    "youtube": "YouTube"
  },
  "window": {
    "title": "Fenster-Einstellungen",
    "maxChatWidth": "Maximale Chatbreite",
    "info": "Regelt die maximale Breite des Live Chats von 320 bis 960 px."
  },
  "theme": {
    "selection": "Themen-Auswahl",
    "standard": "Standard – eigene Farbe",
    "dark": "Dark",
    "green": "Green",
    "purple": "Purple",
    "yellow": "Yellow",
    "selfCreate": "Self Create"
  },
  "design": {
    "chatDesign": "Chat-Design",
    "backgroundColor": "Hintergrundfarbe",
    "textColor": "Textfarbe",
    "font": "Schriftart",
    "selectFont": "Schriftart auswählen",
    "resetColors": "Farben zurücksetzen",
    "resetColorsButton": "Auf Standard setzen"
  },
  "twitch": {
    "settingsAriaLabel": "Twitch Einstellungen",
    "chatTitle": "Twitch Chat",
    "emotesFilters": "Emotes & Filter",
    "emotes": {
      "title": "Emotes",
      "betterTTV": "BetterTTV aktivieren",
      "sevenTV": "7TV aktivieren",
      "frankerFaceZ": "FrankerFaceZ aktivieren"
    },
    "filters": {
      "title": "Chat-Filter",
      "hideCommands": "Chatbefehle im Overlay ausblenden",
      "commandPrefix": "Befehlspräfix",
      "specificCommands": "Bestimmte Befehle",
      "commandInfoAriaLabel": "Information zum Befehlsfilter",
      "commandInfo": "Diese Befehle werden nur im Overlay ausgeblendet. Streamer.bot führt sie weiterhin aus. Nicht eingetragene Befehle bleiben im Overlay sichtbar.",
      "disabled": "Der Befehlsfilter ist deaktiviert.",
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
    "title": "Animationseinstellungen",
    "effect": "Animation Effekt",
    "selectEffect": "Animation auswählen",
    "effects": {
      "fade": "Fade",
      "pop": "Pop",
      "slideLeft": "Slide Left",
      "slideRight": "Slide Right",
      "zoom": "Zoom"
    },
    "controlsTitle": "Animationsregler",
    "previewControlsTitle": "Vorschau-Regler",
    "previewSpeed": "Einblendgeschwindigkeit",
    "previewInfo": "Diese Regler gelten nur für das Vorschaufenster. Sie zeigen die voreingestellte Basisanimation mit unterschiedlicher Einblendgeschwindigkeit und Darstellungsdauer. Die Originalanimation wird nicht verändert oder gespeichert.",
    "speed": "Animationsgeschwindigkeit",
    "displayDuration": "Anzeigedauer",
    "fadeInDuration": "Einblenddauer",
    "fadeOutDuration": "Ausblenddauer",
    "reset": {
      "title": "Zurücksetzen",
      "enable": "Zurücksetzen freigeben",
      "button": "Animation zurücksetzen",
      "locked": "Zurücksetzen noch nicht freigegeben",
      "unlocked": "Zurücksetzen ist freigegeben",
      "completed": "Animation zurückgesetzt – noch nicht gespeichert",
      "info": "Setzt den aktuellen Animationsentwurf später auf die Standardwerte zurück."
    }
  },
  "preview": {
    "title": "Vorschau Fenster Chat",
    "twitch": {
      "username": "Alex Carter",
      "message": "Willkommen in unserem Multi-Plattform-Chat – hier laufen alle Nachrichten harmonisch zusammen."
    },
    "kick": {
      "username": "NovaRider",
      "message": "Das neue Browser-Chat-Overlay sieht großartig aus und passt wunderbar in den Stream!"
    },
    "youtube": {
      "username": "LunaStreams",
      "message": "Liebe Grüße aus dem YouTube-Chat – die gemeinsame Vorschau funktioniert wunderbar! 👋"
    }
  },
  "tablet": {
    "title": "Tablet-Einstellungen",
    "hint": "Diese Farben gelten nur für das Einstellungs-Tablet.",
    "colorMode": "Farbmodus",
    "separateColors": "Farben getrennt",
    "linkedColors": "Farben verbinden",
    "buttonColor": "Knopffarbe",
    "borderColor": "Randfarbe",
    "language": "Sprache",
    "save": "Tablet speichern"
  },
  "actions": {
    "confirmWindow": "Fenster bestätigen",
    "saveSettings": "Einstellungen speichern"
  },
  "status": {
    "title": "Status Speicherung",
    "tabletTitle": "Speicherstatus Tablet",
    "noChanges": "Keine Änderungen",
    "unsavedChanges": "Ungespeicherte Änderungen",
    "loaded": "Gespeicherte Einstellungen wurden geladen.",
    "previewUpdated": "Vorschau wurde aktualisiert.",
    "settingsSaved": "Einstellungen gespeichert – bitte Browser-Quelle neu laden.",
    "colorsResetUnsaved": "Farben zurückgesetzt – noch nicht gespeichert",
    "settingsDamaged": "Gespeicherte Einstellungen sind beschädigt.",
    "tabletUnsaved": "Tablet-Änderungen noch nicht gespeichert.",
    "tabletSaved": "Tablet-Darstellung wurde gespeichert."
  },
  "liveChat": {
    "title": "Live-Chat-Einstellungen",
    "infoIntro": "Hier stellst du Darstellung und Anzeigedauer deines Live-Chats für das OBS-Overlay ein.",
    "currentStatus": "Aktueller Stand",
    "featurePreview": "Live-Chat-Vorschau mit echten Nachrichten",
    "featureDuration": "Anzeigedauer von 10 bis 45 Sekunden einstellbar",
    "featureBrowserSource": "Browser-Source wird derzeit manuell über die index.html eingebunden",
    "transparencyHint": "Der dunkle Hintergrund dient nur der Darstellung in den Einstellungen. Im OBS-Overlay bleibt der Live-Chat transparent.",
    "settingsAriaLabel": "Live-Chat-Einstellungen",
    "emptyPreviewAriaLabel": "Leere Darstellungsfläche für den Live-Chat",
    "durationButton": "Anzeigedauer",
    "browserSourceButton": "Browser-Source",
    "durationTitle": "Live-Chat-Anzeigedauer",
    "durationLabel": "Anzeigedauer",
    "durationInfo": "Ändert später die Dauer der Live-Chat-Einblendung. Der Regler ist aktuell nur zur Darstellung sichtbar.",
    "browserSourceCopyButton": "Browser-Source kopieren",
    "browserSourceInfo": "Die automatische Kopierfunktion ist für eine zukünftige Version vorgesehen. Öffne bis dahin die index.html manuell aus dem Projektordner und kopiere anschließend die Adresse aus der Adresszeile. In OBS kannst du alternativ 'Lokale Datei' aktivieren und die index.html direkt auswählen.",
    "browserSourceCopySuccess": "Browser-Source wurde kopiert.",
    "browserSourceCopyError": "Browser-Source konnte nicht kopiert werden."
  },
  "dialog": {
    "unsavedTitle": "Ungespeicherte Änderungen",
    "discardQuestion": "Möchtest du die Änderungen verwerfen und das Tablet schließen?",
    "cancel": "Abbrechen",
    "confirm": "OK"
  }
};