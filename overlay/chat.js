/* ==========================================================
   Browser Chat v1.4

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

   • Rendering v1.1
        • Community Events

   • Rendering v1.2 - v1.3
        • Kick Integration
        • YouTube Integration
        • Multi-Platform Message Handling
        • Platform Icons
        • Extended Platform Data Handling

   • Rendering v1.4
        • Settings Integration
        • Live Chat Display Duration
        • Chat Command Filtering
        • Extended Overlay Configuration

   ----------------------------------------------------------

   Created by:
   MaddogBerlin

   Project:
   Browser Chat v1.4

   ========================================================== */

   
const chatContainer = document.querySelector("#chat-container");

const isSettingsPreview =
    new URLSearchParams(window.location.search)
        .has("settingsPreview");

if (isSettingsPreview) {
    document.documentElement.classList.add("settings-preview");
}

let lastMessageSignature = "";
let lastScheduledFadeTime = 0;
let messageDisplayDuration = 18000;

let overlaySettings = null;
let betterTTVGlobalEmotes = null;
const betterTTVChannelEmotes = new Map();
let sevenTVGlobalEmotes = null;
const sevenTVChannelEmotes = new Map();
let frankerFaceZGlobalEmotes = null;
const frankerFaceZChannelEmotes = new Map();

async function loadOverlaySettings() {
    try {
        const response = await fetch(`data/settings.json?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
        overlaySettings = await response.json();
        const seconds = Number(overlaySettings?.liveChat?.displayDuration);
        if (Number.isFinite(seconds)) {
            messageDisplayDuration = Math.min(45, Math.max(10, seconds)) * 1000;
        }
    } catch (error) {
        overlaySettings = null;
        console.warn("Overlay-Einstellungen konnten nicht geladen werden:", error);
    }
}

function createBetterTTVMap(emotes) {
    const result = new Map();
    if (!Array.isArray(emotes)) return result;
    emotes.forEach((emote) => {
        if (!emote?.code || !emote?.id) return;
        result.set(emote.code, {
            name: emote.code,
            imageUrl: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
            provider: "BetterTTV"
        });
    });
    return result;
}

async function fetchBetterTTVJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`BetterTTV HTTP-Fehler: ${response.status}`);
    return response.json();
}

async function getBetterTTVEmotes(channelId) {
    if (!overlaySettings?.channels?.twitch?.emotes?.betterTTV) return null;

    try {
        if (!betterTTVGlobalEmotes) {
            const globalData = await fetchBetterTTVJson(
                "https://api.betterttv.net/3/cached/emotes/global"
            );
            betterTTVGlobalEmotes = createBetterTTVMap(globalData);
        }

        const combined = new Map(betterTTVGlobalEmotes);

        if (channelId) {
            if (!betterTTVChannelEmotes.has(channelId)) {
                const channelData = await fetchBetterTTVJson(
                    `https://api.betterttv.net/3/cached/users/twitch/${encodeURIComponent(channelId)}`
                );
                betterTTVChannelEmotes.set(channelId, createBetterTTVMap([
                    ...(channelData.channelEmotes || []),
                    ...(channelData.sharedEmotes || [])
                ]));
            }

            betterTTVChannelEmotes.get(channelId).forEach((value, key) => {
                combined.set(key, value);
            });
        }

        return combined;
    } catch (error) {
        console.warn("BetterTTV-Emotes konnten nicht geladen werden:", error);
        return betterTTVGlobalEmotes || null;
    }
}


function createSevenTVMap(emotes) {
    const result = new Map();
    if (!Array.isArray(emotes)) return result;

    emotes.forEach((emote) => {
        const name = emote?.name;
        const host = emote?.data?.host;
        if (!name || !host?.url) return;

        const files = Array.isArray(host.files) ? host.files : [];
        const preferredFile =
            files.find((file) => file?.name === "2x.webp") ||
            files.find((file) => file?.name === "1x.webp") ||
            files.find((file) => file?.format === "WEBP") ||
            files[0];
        if (!preferredFile?.name) return;

        const hostUrl = host.url.startsWith("//") ? `https:${host.url}` : host.url;
        result.set(name, {
            name,
            imageUrl: `${hostUrl}/${preferredFile.name}`,
            provider: "7TV"
        });
    });
    return result;
}

async function fetchSevenTVJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`7TV HTTP-Fehler: ${response.status}`);
    return response.json();
}

async function getSevenTVEmotes(channelId) {
    if (!overlaySettings?.channels?.twitch?.emotes?.sevenTV) return null;

    try {
        if (!sevenTVGlobalEmotes) {
            const globalData = await fetchSevenTVJson("https://7tv.io/v3/emote-sets/global");
            sevenTVGlobalEmotes = createSevenTVMap(globalData?.emotes);
        }

        const combined = new Map(sevenTVGlobalEmotes);
        if (channelId) {
            if (!sevenTVChannelEmotes.has(channelId)) {
                const channelData = await fetchSevenTVJson(
                    `https://7tv.io/v3/users/twitch/${encodeURIComponent(channelId)}`
                );
                sevenTVChannelEmotes.set(
                    channelId,
                    createSevenTVMap(channelData?.emote_set?.emotes)
                );
            }
            sevenTVChannelEmotes.get(channelId).forEach((value, key) => {
                combined.set(key, value);
            });
        }
        return combined;
    } catch (error) {
        console.warn("7TV-Emotes konnten nicht geladen werden:", error);
        return sevenTVGlobalEmotes || null;
    }
}

function createFrankerFaceZMap(sets) {
    const result = new Map();
    if (!sets || typeof sets !== "object") return result;

    Object.values(sets).forEach((set) => {
        const emoticons = Array.isArray(set?.emoticons) ? set.emoticons : [];
        emoticons.forEach((emote) => {
            const name = emote?.name;
            const urls = emote?.urls;
            const rawImageUrl = urls?.["2"] || urls?.["1"] || urls?.["4"];
            if (!name || !rawImageUrl) return;

            const imageUrl = rawImageUrl.startsWith("//")
                ? `https:${rawImageUrl}`
                : rawImageUrl;
            result.set(name, {
                name,
                imageUrl,
                provider: "FrankerFaceZ"
            });
        });
    });
    return result;
}

async function fetchFrankerFaceZJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`FrankerFaceZ HTTP-Fehler: ${response.status}`);
    return response.json();
}

async function getFrankerFaceZEmotes(channelId) {
    if (!overlaySettings?.channels?.twitch?.emotes?.frankerFaceZ) return null;

    try {
        if (!frankerFaceZGlobalEmotes) {
            const globalData = await fetchFrankerFaceZJson(
                "https://api.frankerfacez.com/v1/set/global"
            );
            frankerFaceZGlobalEmotes = createFrankerFaceZMap(globalData?.sets);
        }

        const combined = new Map(frankerFaceZGlobalEmotes);
        if (channelId) {
            if (!frankerFaceZChannelEmotes.has(channelId)) {
                const channelData = await fetchFrankerFaceZJson(
                    `https://api.frankerfacez.com/v1/room/id/${encodeURIComponent(channelId)}`
                );
                frankerFaceZChannelEmotes.set(
                    channelId,
                    createFrankerFaceZMap(channelData?.sets)
                );
            }
            frankerFaceZChannelEmotes.get(channelId).forEach((value, key) => {
                combined.set(key, value);
            });
        }
        return combined;
    } catch (error) {
        console.warn("FrankerFaceZ-Emotes konnten nicht geladen werden:", error);
        return frankerFaceZGlobalEmotes || null;
    }
}
function combineThirdPartyEmotes(...emoteMaps) {
    const combined = new Map();
    emoteMaps.forEach((emoteMap) => {
        if (!(emoteMap instanceof Map)) return;
        emoteMap.forEach((value, key) => combined.set(key, value));
    });
    return combined;
}
window.addEventListener("message", (event) => {
    if (event.data?.type !== "browser-chat:set-display-duration") {
        return;
    }

    const seconds = Number(event.data.seconds);

    if (!Number.isFinite(seconds)) {
        return;
    }

    messageDisplayDuration = Math.min(45, Math.max(10, seconds)) * 1000;
});


/* ---------------------------------
   Chatdaten aus data.json laden
---------------------------------- */

async function loadChatData() {
    try {
        const response = await fetch(`data/data.json?t=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }

        const rawData = await response.json();
        const data = normalizeChatData(rawData);
        
        /*
         * Verhindert, dass dieselbe data.json
         * alle 500 ms erneut angezeigt wird.
         */
        const messageSignature = JSON.stringify(data);

        if (messageSignature === lastMessageSignature) {
            return;
        }

        lastMessageSignature = messageSignature;

        if (data.platform?.name?.toLowerCase() === "twitch") {
            const channelId = data.broadcaster?.userId || data.userId;
            const [betterTTVEmotes, sevenTVEmotes, frankerFaceZEmotes] = await Promise.all([
                getBetterTTVEmotes(channelId),
                getSevenTVEmotes(channelId),
                getFrankerFaceZEmotes(channelId)
            ]);
            data.thirdPartyEmotes = combineThirdPartyEmotes(
                betterTTVEmotes,
                sevenTVEmotes,
                frankerFaceZEmotes
            );
        } else {
            data.thirdPartyEmotes = null;
        }

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
            const badgeImageUrl =
                badge?.imageUrl ?? badge?.ImageUrl;

            const badgeName =
                badge?.name ?? badge?.Name ?? "Badge";

            if (!badgeImageUrl) {
                return;
            }

            const badgeImage = document.createElement("img");

            badgeImage.src = badgeImageUrl;
            badgeImage.alt = badgeName;
            badgeImage.title = badgeName;

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
        data.emotes,
        data.thirdPartyEmotes
    );

    /* ---------------------------------
        YouTube Super Chat
    ---------------------------------- */

    const superChatInfo = document.createElement("span");
    superChatInfo.className = "super-chat-info";

    if (
        data.eventType === "superChat" &&
        data.superChat
    ) {
        const amount =
            data.superChat.amount ?? "";

        const currency =
            data.superChat.currencyCode ?? "";

        superChatInfo.textContent =
            [amount, currency]
                .filter(Boolean)
                .join(" ");
    }   

    /* ---------------------------------
        YouTube Super Sticker
    ---------------------------------- */

    const superStickerInfo = document.createElement("span");
    superStickerInfo.className = "super-sticker-info";

    if (
        data.eventType === "superSticker" &&
        data.superSticker
    ) {
        const stickerImage = document.createElement("img");

        stickerImage.className = "super-sticker-image";
        stickerImage.src =
            data.superSticker.stickerImageUrl ?? "";

        stickerImage.alt =
            data.superSticker.stickerAltText ?? "Super Sticker";

        stickerImage.title =
            data.superSticker.stickerAltText ?? "Super Sticker";

        if (stickerImage.src) {
            superStickerInfo.appendChild(stickerImage);
        }
    }

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

    /* ---------------------------------
        YouTube Event-Ausgabe
    ---------------------------------- */

    if (
        data.eventType === "superChat" &&
        data.superChat
    ) {
        chatMessage.appendChild(superChatInfo);
    }

    if (
        data.eventType === "superSticker" &&
        data.superSticker
    ) {
        chatMessage.appendChild(superStickerInfo);
    }

    chatMessage.appendChild(message);


    /* Neue Nachricht unten einfügen */

    chatContainer.appendChild(chatMessage);


    /* Höchstens 10 Nachrichten gleichzeitig */

    while (chatContainer.children.length > 10) {
        chatContainer.firstElementChild?.remove();
    }


    /* Nach der eingestellten Mindest-Anzeigedauer ausblenden */

    /* Basis: 18 Sekunden. Einstellbar: 10 bis 45 Sekunden.
    Zwischen zwei Ausblendungen bleiben mindestens 20 Sekunden. */

    const now = Date.now();

    const normalFadeTime = now + messageDisplayDuration;

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


/* -------------------------------------
   Text und Plattform-Emotes darstellen
-------------------------------------- */

function renderMessage(
    messageElement,
    messageText,
    emotes,
    thirdPartyEmotes
) {
    messageElement.innerHTML = "";

    /*
     * Keine Plattform-Emotes vorhanden:
     * normalen Nachrichtentext anzeigen.
     */

    if (!Array.isArray(emotes) || emotes.length === 0) {
        messageElement.textContent = messageText;
        renderThirdPartyEmotes(messageElement, thirdPartyEmotes);
        return;
    }


    /*
     * Streamer.bot liefert die Emotes nicht
     * zwingend in ihrer Textreihenfolge.
     */

    const sortedEmotes = [...emotes].sort(
        (a, b) =>
            Number(a.startIndex ?? a.StartIndex) -
            Number(b.startIndex ?? b.StartIndex)
    );

    let currentIndex = 0;


    sortedEmotes.forEach((emote) => {
        const startIndex = Number(
            emote.startIndex ?? emote.StartIndex
        );

        const twitchEndIndexIsExclusive =
            emote.endIndex === undefined &&
            emote.EndIndex !== undefined;

        const rawEndIndex = Number(
            emote.endIndex ?? emote.EndIndex
        );

        const endIndex = twitchEndIndexIsExclusive
            ? rawEndIndex - 1
            : rawEndIndex;

        const imageUrl =
            emote.imageUrl ?? emote.ImageUrl;

        const emoteName =
            emote.name ?? emote.Name ?? "Emote";

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

        if (imageUrl) {
            const emoteImage = document.createElement("img");

            emoteImage.className = "emote";
            emoteImage.src = imageUrl;
            emoteImage.alt = emoteName;
            emoteImage.title = emoteName;

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
    renderThirdPartyEmotes(messageElement, thirdPartyEmotes);
}

function renderThirdPartyEmotes(messageElement, emoteMap) {
    if (!(emoteMap instanceof Map) || emoteMap.size === 0) return;

    const textNodes = [];
    const walker = document.createTreeWalker(messageElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((textNode) => {
        const parts = textNode.textContent.split(/(\s+)/);
        if (!parts.some((part) => emoteMap.has(part))) return;

        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
            const emote = emoteMap.get(part);
            if (!emote) {
                fragment.appendChild(document.createTextNode(part));
                return;
            }

            const image = document.createElement("img");
            const providerClass = String(emote.provider || "third-party")
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "");
            image.className = `emote emote--third-party emote--${providerClass}`;
            image.src = emote.imageUrl;
            image.alt = emote.name;
            image.title = `${emote.provider || "Zusatz-Emote"}: ${emote.name}`;
            fragment.appendChild(image);
        });
        textNode.replaceWith(fragment);
    });
}

    /* ---------------------------------
    Plattform-Chatdaten normalisieren
    ---------------------------------- */

function normalizeChatData(data) {

    return data;

}

/* ---------------------------------
   Start und Aktualisierung
---------------------------------- */

loadOverlaySettings().finally(loadChatData);

/* Alle 500 ms nach neuen Daten schauen */

setInterval(loadChatData, 500);
