"use strict";

/* ======================================================================
   Browser Chat v1.4
   Settings - Language System

   Datei:
   settingsLanguage.js

   Aufgabe:
   - Lädt und verwaltet die Sprachpakete aus lang/
   - Englisch dient als Main-/Fallback-Sprache
   - Übersetzt sichtbare Texte und relevante HTML-Attribute
   - Speichert die gewählte Sprache lokal
   - Erkennt dynamisch ergänzte Inhalte über MutationObserver

   Unterstützte Sprachen:
   EN | DE | ES | FR | PT-BR | HI
   ====================================================================== */

(() => {

  /* ====================================================================
     Grundeinstellungen und Elemente
     ==================================================================== */

  const LANGUAGE_STORAGE_KEY = "browserChatSettingsLanguageV1";
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = ["en", "de", "es", "fr", "pt-BR", "hi"];

  const languageButton = document.querySelector("#languageButton");
  const languagePanel = document.querySelector("#languagePanel");
  const tabletActionStage = document.querySelector("#tabletActionStage");
  const languageOptions = document.querySelectorAll(".language-option");
  const menuButtons = document.querySelectorAll(".menu-button");

  if (!languageButton || !languagePanel || !tabletActionStage) {
    return;
  }

  const textBindings = [];
  const attributeBindings = [];
  const boundTextNodes = new WeakSet();
  const boundAttributes = new WeakMap();

  let fallbackMessages = {};
  let germanMessages = {};
  let activeMessages = {};
  let currentLanguage = DEFAULT_LANGUAGE;
  let reverseGerman = new Map();
  let reverseEnglish = new Map();
  let isApplyingLanguage = false;


  /* ====================================================================
     Sprachdaten vorbereiten und Übersetzungen auflösen
     ==================================================================== */

  function flattenMessages(source, prefix = "", target = {}) {
    Object.entries(source || {}).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        flattenMessages(value, path, target);
      } else {
        target[path] = String(value ?? "");
      }
    });

    return target;
  }

  function normalizeText(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function createReverseMap(messages) {
    const reverse = new Map();

    Object.entries(messages).forEach(([key, value]) => {
      const normalized = normalizeText(value);

      if (normalized && !reverse.has(normalized)) {
        reverse.set(normalized, key);
      }
    });

    return reverse;
  }

  function findTranslationKey(value) {
    const normalized = normalizeText(value);
    return reverseGerman.get(normalized) || reverseEnglish.get(normalized) || null;
  }

  function translate(key) {
    return activeMessages[key] ?? fallbackMessages[key] ?? germanMessages[key] ?? key;
  }

  async function loadLanguageFile(language) {
    const isLocalFile = window.location.protocol === "file:";

    if (isLocalFile) {
      const localMessages = window.browserChatLanguages?.[language];

      if (!localMessages) {
        throw new Error(`Local language ${language}.js could not be loaded.`);
      }

      return flattenMessages(localMessages);
    }

    const response = await fetch(`lang/${language}.json`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Language ${language} could not be loaded (${response.status}).`);
    }

    return flattenMessages(await response.json());
  }


  /* ====================================================================
     Texte und HTML-Attribute an Sprachschlüssel binden
     ==================================================================== */

  function bindTextNode(node) {
    if (!node || boundTextNodes.has(node) || !node.parentElement) {
      return;
    }

    if (node.parentElement.closest("script, style, .language-panel")) {
      return;
    }

    const key = findTranslationKey(node.nodeValue);

    if (!key) {
      return;
    }

    boundTextNodes.add(node);
    textBindings.push({ node, key });
  }

  function bindAttribute(element, attributeName) {
    const value = element.getAttribute(attributeName);

    if (!value) {
      return;
    }

    let attributes = boundAttributes.get(element);

    if (!attributes) {
      attributes = new Set();
      boundAttributes.set(element, attributes);
    }

    if (attributes.has(attributeName)) {
      return;
    }

    const key = findTranslationKey(value);

    if (!key) {
      return;
    }

    attributes.add(attributeName);
    attributeBindings.push({ element, attributeName, key });
  }

  function discoverBindings(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      bindTextNode(node);
      node = walker.nextNode();
    }

    const elements = root.matches?.("*")
      ? [root, ...root.querySelectorAll("*")]
      : [...root.querySelectorAll("*")];

    elements.forEach((element) => {
      ["aria-label", "title", "placeholder"].forEach((attributeName) => {
        bindAttribute(element, attributeName);
      });
    });
  }

  function preserveWhitespace(original, translated) {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";

    return `${leading}${translated}${trailing}`;
  }


  /* ====================================================================
     Sprache auf die Oberfläche anwenden
     ==================================================================== */

  function applyLanguage() {
    isApplyingLanguage = true;

    textBindings.forEach(({ node, key }) => {
      if (node.isConnected) {
        node.nodeValue = preserveWhitespace(node.nodeValue, translate(key));
      }
    });

    attributeBindings.forEach(({ element, attributeName, key }) => {
      if (element.isConnected) {
        element.setAttribute(attributeName, translate(key));
      }
    });

    const tabletSaveHint = document.querySelector(".tablet-info-save");

    if (tabletSaveHint) {
      tabletSaveHint.textContent = translate("tabletInfo.saveHint");
    }

    document.title = translate("app.title");
    document.documentElement.lang = currentLanguage;

    window.setTimeout(() => {
      isApplyingLanguage = false;
    }, 0);
  }

  function updateLanguageSelection() {
    languageOptions.forEach((option) => {
      const isSelected = option.dataset.language === currentLanguage;

      option.setAttribute("aria-checked", String(isSelected));
      option.classList.toggle("is-selected", isSelected);
    });
  }


  /* ====================================================================
     Sprachmenü öffnen und schließen
     ==================================================================== */

  function setLanguagePanelOpen(willOpen) {
    tabletActionStage.classList.toggle("is-language-open", willOpen);
    languageButton.setAttribute("aria-expanded", String(willOpen));
    languagePanel.setAttribute("aria-hidden", String(!willOpen));

    if (willOpen) {
      const selectedOption = languagePanel.querySelector('[aria-checked="true"]');
      window.setTimeout(() => selectedOption?.focus(), 220);
    }
  }


  /* ====================================================================
     Sprache wechseln und lokal speichern
     ==================================================================== */

  async function changeLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      language = DEFAULT_LANGUAGE;
    }

    try {
      const selectedMessages = language === DEFAULT_LANGUAGE
        ? fallbackMessages
        : await loadLanguageFile(language);

      currentLanguage = language;
      activeMessages = { ...fallbackMessages, ...selectedMessages };

      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);

      updateLanguageSelection();
      applyLanguage();
    } catch (error) {
      console.error("Settings language could not be changed:", error);

      currentLanguage = DEFAULT_LANGUAGE;
      activeMessages = { ...fallbackMessages };

      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);

      updateLanguageSelection();
      applyLanguage();
    }
  }


  /* ====================================================================
     Bedienung und Events
     ==================================================================== */

  languageButton.addEventListener("click", () => {
    const willOpen = !tabletActionStage.classList.contains("is-language-open");
    setLanguagePanelOpen(willOpen);
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      changeLanguage(option.dataset.language);
    });
  });

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguagePanelOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      tabletActionStage.classList.contains("is-language-open")
    ) {
      setLanguagePanelOpen(false);
      languageButton.focus();
    }
  });


  /* ====================================================================
     Dynamisch erzeugte Inhalte beobachten
     ==================================================================== */

  const observer = new MutationObserver((mutations) => {
    if (isApplyingLanguage) {
      return;
    }

    let foundNewBinding = false;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const before = textBindings.length;

          bindTextNode(node);
          foundNewBinding ||= textBindings.length > before;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const before = textBindings.length + attributeBindings.length;

          discoverBindings(node);
          foundNewBinding ||= textBindings.length + attributeBindings.length > before;
        }
      });

      if (mutation.type === "attributes") {
        bindAttribute(mutation.target, mutation.attributeName);
      }
    });

    if (foundNewBinding) {
      applyLanguage();
    }
  });


  /* ====================================================================
     Sprachsystem initialisieren
     ==================================================================== */

  async function initializeLanguageSystem() {
    try {
      const [english, german] = await Promise.all([
        loadLanguageFile("en"),
        loadLanguageFile("de")
      ]);

      fallbackMessages = english;
      germanMessages = german;

      reverseEnglish = createReverseMap(english);
      reverseGerman = createReverseMap(german);

      discoverBindings(document.body);

      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

      const initialLanguage = SUPPORTED_LANGUAGES.includes(storedLanguage)
        ? storedLanguage
        : DEFAULT_LANGUAGE;

      await changeLanguage(initialLanguage);

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-label", "title", "placeholder"]
      });
    } catch (error) {
      console.error("Settings language system could not be initialized:", error);

      currentLanguage = DEFAULT_LANGUAGE;
      updateLanguageSelection();
    }
  }


  /* ====================================================================
     Öffentliche Schnittstelle
     ==================================================================== */

  window.settingsLanguage = {
    change: changeLanguage,
    close: () => setLanguagePanelOpen(false),
    translate
  };


  /* ====================================================================
     Start
     ==================================================================== */

  initializeLanguageSystem();
})();