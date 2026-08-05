/* ==========================================================
   Browser Chat v1.1

   chat.js

   ----------------------------------------------------------

   Core Browser Chat logic

   Responsible for

   • Loading data.json
   • Rendering v1.0
        • Chat Messages & Main Events
        • Twitch Emotes
        • Twitch Badges
        • Automatic Message Cleanup
   • Rendering v1,1
        • Community Events
   ----------------------------------------------------------

   Created by:
   MaddogBerlin

   Project:
   Browser Chat v1.1

   ========================================================== */
const chatContainer = document.querySelector("#chat-container");

let lastMessageSignature = "";
let lastScheduledFadeTime = 0;


/* ---------------------------------
   Chatdaten aus data.json laden
---------------------------------- */

async function loadChatData() {
    try {
        const response = await fetch("data/data.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }

        const data = await response.json();

        /*
         * Verhindert, dass dieselbe data.json
         * alle 500 ms erneut angezeigt wird.
         */
        const messageSignature = JSON.stringify(data);

        if (messageSignature === lastMessageSignature) {
            return;
        }

        lastMessageSignature = messageSignature;

        createChatMessage(data);

        } catch (error) {
        console.error(
            "Chatdaten konnten nicht geladen werden:",
            error
        );
    }
}


/* ---------------------------------
   Neue Chatzeile erzeugen
---------------------------------- */

function createChatMessage(data) {
    const chatMessage = document.createElement("div");
    chatMessage.className = "chat-message";

    if (data.styleClass) {
    chatMessage.classList.add(data.styleClass);
    }

    /* Streamer-Akzentfarbe als CSS-Variable
   für das aktive Theme bereitstellen. */

    chatMessage.style.setProperty(
    "--streamer-accent",
    data.color || "#9147FF"
);

chatMessage.style.setProperty(
    "--reward-accent",
    data.reward?.color || data.color || "#9147FF"
);

    /* Uhrsymbol */

    const clock = document.createElement("img");
    clock.className = "clock";
    clock.src = "asset/badges/time.png";
    clock.alt = "Uhr";


    /* Uhrzeit */

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = data.time ?? "";


    /* Plattformlogo */

    const platform = document.createElement("img");
    platform.className = "platform";
    platform.src = data.platform?.imageUrl ?? "";
    platform.alt = data.platform?.name ?? "Plattform";
    platform.title = data.platform?.name ?? "Plattform";


    /* Badges */

    const badges = document.createElement("span");
    badges.className = "badges";

    if (Array.isArray(data.badges)) {
        data.badges.forEach((badge) => {
            if (!badge?.imageUrl) {
                return;
            }

            const badgeImage = document.createElement("img");

            badgeImage.src = badge.imageUrl;
            badgeImage.alt = badge.name ?? "Badge";
            badgeImage.title = badge.name ?? "Badge";

            badges.appendChild(badgeImage);
        });
    }


    /* Benutzername */

    const username = document.createElement("span");
    username.className = "username";
    username.textContent = data.username ?? "";
    username.style.color = data.color || "#FFFFFF";


    /* Trenner */

    const separator = document.createElement("span");
    separator.className = "separator";
    separator.textContent = "»";


    /* Nachricht */

    const message = document.createElement("span");
    message.className = "message";

    renderMessage(
        message,
        data.message ?? "",
        data.emotes
    );

    // Symbol für besondere Stream-Ereignisse
    const eventIcon = document.createElement("span");
    eventIcon.className = "event-icon";
    eventIcon.textContent = data.eventIcon ?? "";

    
    /*
     * Wichtig:
     * Alle Elemente werden direkt hintereinander
     * in dieselbe Chatzeile eingefügt.
     *
     * Kein Flex-Untercontainer.
     * Kein Grid-Untercontainer.
     * Kein chat-meta.
     *
     * Dadurch verhält sich die Zeile wie normaler
     * Fließtext und kann über die gesamte Breite
     * sauber umbrechen.
     */

    chatMessage.appendChild(clock);
    chatMessage.appendChild(time);
    chatMessage.appendChild(platform);

    if (data.eventIcon) {
    chatMessage.appendChild(eventIcon);
    }

    chatMessage.appendChild(badges);
    chatMessage.appendChild(username);
    chatMessage.appendChild(separator);
    chatMessage.appendChild(message);


    /* Neue Nachricht unten einfügen */

    chatContainer.appendChild(chatMessage);


    /* Höchstens 10 Nachrichten gleichzeitig */

    while (chatContainer.children.length > 10) {
        chatContainer.firstElementChild?.remove();
    }


    /* Nach 18 Sekunden ausblenden */

    /* Nachrichten mindestens 30 Sekunden anzeigen.
    Zwischen zwei Ausblendungen liegen mindestens 15 Sekunden. */

    const now = Date.now();

    const normalFadeTime = now + 40000;

    const scheduledFadeTime = Math.max(
        normalFadeTime,
        lastScheduledFadeTime + 20000
    );

    lastScheduledFadeTime = scheduledFadeTime;

    const delayUntilFade = scheduledFadeTime - now;

    setTimeout(() => {
        chatMessage.classList.add("fade-out");

        setTimeout(() => {
            chatMessage.remove();
        }, 500);

    }, delayUntilFade);
}


/* ---------------------------------
   Text und Twitch-Emotes darstellen
---------------------------------- */

function renderMessage(
    messageElement,
    messageText,
    emotes
) {
    messageElement.innerHTML = "";

    /*
     * Keine Twitch-Emotes vorhanden:
     * normalen Nachrichtentext anzeigen.
     */

    if (!Array.isArray(emotes) || emotes.length === 0) {
        messageElement.textContent = messageText;
        return;
    }


    /*
     * Streamer.bot liefert die Emotes nicht
     * zwingend in ihrer Textreihenfolge.
     */

    const sortedEmotes = [...emotes].sort(
        (a, b) => Number(a.startIndex) - Number(b.startIndex)
    );

    let currentIndex = 0;


    sortedEmotes.forEach((emote) => {
        const startIndex = Number(emote.startIndex);
        const endIndex = Number(emote.endIndex);

        /*
         * Ungültige Positionsdaten überspringen.
         */

        if (
            !Number.isInteger(startIndex) ||
            !Number.isInteger(endIndex) ||
            startIndex < currentIndex ||
            endIndex < startIndex
        ) {
            return;
        }


        /*
         * Text vor dem Emote einfügen.
         */

        if (startIndex > currentIndex) {
            const textBeforeEmote = messageText.slice(
                currentIndex,
                startIndex
            );

            messageElement.appendChild(
                document.createTextNode(textBeforeEmote)
            );
        }


        /*
         * Originales Twitch-Emote einfügen.
         */

        if (emote.imageUrl) {
            const emoteImage = document.createElement("img");

            emoteImage.className = "emote";
            emoteImage.src = emote.imageUrl;
            emoteImage.alt = emote.name ?? "Emote";
            emoteImage.title = emote.name ?? "Emote";

            messageElement.appendChild(emoteImage);
        }


        currentIndex = endIndex + 1;
    });


    /*
     * Restlichen Text hinter dem letzten Emote
     * einfügen.
     */

    if (currentIndex < messageText.length) {
        const remainingText = messageText.slice(currentIndex);

        messageElement.appendChild(
            document.createTextNode(remainingText)
        );
    }
}


/* ---------------------------------
   Start und Aktualisierung
---------------------------------- */

loadChatData();

/* Alle 500 ms nach neuen Daten schauen */

setInterval(loadChatData, 500);