# Browser Chat v1.0

Ein modernes BrowserSource-Chat-Overlay für **Streamer.bot** und **OBS Studio**.

Browser Chat zeigt Twitch-Chatnachrichten und Twitch-Ereignisse in Echtzeit über eine moderne, übersichtliche und vollständig anpassbare BrowserSource an.

Entwickelt für Streamer, die eine leichte, verständliche und vollständig lokal arbeitende Lösung suchen.

---

# Funktionen

- 💬 Live Twitch-Chat
- 💚 Follower-Ereignisse
- ⭐ Abonnement-Ereignisse
- 🔄 Resubscription-Ereignisse
- 🎁 Geschenk-Abonnements
- 💜 Cheer (Bits)-Ereignisse
- 🎨 Individuelle Eventfarben
- 🖼 Plattform-Badges
- ⏰ Optionales Zeit-Badge
- 📄 Integrierter Event-Logger
- ⚡ Zentrale Streamer.bot Main Event Action
- 🛠 BrowserSource auf Basis von HTML, CSS und JavaScript
- 📦 Einfach anpassbar und erweiterbar

---

# Ordnerstruktur

```text
OBS-Overlay-Chat/
│
├── overlay/
├── Streamer.bot/
├── screenshots/
├── README.md
├── README.de.md
├── CHANGELOG.md
└── LICENSE
```

---

# Voraussetzungen

- OBS Studio
- Streamer.bot
- Twitch-Konto

---

# Installation

## 1. Overlay kopieren

Kopiere den Ordner **overlay** an einen beliebigen Ort auf deinem Computer.

Beispiel:

```
D:\OBS-Overlay-Chat\overlay\
```

---

## 2. Streamer.bot Actions importieren

Importiere folgende Actions in Streamer.bot:

- Chat Overlay
- Chat Overlay - Main Event

---

## 3. Pfade anpassen

Öffne die C#-Sub-Action innerhalb von **Chat Overlay - Main Event** und passe die folgenden Pfade an:

```csharp
string dataPath =
@"DEIN_PFAD\overlay\data\data.json";

string logPath =
@"DEIN_PFAD\overlay\Log\chatOverlay_Event.log";
```

---

## 4. BrowserSource in OBS hinzufügen

Erstelle in OBS Studio eine neue BrowserSource.

Als Quelle verwendest du:

```
overlay/index.html
```

Anschließend kannst du die gewünschte Breite und Höhe einstellen.

---

# Screenshots

## Chat Overlay

![Chat Overlay](screenshots/ChatOverlay.png)

---

## Follower-Ereignis

![Follow Event](screenshots/FollowOverlay_Event.png)

---

## Abonnement

![Subscription Event](screenshots/SubscriptionOverlay_Event.png)

---

## Resubscription

![Resubscription Event](screenshots/ResubscriptionOverlay_Event.png)

---

## Geschenk-Abonnement

![Gift Subscription Event](screenshots/GiftSubscriptionOverlay_Event.png)

---

## Cheer (Bits)

![Cheer Event](screenshots/CheerOverlay_Event.png)

---

# Datenschutz

Browser Chat verarbeitet alle Daten ausschließlich lokal auf deinem Computer.

- Keine Telemetrie
- Kein Tracking
- Keine externen Server
- Keine Cloud-Dienste
- Keine Erfassung persönlicher Daten

Alle erzeugten Dateien verbleiben ausschließlich auf deinem lokalen System.

---

# Lizenz

Dieses Projekt wird unter der MIT-Lizenz veröffentlicht.

Weitere Informationen findest du in der Datei **LICENSE**.

---

# Mitwirkende

Entwickelt von **MaddogBerlin**.

Browser Chat wurde als kostenloses Community-Projekt für Streamer.bot und OBS Studio entwickelt.

Wenn dir das Projekt gefällt, kannst du es gerne erweitern, verbessern oder einen eigenen Fork erstellen.

Viel Spaß beim Streamen! ❤️