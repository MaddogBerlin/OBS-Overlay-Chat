"use strict";

/* ======================================================================
   Browser Chat v1.4
   Settings - Base System

   Datei:
   settingsBase.js

   Aufgabe:
   - Grundsteuerung der Settings-Oberfläche
   - Tablet öffnen, schließen und Zustand wiederherstellen
   - Kanal-, Theme-, Fenster- und Live-Chat-Einstellungen verwalten
   - Vorschauwerte und lokale Entwürfe verwalten
   - Einstellungen über WebSocket an Streamer.bot übergeben
   - Separate Tablet-Darstellung und Live-Chat-Vorschau steuern

   Hinweis:
   Diese Datei bildet die Basislogik der Settings-Oberfläche.
   Funktionsänderungen nur gezielt und schrittweise durchführen.
   ====================================================================== */

/* ======================================================================
   Elemente
   ====================================================================== */

const settingsApp = document.querySelector("#settingsApp");
const powerButton = document.querySelector("#powerButton");
const settingsTablet = document.querySelector("#settingsTablet");
const settingsContent = document.querySelector("#settingsContent");

const closeConfirmDialog =
  document.querySelector("#closeConfirmDialog");

const menuButtons =
  document.querySelectorAll(".menu-button");

const settingsPanels =
  document.querySelectorAll("[data-settings-panel]");

const contextPanels =
  document.querySelectorAll("[data-context-panel]");

const channelButtons =
  document.querySelectorAll(".channel-button");

const channelSettings =
  document.querySelectorAll("[data-channel-settings]");

const channelPlaceholder =
  document.querySelector("#channelPlaceholder");

const animationEffect =
  document.querySelector("#animationEffect");

const animationControls =
  document.querySelector("#animationControls");

const animationResetPanel =
  document.querySelector("#animationResetPanel");

const animationResetConfirm =
  document.querySelector("#animationResetConfirm");

const animationResetButton =
  document.querySelector("#animationResetButton");

const animationResetStatus =
  document.querySelector("#animationResetStatus");

const applyPreviewButton =
  document.querySelector("#applyPreviewButton");

const saveSettingsButton =
  document.querySelector("#saveSettingsButton");

const saveStatus =
  document.querySelector("#saveStatus");

const chatPreview =
  document.querySelector("#chatPreview");

const liveChatPreview =
  document.querySelector("#liveChatPreview");

const liveChatPreviewFrame =
  liveChatPreview?.querySelector("iframe");

const chatPreviewPanel = document.querySelector("#chatPreviewPanel");
const tabletAppearancePanel = document.querySelector("#tabletAppearancePanel");
const liveChatSettingsPanel = document.querySelector("#liveChatSettingsPanel");
const liveChatDurationButton = document.querySelector("#liveChatDurationButton");
const liveChatDurationPanel = document.querySelector("#liveChatDurationPanel");
const liveChatBrowserSourceButton = document.querySelector("#liveChatBrowserSourceButton");
const liveChatBrowserSourcePanel = document.querySelector("#liveChatBrowserSourcePanel");
const liveChatDurationPreview = document.querySelector("#liveChatDurationPreview");
const liveChatDurationOutput = document.querySelector('output[for="liveChatDurationPreview"]');

const previewMessage =
  document.querySelector(".preview-message");

const previewText =
  document.querySelector(".preview-message__text");

const welcomePanel =
  document.querySelector("#welcomePanel");

const welcomeTitle =
  welcomePanel.querySelector("h3");

const welcomeText =
  welcomePanel.querySelector("p");


/* =========================================================
   Grundeinstellungen
   ========================================================= */

const OPEN_DURATION = 700;
const CLOSE_DURATION = 520;

const STORAGE_KEY =
  "browserChatLocalSettingsDraftV1";

const STREAMERBOT_WEBSOCKET_URL =
  "ws://127.0.0.1:8080/";

const STREAMERBOT_SAVE_ACTION =
  "Chat Overlay – Save Settings";

const STREAMERBOT_REQUEST_TIMEOUT = 5000;

const SETTINGS_UI_STATE_KEY =
  "browserChatSettingsUiStateV1";

let isTransitioning = false;
let hasUnsavedChanges = false;
let activeChannel = null;


function readSettingsUiState() {
  try {
    return JSON.parse(
      sessionStorage.getItem(SETTINGS_UI_STATE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}


function updateSettingsUiState(changes) {
  const nextState = { ...readSettingsUiState() };

  Object.entries(changes).forEach(([key, value]) => {
    if (value === undefined) {
      delete nextState[key];
    } else {
      nextState[key] = value;
    }
  });

  sessionStorage.setItem(
    SETTINGS_UI_STATE_KEY,
    JSON.stringify(nextState)
  );
}


function clearSettingsUiState() {
  sessionStorage.removeItem(SETTINGS_UI_STATE_KEY);
}


/* =========================================================
   Hilfsfunktionen
   ========================================================= */

function setStatus(message, type = "info") {
  saveStatus.textContent = message;
  saveStatus.dataset.type = type;
}


function setUnsavedChanges(value) {
  hasUnsavedChanges = value;

  if (value) {
    setStatus("Ungespeicherte Änderungen");
  }
}


function hideElements(elements) {
  elements.forEach((element) => {
    element.hidden = true;
  });
}


function removeActiveState(elements) {
  elements.forEach((element) => {
    element.classList.remove("is-active");
  });
}


/* =========================================================
   Tablet öffnen und schließen
   ========================================================= */

function openTablet({ animate = true } = {}) {
  if (isTransitioning) {
    return;
  }

  settingsTablet.hidden = false;
  updateSettingsUiState({ tabletOpen: true });

  powerButton.setAttribute("aria-expanded", "true");
  powerButton.setAttribute(
    "aria-label",
    "Einstellungen schließen"
  );

  if (!animate) {
    settingsApp.dataset.state = "open";
    isTransitioning = false;
    return;
  }

  isTransitioning = true;
  settingsApp.dataset.state = "opening";

  window.setTimeout(() => {
    settingsApp.dataset.state = "open";
    isTransitioning = false;
  }, OPEN_DURATION);
}

function closeTablet({ rememberClosed = true } = {}) {
  if (isTransitioning) {
    return;
  }

  isTransitioning = true;
  settingsApp.dataset.state = "closing";

  if (rememberClosed) {
    clearSettingsUiState();
  }

  powerButton.setAttribute("aria-expanded", "false");
  powerButton.setAttribute(
    "aria-label",
    "Einstellungen öffnen"
  );

  window.setTimeout(() => {
    settingsTablet.hidden = true;
    settingsApp.dataset.state = "closed";
    isTransitioning = false;
  }, CLOSE_DURATION);
}


function requestClose() {
  if (hasUnsavedChanges) {
    closeConfirmDialog.showModal();
    return;
  }

  closeTablet();
}


powerButton.addEventListener("click", () => {
  const currentState = settingsApp.dataset.state;

  if (currentState === "closed") {
    openTablet();
    return;
  }

  if (currentState === "open") {
    requestClose();
  }
});


/* =========================================================
   Abfrage bei ungespeicherten Änderungen
   ========================================================= */

closeConfirmDialog.addEventListener("close", () => {
  if (closeConfirmDialog.returnValue !== "confirm") {
    return;
  }

  hasUnsavedChanges = false;
  loadSavedSettings();
  closeTablet();
});


window.addEventListener("beforeunload", (event) => {
  if (!hasUnsavedChanges) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});


/* =========================================================
   Linken Einstellungsbereich anzeigen
   ========================================================= */

function showSettingsPanel(panelName) {
  hideElements(settingsPanels);

  const selectedPanel = document.querySelector(
    `[data-settings-panel="${panelName}"]`
  );

  if (selectedPanel) {
    selectedPanel.hidden = false;
  }
}


/* =========================================================
   Rechten Zusatzbereich anzeigen
   ========================================================= */

function showContextPanel(panelName) {
  hideElements(contextPanels);

  const selectedPanel = document.querySelector(
    `[data-context-panel="${panelName}"]`
  );

  if (selectedPanel) {
    selectedPanel.hidden = false;
  }
}


/* =========================================================
   Starttext für rechte Menüpunkte
   ========================================================= */

function showWelcomeInformation(title, text) {
  showSettingsPanel("welcome");

  welcomeTitle.textContent = title;
  welcomeText.textContent = text;
}


/* =========================================================
   Hauptmenü
   ========================================================= */

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.menuTarget;

    updateSettingsUiState({
      activeMenu: target,
      activeLiveChatPanel: target === "live-chat" ? null : undefined
    });

    removeActiveState(menuButtons);
    button.classList.add("is-active");

    hideElements(contextPanels);
    leaveTabletAppearancePanel();
    liveChatSettingsPanel.hidden = true;
    chatPreviewPanel.hidden = false;

    switch (target) {
      case "channels":
        showSettingsPanel("channels");
        break;
      case "tablet":
        showSettingsPanel("tablet-info");
        openTabletAppearancePanel();
        break;

      case "live-chat":
        showSettingsPanel("live-chat-info");
        chatPreviewPanel.hidden = true;
        liveChatSettingsPanel.hidden = false;
        break;

      case "animations":
        hideElements(settingsPanels);
        showContextPanel("animations");
        break;

      default:
        showSettingsPanel("welcome");
        break;
    }
  });
});


/* =========================================================
   Plattform auswählen
   ========================================================= */

channelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedChannel = button.dataset.channel;

    activeChannel = selectedChannel;

    updateSettingsUiState({
      activeChannel: selectedChannel
    });

    removeActiveState(channelButtons);
    button.classList.add("is-active");

    channelPlaceholder.hidden = true;
    hideElements(channelSettings);

    const selectedSettings = document.querySelector(
      `[data-channel-settings="${selectedChannel}"]`
    );

    if (selectedSettings) {
      selectedSettings.hidden = false;
    }

    applyPreview();
  });
});


/* =========================================================
   Animationsregler erst nach Auswahl anzeigen
   ========================================================= */

const animationDefaultInputs = [
  "animationSpeed",
  "displayDuration",
  "fadeInDuration",
  "fadeOutDuration"
].map((id) => document.querySelector(`#${id}`));

function lockAnimationReset() {
  animationResetConfirm.checked = false;
  animationResetButton.disabled = true;
  animationResetStatus.textContent =
    "Zurücksetzen noch nicht freigegeben";
}

animationResetConfirm.addEventListener("change", () => {
  animationResetButton.disabled = !animationResetConfirm.checked;
  animationResetStatus.textContent = animationResetConfirm.checked
    ? "Zurücksetzen ist freigegeben"
    : "Zurücksetzen noch nicht freigegeben";
});

animationResetButton.addEventListener("click", () => {
  if (!animationResetConfirm.checked || animationEffect.value !== "self-create") {
    return;
  }

  animationDefaultInputs.forEach((input) => {
    input.value = input.defaultValue;
  });

  applyPreview();
  setUnsavedChanges(true);
  animationResetStatus.textContent =
    "Animation zurückgesetzt – noch nicht gespeichert";
  animationResetConfirm.checked = false;
  animationResetButton.disabled = true;
});

animationEffect.addEventListener("change", () => {
  animationControls.hidden =
    animationEffect.value === "";

  animationResetPanel.hidden =
    animationEffect.value !== "self-create";

  lockAnimationReset();

  setUnsavedChanges(true);
});


/* =========================================================
   Formularwerte sammeln
   ========================================================= */

function getInputValue(id) {
  const input = document.querySelector(`#${id}`);

  return input ? input.value : "";
}


function collectSettings() {
  return {

    channels: {
      twitch: {
        theme:
          getInputValue("twitchTheme"),

        backgroundColor:
          getInputValue("twitchBackgroundColor"),

        textColor:
          getInputValue("twitchTextColor"),

        font:
          getInputValue("twitchFont")
      },

      kick: {
        theme:
          getInputValue("kickTheme"),

        backgroundColor:
          getInputValue("kickBackgroundColor"),

        textColor:
          getInputValue("kickTextColor"),

        font:
          getInputValue("kickFont")
      },

      youtube: {
        theme:
          getInputValue("youtubeTheme"),

        backgroundColor:
          getInputValue("youtubeBackgroundColor"),

        textColor:
          getInputValue("youtubeTextColor"),

        font:
          getInputValue("youtubeFont")
      }
    },

    animation: {
      effect:
        getInputValue("animationEffect") || "base",

      speed:
        getInputValue("animationSpeed"),

      displayDuration:
        getInputValue("displayDuration"),

      fadeInDuration:
        getInputValue("fadeInDuration"),

      fadeOutDuration:
        getInputValue("fadeOutDuration")
    },

    window: {
      width:
        getInputValue("windowWidth")
    }
  };
}


/* =========================================================
   Vorschau aktualisieren
   ========================================================= */

function applyPreview() {
  const settings = collectSettings();

  const themeStyles = {
    dark: { background: "rgba(18, 18, 18, 0.42)", color: "#b5b5b5" },
    green: { background: "rgba(60, 170, 90, 0.20)", color: "#eaeaea" },
    purple: { background: "rgba(145, 71, 255, 0.20)", color: "#eaeaea" },
    yellow: { background: "rgba(255, 221, 87, 0.22)", color: "#1a1a1a" },
    "self-create": { background: "rgba(40, 40, 40, 0.25)", color: "#f2f2f2" }
  };

  ["twitch", "kick", "youtube"].forEach((channelName) => {
    const channel = settings.channels[channelName];
    const message = document.querySelector(`.preview-message--${channelName}`);
    if (!channel || !message) return;

    const selectedTheme = channel.theme || "standard";
    const theme = themeStyles[selectedTheme];
    const messageText = message.querySelector(".preview-message__text");

    message.style.background = theme ? theme.background : channel.backgroundColor;
    message.style.color = channel.textColor || theme?.color || "#ffffff";
    message.style.fontFamily = channel.font || "inherit";
    if (messageText) messageText.style.color = channel.textColor || theme?.color || "#ffffff";
  });

  const width = Number(settings.window.width);
  if (width > 0) chatPreview.style.maxWidth = `${Math.min(width, 960)}px`;

  
}

/* Änderungen sofort in der Vorschau anzeigen */

document
  .querySelectorAll("input, select")
  .forEach((input) => {
    if (input.closest("#tabletAppearancePanel, #animationResetPanel")) return;

    input.addEventListener("input", () => {
      applyPreview();
      setUnsavedChanges(true);
    });

    input.addEventListener("change", () => {
      applyPreview();
      setUnsavedChanges(true);
    });
  });


applyPreviewButton.addEventListener("click", () => {
  applyPreview();
  setStatus("Vorschau wurde aktualisiert.");
});


/* =========================================================
   Vorläufig lokal speichern
   ========================================================= */

function runStreamerBotAction(actionName, args = {}) {
  return new Promise((resolve, reject) => {
    const requestId =
      `browser-chat-save-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const socket = new WebSocket(STREAMERBOT_WEBSOCKET_URL);

    const timeout = window.setTimeout(() => {
      socket.close();
      reject(new Error("Streamer.bot antwortet nicht."));
    }, STREAMERBOT_REQUEST_TIMEOUT);

    const finish = (callback, value) => {
      window.clearTimeout(timeout);
      socket.close();
      callback(value);
    };

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({
        request: "DoAction",
        action: {
          name: actionName
        },
        args,
        id: requestId
      }));
    });

    socket.addEventListener("message", (event) => {
      let response;

      try {
        response = JSON.parse(event.data);
      } catch {
        return;
      }

      if (response.id !== requestId) {
        return;
      }

      if (response.status === "ok") {
        finish(resolve, response);
        return;
      }

      finish(
        reject,
        new Error(response.error || "Streamer.bot hat das Speichern abgelehnt.")
      );
    });

    socket.addEventListener("error", () => {
      finish(
        reject,
        new Error("Keine Verbindung zu Streamer.bot möglich.")
      );
    });
  });
}


async function saveSettings() {
  const settings = collectSettings();

  settings.liveChat = {
    displayDuration:
      Number(liveChatDurationPreview?.value) || 18
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );

  saveSettingsButton.disabled = true;
  setStatus("Einstellungen werden gespeichert …");

  try {
    await runStreamerBotAction(
      STREAMERBOT_SAVE_ACTION,
      {
        settingsJson: JSON.stringify(settings)
      }
    );

    hasUnsavedChanges = false;

    setStatus(
      "Einstellungen gespeichert – bitte Browser-Quelle neu laden.",
      "success"
    );
  } catch (error) {
    hasUnsavedChanges = true;

    setStatus(
      `Nur lokal gespeichert – ${error.message}`,
      "error"
    );
  } finally {
    saveSettingsButton.disabled = false;
  }
}
saveSettingsButton.addEventListener(
  "click",
  saveSettings
);


/* =========================================================
   Gespeicherte Werte laden
   ========================================================= */

function setInputValue(id, value) {
  const input = document.querySelector(`#${id}`);

  if (!input || value === undefined) {
    return;
  }

  input.value = value;
}


function loadSavedSettings() {
  const savedData =
    localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    applyPreview();
    return;
  }

  try {
    const settings = JSON.parse(savedData);

    const channelNames = [
      "twitch",
      "kick",
      "youtube"
    ];

    channelNames.forEach((channelName) => {
      const channel =
        settings.channels?.[channelName];

      if (!channel) {
        return;
      }

      setInputValue(
        `${channelName}Theme`,
        channel.theme || "standard"
      );

      setInputValue(
        `${channelName}BackgroundColor`,
        channel.backgroundColor
      );

      setInputValue(
        `${channelName}TextColor`,
        channel.textColor
      );

      setInputValue(
        `${channelName}Font`,
        channel.font
      );
    });

    setInputValue(
      "animationEffect",
      settings.animation?.effect === "base"
        ? ""
        : settings.animation?.effect
    );

    setInputValue(
      "animationSpeed",
      settings.animation?.speed
    );

    setInputValue(
      "displayDuration",
      settings.animation?.displayDuration
    );

    setInputValue(
      "fadeInDuration",
      settings.animation?.fadeInDuration
    );

    setInputValue(
      "fadeOutDuration",
      settings.animation?.fadeOutDuration
    );

    setInputValue(
      "windowWidth",
      settings.window?.width
    );

      animationControls.hidden =
      animationEffect.value === "";

    animationResetPanel.hidden =
      animationEffect.value !== "self-create";

    lockAnimationReset();

    applyPreview();
    hasUnsavedChanges = false;

    setStatus(
      "Gespeicherte Einstellungen wurden geladen.",
      "success"
    );
  } catch (error) {
    console.error(
      "Gespeicherte Einstellungen konnten nicht geladen werden:",
      error
    );

    setStatus(
      "Gespeicherte Einstellungen sind beschädigt.",
      "error"
    );
  }
}


/* =========================================================
   Start
   ========================================================= */

loadSavedSettings();

/* =========================================================
   Twitch: Chat-Design / Emotes & Filter
   ========================================================= */

const twitchSubButtons =
  document.querySelectorAll(".channel-subbutton");

const twitchContents =
  document.querySelectorAll("[data-twitch-content]");

const hideChatCommands =
  document.querySelector("#hideChatCommands");

const commandFilterOptions =
  document.querySelector("#commandFilterOptions");

const commandPrefix =
  document.querySelector("#commandPrefix");

const hiddenCommands =
  document.querySelector("#hiddenCommands");

const commandInfoButton =
  document.querySelector("#commandInfoButton");

const commandFilterInfo =
  document.querySelector("#commandFilterInfo");

const commandFilterSummary =
  document.querySelector("#commandFilterSummary");


function showTwitchPanel(panelName) {
  hideElements(twitchContents);
  removeActiveState(twitchSubButtons);

  const selectedContent = document.querySelector(
    `[data-twitch-content="${panelName}"]`
  );

  const selectedButton = document.querySelector(
    `[data-twitch-panel="${panelName}"]`
  );

  if (selectedContent) {
    selectedContent.hidden = false;
  }

  if (selectedButton) {
    selectedButton.classList.add("is-active");
  }
}


function getCommandList() {
  return hiddenCommands.value
    .split(/\r?\n|,/)
    .map((command) => command.trim())
    .filter(Boolean);
}


function updateCommandFilter() {
  const isEnabled = hideChatCommands.checked;
  const commands = getCommandList();
  const prefix = commandPrefix.value.trim() || "!";

  commandFilterOptions.hidden = !isEnabled;

  if (!isEnabled) {
    commandFilterSummary.textContent =
      "Der Befehlsfilter ist deaktiviert.";
    return;
  }

  if (commands.length === 0) {
    commandFilterSummary.textContent =
      `Ausgeblendet: alle Nachrichten, die mit ${prefix} beginnen.`;
    return;
  }

  commandFilterSummary.textContent =
    `Ausgeblendet: ${commands.join(", ")}. Alle anderen Befehle bleiben sichtbar.`;
}


twitchSubButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showTwitchPanel(button.dataset.twitchPanel);
  });
});


hideChatCommands.addEventListener("change", () => {
  updateCommandFilter();
  setUnsavedChanges(true);
});


commandPrefix.addEventListener("input", () => {
  updateCommandFilter();
  setUnsavedChanges(true);
});


hiddenCommands.addEventListener("input", () => {
  updateCommandFilter();
  setUnsavedChanges(true);
});


commandInfoButton.addEventListener("click", () => {
  const willOpen = commandFilterInfo.hidden;

  commandFilterInfo.hidden = !willOpen;

  commandInfoButton.setAttribute(
    "aria-expanded",
    String(willOpen)
  );
});


/* Bestehende Settings um Twitch-Extras erweitern */

const collectBaseSettings = collectSettings;

collectSettings = function collectExtendedSettings() {
  const settings = collectBaseSettings();

  settings.channels.twitch.emotes = {
    betterTTV:
      document.querySelector("#enableBetterTTV").checked,

    sevenTV:
      document.querySelector("#enableSevenTV").checked,

    frankerFaceZ:
      document.querySelector("#enableFrankerFaceZ").checked
  };

  settings.channels.twitch.chatFilter = {
    hideCommands:
      hideChatCommands.checked,

    commandPrefix:
      commandPrefix.value.trim() || "!",

    hiddenCommands:
      getCommandList()
  };

  return settings;
};


/* Bereits lokal gespeicherte Twitch-Extras laden */

function loadTwitchExtras() {
  const savedData =
    localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    updateCommandFilter();
    return;
  }

  try {
    const savedSettings = JSON.parse(savedData);
    const twitchSettings =
      savedSettings.channels?.twitch;

    document.querySelector("#enableBetterTTV").checked =
      Boolean(twitchSettings?.emotes?.betterTTV);

    document.querySelector("#enableSevenTV").checked =
      Boolean(twitchSettings?.emotes?.sevenTV);

    document.querySelector("#enableFrankerFaceZ").checked =
      Boolean(twitchSettings?.emotes?.frankerFaceZ);

    hideChatCommands.checked =
      Boolean(twitchSettings?.chatFilter?.hideCommands);

    commandPrefix.value =
      twitchSettings?.chatFilter?.commandPrefix || "!";

    const savedCommands =
      twitchSettings?.chatFilter?.hiddenCommands;

    if (Array.isArray(savedCommands)) {
      hiddenCommands.value = savedCommands.join("\n");
    }
  } catch (error) {
    console.error(
      "Twitch-Extras konnten nicht geladen werden:",
      error
    );
  }

  updateCommandFilter();
}


showTwitchPanel("design");
loadTwitchExtras();



/* =========================================================
   Projektbanner ein- und ausblenden
   ========================================================= */

const settingsBrandBanner =
  document.querySelector("#settingsBrandBanner");


function updateSettingsBrandBanner(menuTarget) {
  const needsControlSpace =
    menuTarget === "animations"
    || menuTarget === "window";

  settingsBrandBanner.hidden = needsControlSpace;

  settingsBrandBanner.setAttribute(
    "aria-hidden",
    String(needsControlSpace)
  );
}


menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateSettingsBrandBanner(
      button.dataset.menuTarget
    );
  });
});



/* Breitenanzeige der Chat-Vorschau */
const windowWidthInput = document.querySelector("#windowWidth");
const windowWidthValue = document.querySelector("#windowWidthValue");

function updateWindowWidthValue() {
  if (windowWidthInput && windowWidthValue) windowWidthValue.textContent = `${windowWidthInput.value} px`;
}
windowWidthInput?.addEventListener("input", updateWindowWidthValue);
updateWindowWidthValue();
/* Theme oder eigene Hintergrundfarbe je Plattform */
const themeSelects = document.querySelectorAll(".theme-select");

function updateThemeColorState(select) {
  const channelName = select.dataset.themeChannel;
  const colorInput = document.querySelector(`#${channelName}BackgroundColor`);
  if (!colorInput) return;
  colorInput.disabled = select.value !== "standard";
  colorInput.setAttribute("aria-disabled", String(colorInput.disabled));
}

themeSelects.forEach((select) => {
  updateThemeColorState(select);
  select.addEventListener("change", () => {
    updateThemeColorState(select);
    applyPreview();
    setUnsavedChanges(true);
  });
});

const twitchColorResetButton = document.querySelector("#twitchColorResetButton");

twitchColorResetButton?.addEventListener("click", () => {
  const twitchTheme = document.querySelector("#twitchTheme");
  const twitchBackgroundColor = document.querySelector("#twitchBackgroundColor");
  const twitchTextColor = document.querySelector("#twitchTextColor");

  twitchTheme.value = "standard";
  twitchBackgroundColor.value = "#18131d";
  twitchTextColor.value = "#ffffff";

  updateThemeColorState(twitchTheme);
  applyPreview();
  setUnsavedChanges(true);
  setStatus("Farben zurückgesetzt – noch nicht gespeichert");
});

const kickColorResetButton = document.querySelector("#kickColorResetButton");

kickColorResetButton?.addEventListener("click", () => {
  const kickTheme = document.querySelector("#kickTheme");
  const kickBackgroundColor = document.querySelector("#kickBackgroundColor");
  const kickTextColor = document.querySelector("#kickTextColor");

  kickTheme.value = "standard";
  kickBackgroundColor.value = "#18131d";
  kickTextColor.value = "#ffffff";

  updateThemeColorState(kickTheme);
  applyPreview();
  setUnsavedChanges(true);
  setStatus("Farben zurückgesetzt – noch nicht gespeichert");
});

const youtubeColorResetButton = document.querySelector("#youtubeColorResetButton");

youtubeColorResetButton?.addEventListener("click", () => {
  const youtubeTheme = document.querySelector("#youtubeTheme");
  const youtubeBackgroundColor = document.querySelector("#youtubeBackgroundColor");
  const youtubeTextColor = document.querySelector("#youtubeTextColor");

  youtubeTheme.value = "standard";
  youtubeBackgroundColor.value = "#18131d";
  youtubeTextColor.value = "#ffffff";

  updateThemeColorState(youtubeTheme);
  applyPreview();
  setUnsavedChanges(true);
  setStatus("Farben zurückgesetzt – noch nicht gespeichert");
});

applyPreview();
/* =========================================================
   Separate Tablet-Darstellung
   ========================================================= */

const TABLET_APPEARANCE_KEY = "browserChatTabletAppearanceV1";
const tabletColorMode = document.querySelector("#tabletColorMode");
const tabletButtonColor = document.querySelector("#tabletButtonColor");
const tabletBorderColor = document.querySelector("#tabletBorderColor");
const saveTabletAppearanceButton = document.querySelector("#saveTabletAppearanceButton");
const tabletSaveStatus = document.querySelector("#tabletSaveStatus");

const TABLET_DEFAULTS = {
  mode: "separate",
  buttonColor: "#ff5f6d",
  borderColor: "#ff737d"
};

const TABLET_THEME_PRESETS = {
  "djain-trail": { buttonColor: "#7657ff", borderColor: "#4aa8ff" },
  harmony: { buttonColor: "#d94b4b", borderColor: "#b9c1cc" }
};

let savedTabletAppearance = loadTabletAppearance();
let tabletAppearanceDirty = false;

function loadTabletAppearance() {
  try {
    return {
      ...TABLET_DEFAULTS,
      ...JSON.parse(localStorage.getItem(TABLET_APPEARANCE_KEY) || "{}")
    };
  } catch {
    return { ...TABLET_DEFAULTS };
  }
}

function setTabletControls(settings) {
  const preset = TABLET_THEME_PRESETS[settings.mode];
  tabletColorMode.value = settings.mode;
  tabletButtonColor.value = preset?.buttonColor || settings.buttonColor;
  tabletBorderColor.value = preset?.borderColor || settings.borderColor;
  tabletButtonColor.disabled = Boolean(preset);
  tabletBorderColor.disabled = Boolean(preset) || settings.mode === "linked";
}

function applyTabletAppearance(settings) {
  const preset = TABLET_THEME_PRESETS[settings.mode];
  const buttonColor = preset?.buttonColor || settings.buttonColor;
  const borderColor = preset?.borderColor || (settings.mode === "linked" ? buttonColor : settings.borderColor);

  document.documentElement.dataset.tabletTheme = preset ? settings.mode : "";
  document.documentElement.style.setProperty("--tablet-button-choice", buttonColor);
  document.documentElement.style.setProperty("--tablet-border-choice", borderColor);
}

function readTabletControls() {
  const preset = TABLET_THEME_PRESETS[tabletColorMode.value];
  return {
    mode: tabletColorMode.value,
    buttonColor: preset?.buttonColor || tabletButtonColor.value,
    borderColor: preset?.borderColor || (tabletColorMode.value === "linked" ? tabletButtonColor.value : tabletBorderColor.value)
  };
}

function previewTabletAppearance() {
  const preset = TABLET_THEME_PRESETS[tabletColorMode.value];
  if (preset) {
    tabletButtonColor.value = preset.buttonColor;
    tabletBorderColor.value = preset.borderColor;
    tabletButtonColor.disabled = true;
    tabletBorderColor.disabled = true;
  } else if (tabletColorMode.value === "linked") {
    tabletBorderColor.value = tabletButtonColor.value;
    tabletButtonColor.disabled = false;
    tabletBorderColor.disabled = true;
  } else {
    tabletButtonColor.disabled = false;
    tabletBorderColor.disabled = false;
  }

  applyTabletAppearance(readTabletControls());
  tabletAppearanceDirty = true;
  tabletSaveStatus.textContent = "Tablet-Änderungen noch nicht gespeichert.";
  tabletSaveStatus.dataset.type = "info";
}

function openTabletAppearancePanel() {
  chatPreviewPanel.hidden = true;
  tabletAppearancePanel.hidden = false;
  setTabletControls(savedTabletAppearance);
  applyTabletAppearance(savedTabletAppearance);
  tabletAppearanceDirty = false;
  tabletSaveStatus.textContent = "";
}

function leaveTabletAppearancePanel() {
  if (!tabletAppearancePanel || tabletAppearancePanel.hidden) return;

  if (tabletAppearanceDirty) {
    setTabletControls(savedTabletAppearance);
    applyTabletAppearance(savedTabletAppearance);
  }

  tabletAppearanceDirty = false;
  tabletAppearancePanel.hidden = true;
  chatPreviewPanel.hidden = false;
  tabletSaveStatus.textContent = "";
}

[tabletColorMode, tabletButtonColor, tabletBorderColor].forEach((input) => {
  input.addEventListener("input", previewTabletAppearance);
  input.addEventListener("change", previewTabletAppearance);
});

saveTabletAppearanceButton.addEventListener("click", () => {
  savedTabletAppearance = readTabletControls();
  localStorage.setItem(TABLET_APPEARANCE_KEY, JSON.stringify(savedTabletAppearance));
  applyTabletAppearance(savedTabletAppearance);
  tabletAppearanceDirty = false;
  tabletSaveStatus.textContent = "Tablet-Darstellung wurde gespeichert.";
  tabletSaveStatus.dataset.type = "success";
});

setTabletControls(savedTabletAppearance);
applyTabletAppearance(savedTabletAppearance);

/* =========================================================
   Live-Chat-Anzeigedauer und iframe-Vorschau
   ========================================================= */
const liveChatDurationStorageKey = "liveChatDisplayDuration";

function normalizeLiveChatDuration(value) {
  return Math.min(
    45,
    Math.max(10, Number(value) || 18)
  );
}

function loadLiveChatPreviewDuration() {
  const savedDuration =
    localStorage.getItem(liveChatDurationStorageKey);

  liveChatDurationPreview.value = String(
    normalizeLiveChatDuration(savedDuration)
  );
}

function applyLiveChatPreviewDuration() {
  const seconds = normalizeLiveChatDuration(
    liveChatDurationPreview.value
  );

  liveChatDurationPreview.value = String(seconds);
  liveChatDurationOutput.textContent = `${seconds} s`;
  localStorage.setItem(
    liveChatDurationStorageKey,
    String(seconds)
  );

  liveChatPreviewFrame?.contentWindow?.postMessage(
    {
      type: "browser-chat:set-display-duration",
      seconds
    },
    "*"
  );
}

loadLiveChatPreviewDuration();
liveChatDurationPreview.addEventListener("input", applyLiveChatPreviewDuration);
liveChatPreviewFrame?.addEventListener("load", applyLiveChatPreviewDuration);
applyLiveChatPreviewDuration();

/* Live-Chat-Anzeigedauer: Bereich ein-/ausblenden */
liveChatDurationButton.addEventListener("click", () => {
  const shouldOpen = liveChatDurationPanel.hidden;
  updateSettingsUiState({
    activeLiveChatPanel: shouldOpen ? "duration" : null
  });
  liveChatDurationPanel.hidden = !shouldOpen;
  liveChatDurationButton.classList.toggle("is-active", shouldOpen);
  liveChatDurationButton.setAttribute("aria-expanded", String(shouldOpen));

  liveChatBrowserSourcePanel.hidden = true;
  liveChatBrowserSourceButton.classList.remove("is-active");
  liveChatBrowserSourceButton.setAttribute("aria-expanded", "false");
});

/* Browser-Source: vorerst nur vorbereiteten Bereich ein-/ausblenden */
liveChatBrowserSourceButton.addEventListener("click", () => {
  const shouldOpen = liveChatBrowserSourcePanel.hidden;
  updateSettingsUiState({
    activeLiveChatPanel: shouldOpen ? "browser-source" : null
  });
  liveChatBrowserSourcePanel.hidden = !shouldOpen;
  liveChatBrowserSourceButton.classList.toggle("is-active", shouldOpen);
  liveChatBrowserSourceButton.setAttribute("aria-expanded", String(shouldOpen));

  liveChatDurationPanel.hidden = true;
  liveChatDurationButton.classList.remove("is-active");
  liveChatDurationButton.setAttribute("aria-expanded", "false");
});

/* =========================================================
   Browser-Source
   Kopierfunktion bleibt bis zur produktiven Startlösung deaktiviert
   ========================================================= */

/* Settings-Zustand nach einem Live-Preview-Reload wiederherstellen */
function restoreSettingsUiState() {
  const state = readSettingsUiState();

  if (!state.tabletOpen) {
    return;
  }

  openTablet({ animate: false });

  if (state.activeMenu) {
    const menuButton = document.querySelector(
      `[data-menu-target="${state.activeMenu}"]`
    );

    menuButton?.click();
  }

  if (state.activeMenu === "channels" && state.activeChannel) {
    const channelButton = document.querySelector(
      `[data-channel="${state.activeChannel}"]`
    );

    channelButton?.click();
  }

  if (state.activeMenu === "live-chat") {
    if (state.activeLiveChatPanel === "duration") {
      liveChatDurationButton.click();
    } else if (state.activeLiveChatPanel === "browser-source") {
      liveChatBrowserSourceButton.click();
    }
  }



  window.requestAnimationFrame(() => {
    document.documentElement.classList.remove("settings-ui-restoring");
  });
}


restoreSettingsUiState();
