<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-head-banner.png"
         alt="Browser Chat v1.5">
</p>


# Browser Chat v1.5

> Ein modulares Browser-Source-Chat-Overlay für **OBS Studio**, entwickelt für **Streamer.bot**.

> Browser Chat stellt Twitch-, Kick- und YouTube-Chatnachrichten, Main Events und Community Events direkt als Browser-Quelle in OBS Studio dar.

> Mit **v1.5** erhält Browser Chat zusätzlich eine eigene Windows-Anwendung für die lokale Settings-Oberfläche.

> Über **Browser Chat Settings** können die Einstellungen direkt in einer eigenen Anwendung geöffnet werden, ohne `settings.html` manuell im Browser starten zu müssen.

> Einstellungen für Twitch, Kick und YouTube, Themes, Animationen, Tablet-Design, Live-Chat-Anzeigedauer und weitere Optionen können weiterhin direkt über die Settings-Oberfläche verwaltet werden.

> Die Einstellungen werden über **Streamer.bot** verarbeitet und dauerhaft in einer eigenen `settings.json` gespeichert.

> Das Projekt basiert weiterhin auf einer modularen Architektur. Browser-Chat-Kern, Themes, Animationen, Settings und die neue Windows-Anwendung bleiben klar voneinander getrennt.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-favorit-trenner.png"
         alt="Funktionen">
</p>

# ✨ Funktionen

## Browser Chat

- Leichtgewichtiges Browser-Source-Overlay
- Optimiert für OBS Studio
- Streamer.bot-Integration
- Unterstützung für Twitch-Chat
- Unterstützung für Kick-Chat
- Unterstützung für YouTube-Chat
- Unterstützung für Twitch-Main-Events
- Unterstützung für Twitch-Community-Events
- Unterstützung für YouTube Super Chat
- Unterstützung für YouTube Super Sticker
- Automatische JSON-Verarbeitung
- Einheitliche JSON-Struktur
- Multi-Plattform-Architektur
- Gemeinsame Verarbeitung normaler Twitch-, Kick- und YouTube-Chatnachrichten
- Unterstützung für Twitch-, Kick- und YouTube-Emotes
- Unterstützung für Twitch-, Kick- und YouTube-Badges
- Unterstützung für BetterTTV-, 7TV- und FrankerFaceZ-Emotes auf Twitch
- Plattform-Icons
- Automatische Nachrichtenbereinigung
- Einstellbare Anzeigedauer für Chatnachrichten
- Twitch-Chatbefehlsfilter
- Eigene lokale Settings-Oberfläche
- Eigene Windows-Anwendung für Browser Chat Settings
- Lokale Settings-Oberfläche über `OBSOverlayChat.exe`
- WebView2-Integration für die Settings-Oberfläche
- Live-Vorschau des Browser Chats
- Separate Einstellungen für Twitch, Kick und YouTube
- Mehrsprachige Settings-Oberfläche
- Mehrsprachige Schließen-Bestätigung der Windows-Anwendung
- Dauerhafte Speicherung der Einstellungen über Streamer.bot
- Moderne modulare Architektur

---

## Community Events

Unterstützte Community Events

- Follow
- Subscription
- Resubscription
- Gift Subscription
- Cheer
- Raid
- Hype Train
- Umfrage (Poll)
- Prediction
- Kanalpunkte (Channel Point Redemption)

---

## Theme-System

Browser Chat unterstützt modulare CSS-Themes für das Chat-Overlay.

### Enthaltene Chat-Themes

- Standard
- Streamer Accent Theme
- Dark
- Yellow
- Green
- Purple
- Self Create Theme

### Chat-Theme-Funktionen

- Streamer Accent Color
- Reward Accent Color
- Unterstützung für Main Events
- Unterstützung für Community Events
- Unabhängige CSS-Dateien
- Einfache Anpassung

### Tablet-Design

Die Settings-Oberfläche besitzt zusätzlich eine eigene Gestaltung für das Tablet.

- Farben getrennt
- Farben verbinden
- Djain-Schweif
- Harmony

### Tablet-Design-Funktionen

- Rand- und Knopffarbe getrennt einstellbar
- Rand- und Knopffarbe miteinander verbindbar
- Djain-Schweif mit violett-blauem Glow und synchronisiertem Powerknopf-Puls
- Harmony mit geteiltem Rot-Silber-Rand und zweifarbigem Powerknopf-Puls

Chat-Themes und Tablet-Design arbeiten unabhängig voneinander und können getrennt angepasst werden.n.

---

## Animations-System

Browser Chat unterstützt modulare CSS-Animationen.

### Enthaltene Animationen

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

### Animations-Funktionen

- Leichtgewichtige CSS-Animationen
- Unabhängige Animationsdateien
- Einfache Anpassung
- Modulare Architektur
- Eigene Animationsvorschau in den Settings
- Vorschau für Fade, Pop, Slide Left, Slide Right und Zoom
- Separate Vorschau für Self Create Animation
- Einstellbare Vorschaugeschwindigkeit
- Einstellbare Darstellungsdauer der Vorschau

Animationen überschreiben ausschließlich die Einblendanimation.

Die Ausblendanimation bleibt Bestandteil des Browser-Chat-Kerns.

Die Animationsvorschau der Settings arbeitet unabhängig vom echten Live Chat und verändert die bestehenden Browser-Chat-Animationen nicht.

---

## Streamer.bot

Browser Chat verwendet aktuell fünf Streamer.bot-Actions.

- Chat Overlay - Multi Platform
- Chat Overlay – Main Event
- Chat Overlay – Community Event
- Chat Overlay – Youtube
- Chat Overlay - Save Settings

Normale Chatnachrichten von Twitch, Kick und YouTube werden gemeinsam über **Chat Overlay - Multi Platform** verarbeitet.

Plattform-spezifische Ereignisse bleiben weiterhin in eigenen Actions getrennt:

- Twitch Main Events → Chat Overlay – Main Event
- Twitch Community Events → Chat Overlay – Community Event
- YouTube Super Chat / Super Sticker → Chat Overlay – Youtube

Die Settings-Oberfläche verwendet zusätzlich **Chat Overlay - Save Settings**.

Diese Action übernimmt die von der Settings-Oberfläche gesendeten Einstellungen, prüft die übertragenen Werte und speichert sie dauerhaft in `data/settings.json`.

---

## Logging

Optionale Log-Dateien stehen für Debugging und Entwicklung zur Verfügung.

### Aktuelle Log-Module

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
  - Speichern der aktuellen Einstellungen
  - Status des Twitch-Befehlsfilters
  - Verwendetes Befehlspräfix
  - Anzahl der ausgeblendeten Befehle
  - Zielpfad der gespeicherten `settings.json`
- Browser Chat Settings Anwendung
  - Fehler beim Laden der Settings-Datei
  - Fehler bei der WebView2-Initialisierung
  - Fehler bei der WebView2-Navigation
  - WebView2-Prozessfehler
  - Zeitstempel und Fehlerdetails

Das Settings-Log wird in `Log/chatOverlay_saveSettingsLog.txt` geschrieben und nur beim Speichern der Einstellungen ergänzt.

Die Browser Chat Settings Anwendung verwendet zusätzlich `Log/OBSOverlayChat_ErrorLog.txt`.

Das Fehlerlog wird nur bei einem auftretenden Anwendungsfehler erstellt oder ergänzt. Bei normalem fehlerfreiem Betrieb wird kein zusätzlicher Log-Eintrag erzeugt.

Das Fehlerlog ist auf maximal 10 MB begrenzt. Wird diese Größe erreicht, wird das bisherige Log als `OBSOverlayChat_ErrorLog.old` gesichert und ein neues Fehlerlog begonnen.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-theme-system.png"
         alt="Theme-System">
</p>

# 🎨 Theme-System

Browser Chat trennt das Erscheinungsbild vollständig vom Browser-Chat-Kern.

Themes überschreiben ausschließlich das Design, während Browser Chat selbst unverändert bleibt.

### Enthaltene Themes

- Standard
- Streamer Accent Theme
- Dark
- Yellow
- Green
- Purple
- Self Create Theme

### Theme-Funktionen

Jedes Theme unterstützt:

- Streamer Accent Color
- Reward Accent Color
- Main Events
- Community Events
- Twitch, Kick und YouTube
- Unabhängige CSS-Dateien

Neue Themes können jederzeit durch das Hinzufügen einer weiteren CSS-Datei erstellt werden.

Die Theme-Auswahl kann mit **v1.4** direkt über die Settings-Oberfläche vorgenommen und für Twitch, Kick und YouTube getrennt gespeichert werden.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-animation-system.png"
         alt="Animations-System">
</p>

# ✨ Animations-System

Animationen sind vollständig vom Browser-Chat-Kern getrennt.

Jede Animation befindet sich in einer eigenen CSS-Datei und kann jederzeit ausgetauscht werden.

### Enthaltene Animationen

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation

Die Standard-Fade-Animation ist Bestandteil von Browser Chat.

Zusätzliche Animationsdateien überschreiben ausschließlich die Einblendanimation.

### Animationsvorschau

Mit **v1.4** können die enthaltenen Animationen direkt in der Settings-Oberfläche getestet und betrachtet werden.

Die Vorschau unterstützt:

- Fade
- Pop
- Slide Left
- Slide Right
- Zoom
- Self Create Animation
- Vorschau mit Twitch-, Kick- und YouTube-Nachrichten
- Maximal vier gleichzeitig sichtbare Nachrichten
- Automatischer Neustart der Vorschau
- Einstellbare Vorschaugeschwindigkeit
- Einstellbare Darstellungsdauer

Die Animationsvorschau arbeitet unabhängig vom echten Live Chat.

Änderungen innerhalb der Vorschau verändern die bestehenden Animationsdateien des Browser Chats nicht.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-community-events.png"
         alt="Community Events">
</p>

# 🚀 Community Events

Community Events erweitern Browser Chat um Twitch-Ereignisse.

Jedes Event erzeugt automatisch eine standardisierte JSON-Struktur, die direkt vom Browser Chat verarbeitet werden kann.

Jedes Community Event unterstützt

- JSON-Ausgabe
- Optionale Log-Dateien
- Eigenes Event-Icon
- Individuelle Event-Darstellung
- Theme-Unterstützung
- Animations-Unterstützung

Für eine ausführliche Beschreibung aller Community Events siehe:

**README_COM_EVENT.de.md**

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-folder-strukture.png"
      alt="Ordnerstruktur">
</p>

# 📁 Ordnerstruktur

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
│   │   └── optionale Log-Dateien
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

Browser Chat wurde als modulares Projekt entwickelt.

Der Browser-Chat-Kern bleibt geschützt, während Themes, Animationen und die Settings-Oberfläche unabhängig voneinander organisiert sind.

Mit **v1.5** kann die lokale Settings-Oberfläche über `OBSOverlayChat.exe` gestartet werden. Die Anwendung lädt die vorhandene `overlay/settings.html` über WebView2.

Die `settings.html` bleibt Bestandteil des Overlays und dient weiterhin als Starter für die eigentliche Settings-Oberfläche unter `settings/settingsBase.html`.

Die für die Windows-Anwendung benötigten Runtime-Dateien befinden sich zusammen mit `OBSOverlayChat.exe` im Hauptverzeichnis des Projekts.

Beim ersten Start erstellt WebView2 automatisch einen lokalen Benutzerdatenordner für die Anwendung.

`data.json` bleibt für aktuelle Chat- und Eventdaten reserviert, während die dauerhafte Konfiguration getrennt in `settings.json` gespeichert wird.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-installation.png"
         alt="Installation">
</p>

# ⚙ Installation

> **Hinweis zur Browser Chat Settings Anwendung**
>
> `OBSOverlayChat.exe` ist aufgrund der Dateigrößenbegrenzung von GitHub nicht direkt im Git-Repository enthalten.
>
> Lade `OBSOverlayChat.exe` separat aus dem entsprechenden **GitHub Release** herunter und lege die Datei anschließend direkt in den Hauptordner `OBS-Overlay-Chat`.
>
> Danach kann `OBSOverlayChat.exe` direkt aus dem Hauptordner gestartet werden.

1. Projekt herunterladen oder klonen.

2. Den vollständigen Projektordner lokal speichern.

3. In OBS Studio eine neue **Browser-Quelle** erstellen.

4. Die Datei `overlay/index.html` als lokale Datei auswählen.

5. Die benötigten Streamer.bot-Actions importieren:

   - Chat Overlay - Multi Mesaanger
   - Chat Overlay - Main Event
   - Chat Overlay - Community Event
   - Chat Overlay - Youtube
   - Chat Overlay - Save Settings

6. In den importierten **Streamer.bot-Actions** die verwendeten lokalen Dateipfade an den eigenen Browser-Chat-Projektordner anpassen:

   - **Chat Overlay - Multi Mesaanger**
   - **Chat Overlay - Main Event**
   - **Chat Overlay - Community Event**
   - **Chat Overlay - Youtube**
   - **Chat Overlay - Save Settings**

   Dabei müssen die jeweiligen Pfade für Chat- und Eventdaten, Logs sowie `settings.json` entsprechend der eigenen lokalen Installation angepasst werden.

7. `OBSOverlayChat.exe` starten, um **Browser Chat Settings** zu öffnen.

8. Twitch, Kick und YouTube sowie Theme, Animation, Farben, Schriftart, Fensterbreite und weitere gewünschte Optionen konfigurieren.

9. Die Einstellungen über **Save Settings** speichern.

Die gespeicherte Konfiguration wird in `overlay/data/settings.json` abgelegt.

Die Datei `overlay/data/data.json` bleibt ausschließlich für aktuelle Chat- und Eventdaten reserviert.

`OBSOverlayChat.exe` und die mitgelieferten Runtime-Dateien müssen zusammen mit dem Ordner `overlay` in ihrer vorgesehenen Projektstruktur bleiben.

Beim ersten Start der Anwendung erstellt WebView2 automatisch lokale Benutzerdaten. Diese gehören nicht zum eigentlichen Browser-Chat-Projekt und müssen nicht manuell eingerichtet werden.

---

<p align="center">
    <img src="screenshots/OBS-Overlay-Chat_GitHub-license.png"
         alt="Lizenz">
</p>

# 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

Browser Chat darf frei verwendet, angepasst und erweitert werden.

---

<p align="center">

**Browser Chat v1.5**

Mit ❤️ für die Streamer.bot-Community entwickelt.

</p>