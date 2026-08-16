<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-head-banner.png"
         alt="Browser Chat v1.4 Community Events">
</p>

# Browser Chat v1.4
# Community Events

Das Community-Event-Modul erweitert Browser Chat um Twitch-Community-Events.

Neben normalen Twitch-Chatnachrichten können wichtige Community-Events direkt im Browser-Chat-Overlay dargestellt werden.

Jedes unterstützte Event erzeugt automatisch

- eine JSON-Ausgabe
- eine optionale Log-Datei
- eine Browser-Chat-Overlay-Nachricht
- eine eigene Event-Darstellung

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-beschreibung.png"
         alt="Beschreibung">
</p>

## Beschreibung

Browser Chat Community Events wurden entwickelt, um sich nahtlos in das Browser-Chat-Overlay zu integrieren.

Jedes unterstützte Twitch-Community-Event erzeugt eine standardisierte JSON-Struktur, die direkt vom Browser Chat verarbeitet werden kann.

Durch den modularen Aufbau bleibt jedes Event unabhängig, verwendet jedoch dieselbe Browser-Chat-Ausgabestruktur.

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-unterstuetzte-com-events.png"
         alt="Unterstützte Community Events">
</p>

## Unterstützte Community Events

Aktuell unterstützte Events

- 🚀 Raid
- 🚂 Hype Train
- 📊 Umfrage (Poll)
- 🎯 Prediction
- ✅ Channel Point Redemption

Alle Module verwenden dieselbe Browser-Chat-JSON-Struktur.

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-funktion.png"
         alt="Funktionen">
</p>

## Funktionen

Community Events bieten

- Eigenes C#-Modul für jedes Event
- Gemeinsame Browser-Chat-JSON-Struktur
- Optionale Log-Dateien
- Eigene Event-Icons
- Individuelle Event-Darstellung
- Unterstützung für Browser-Chat-Themes
- Unterstützung für Browser-Chat-Animationen
- Leichtgewichtige modulare Architektur

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-JSON.png"
         alt="JSON-Ausgabe">
</p>

## JSON-Ausgabe

Alle Community Events schreiben ihre Daten nach

```text
overlay/data/data.json
```

Browser Chat liest diese Datei automatisch ein und stellt das jeweilige Event direkt im Overlay dar.

Alle Community Events verwenden dieselbe JSON-Struktur und bleiben dadurch vollständig kompatibel mit Browser Chat.

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-log.png"
         alt="Log-Dateien">
</p>

## Log-Dateien

Für Debugging und Entwicklung stehen optionale Log-Dateien zur Verfügung.

Aktuelle Community-Event-Module

```text
chatOverlay_CommunityRaidHypeEvent.txt
chatOverlay_CommunityPollEvent.txt
chatOverlay_CommunityPredictionEvent.txt
chatOverlay_CommunityChannelPointEvent.txt
```

Die Log-Dateien erleichtern die Fehlersuche sowie die Entwicklung neuer Community Events.

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-screenshort.png"
         alt="Screenshots">
</p>

## Screenshots

Das Projekt enthält Screenshots aller unterstützten Community Events.

Sie zeigen

- die Event-Darstellung
- die Kompatibilität mit Themes
- die Browser-Chat-Integration
- die Darstellung im Overlay

---

<p align="center">
    <img src="screenshots/ChatOverlay-v1-1-browser-chat-integration.png"
         alt="Browser Chat Integration">
</p>

## Browser Chat Integration

Community Events sind vollständig in Browser Chat integriert.

Sie unterstützen automatisch

- Browser-Chat-Themes
- Browser-Chat-Animationen
- Streamer Accent Theme
- zukünftige Browser-Chat-Erweiterungen

Eine Anpassung am Browser Chat ist dafür nicht erforderlich.

---

## Version

**Browser Chat v1.4**

Mit ❤️ für die Streamer.bot-Community entwickelt.