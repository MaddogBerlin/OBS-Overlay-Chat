(() => {
  "use strict";

  /* ======================================================================
     Browser Chat v1.4
     Settings - Animation System

     Datei:
     settingsAnimations.js

     Aufgabe:
     - Steuert die Animationsvorschau in den Settings
     - Lädt optionale Animations-CSS-Dateien dynamisch
     - Verwaltet Preset- und Self-Create-Vorschauen
     - Spielt die Nachrichtenfolge automatisch wiederholt ab
     - Übernimmt Vorschauwerte für Geschwindigkeit und Anzeigedauer

     Hinweis:
     Diese Datei steuert ausschließlich die Settings-Vorschau.
     Der echte Live Chat bleibt davon getrennt.
     ====================================================================== */


  /* ====================================================================
     Elemente und Vorschau-Grundlagen
     ==================================================================== */

  const animationEffect = document.querySelector("#animationEffect");
  const animationControls = document.querySelector("#animationControls");
  const presetPreviewControls = document.querySelector("#presetPreviewControls");
  const presetPreviewSpeed = document.querySelector("#presetPreviewSpeed");
  const presetPreviewDisplayDuration = document.querySelector("#presetPreviewDisplayDuration");
  const animationStylesheet = document.querySelector("#selectedChatAnimationStylesheet");
  const chatPreview = document.querySelector("#chatPreview");

  const basePreviewMessages = [
    ...document.querySelectorAll("#chatPreview .chat-message")
  ];

  const previewSequence = [0, 1, 2, 1, 0, 2, 1];

  const previewMessages = previewSequence.map((templateIndex, sequenceIndex) => {
    if (sequenceIndex < basePreviewMessages.length) {
      return basePreviewMessages[sequenceIndex];
    }

    return basePreviewMessages[templateIndex].cloneNode(true);
  });

  const selfCreatePreviewMessages = previewMessages.slice(0, 3);


  /* ====================================================================
     Regler und Animationsdateien
     ==================================================================== */

  const controls = {
    animationSpeed: document.querySelector("#animationSpeed"),
    displayDuration: document.querySelector("#displayDuration"),
    fadeInDuration: document.querySelector("#fadeInDuration"),
    fadeOutDuration: document.querySelector("#fadeOutDuration")
  };

  const animationFiles = {
    pop: "../styles/animation/animation-pop.css",
    "slide-left": "../styles/animation/animation-slide-left.css",
    "slide-right": "../styles/animation/animation-slide-right.css",
    zoom: "../styles/animation/animation-zoom.css",
    "self-create": "../styles/animation/selfCreate-animation.css"
  };

  let stylesheetRequest = 0;

  const presetEffects = new Set([
    "pop",
    "slide-left",
    "slide-right",
    "zoom"
  ]);

  const previewReplayTimers = new Set();


  /* ====================================================================
     Vorschau-Timer verwalten
     ==================================================================== */

  function schedulePreviewStep(callback, delay) {
    const timer = window.setTimeout(() => {
      previewReplayTimers.delete(timer);
      callback();
    }, delay);

    previewReplayTimers.add(timer);
  }

  function stopPreviewReplay() {
    previewReplayTimers.forEach((timer) => window.clearTimeout(timer));
    previewReplayTimers.clear();
  }


  /* ====================================================================
     Vorschauwerte als CSS-Variablen bereitstellen
     ==================================================================== */

  function updatePreviewVariables() {
    chatPreview.style.setProperty(
      "--settings-animation-duration",
      `${controls.animationSpeed.value}ms`
    );

    chatPreview.style.setProperty(
      "--settings-display-duration",
      `${controls.displayDuration.value}ms`
    );

    chatPreview.style.setProperty(
      "--settings-fade-in-duration",
      `${controls.fadeInDuration.value}ms`
    );

    chatPreview.style.setProperty(
      "--settings-fade-out-duration",
      `${controls.fadeOutDuration.value}ms`
    );
  }


  /* ====================================================================
     Animationsvorschau abspielen und wiederholen
     ==================================================================== */

  function replayPreview() {
    stopPreviewReplay();

    previewMessages.forEach((message) => {
      message.getAnimations().forEach((animation) => animation.cancel());
      message.classList.remove("chat-message");
      message.style.removeProperty("animation-duration");
      message.style.removeProperty("opacity");
      message.remove();
    });

    void chatPreview.offsetWidth;

    if (!animationEffect.value || presetEffects.has(animationEffect.value)) {
      const effect = animationEffect.value || "fade";
      const previewSpeed = Number(presetPreviewSpeed.value);
      const displayDuration = Number(presetPreviewDisplayDuration.value);
      const messageInterval = 3000;
      const replayPause = 10000;

      previewMessages.forEach((message, index) => {
        const insertAt = index * messageInterval;

        schedulePreviewStep(() => {
          const visibleMessages = [
            ...chatPreview.querySelectorAll(".preview-message")
          ];

          if (visibleMessages.length >= 4) {
            const oldestMessage = visibleMessages[0];

            oldestMessage
              .getAnimations()
              .forEach((animation) => animation.cancel());

            oldestMessage.remove();
          }

          chatPreview.append(message);
          message.style.animationDuration = `${previewSpeed}ms`;

          if (effect !== "fade") {
            void message.offsetWidth;
            message.classList.add("chat-message");
          }

          if (effect === "fade") {
            message.animate(
              [
                { opacity: 0 },
                { opacity: 1 }
              ],
              {
                duration: previewSpeed,
                easing: "ease-out",
                fill: "both"
              }
            );
          }

          schedulePreviewStep(() => {
            if (!message.isConnected) {
              return;
            }

            const fadeOut = message.animate(
              [
                { opacity: 1 },
                { opacity: 0 }
              ],
              {
                duration: previewSpeed,
                easing: "ease-in",
                fill: "forwards"
              }
            );

            fadeOut.addEventListener(
              "finish",
              () => {
                message.style.opacity = "0";
                fadeOut.commitStyles();
                fadeOut.cancel();
                message.remove();
              },
              { once: true }
            );
          }, displayDuration);
        }, insertAt);
      });

      const lastMessageRemovedAt =
        (previewMessages.length - 1) * messageInterval +
        displayDuration +
        previewSpeed;

      schedulePreviewStep(
        replayPreview,
        lastMessageRemovedAt + replayPause
      );
    }

    if (animationEffect.value === "self-create") {
      const displayDuration = Number(controls.displayDuration.value);
      const fadeOutDuration = Number(controls.fadeOutDuration.value);
      const replayPause = 10000;

      selfCreatePreviewMessages.forEach((message) => {
        chatPreview.append(message);

        void message.offsetWidth;
        message.classList.add("chat-message");

        const fadeOut = message.animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: fadeOutDuration,
            delay: displayDuration,
            easing: "ease-in",
            fill: "forwards"
          }
        );

        fadeOut.addEventListener(
          "finish",
          () => {
            message.style.opacity = "0";
            fadeOut.commitStyles();
            fadeOut.cancel();
            message.remove();
          },
          { once: true }
        );
      });

      schedulePreviewStep(
        replayPreview,
        displayDuration + fadeOutDuration + replayPause
      );
    }
  }


  /* ====================================================================
     Optionale Animationsdateien laden und entfernen
     ==================================================================== */

  function unloadOptionalAnimation() {
    animationStylesheet.removeAttribute("href");
    animationStylesheet.disabled = true;
  }

  function loadOptionalAnimation(effect) {
    const href = animationFiles[effect];
    const request = ++stylesheetRequest;

    if (!href) {
      unloadOptionalAnimation();
      replayPreview();
      return;
    }

    animationStylesheet.disabled = false;

    if (animationStylesheet.getAttribute("href") === href) {
      replayPreview();
      return;
    }

    animationStylesheet.addEventListener(
      "load",
      () => {
        if (request === stylesheetRequest) {
          replayPreview();
        }
      },
      { once: true }
    );

    animationStylesheet.addEventListener(
      "error",
      () => {
        if (request === stylesheetRequest) {
          console.error(
            `Animation stylesheet could not be loaded: ${href}`
          );
        }
      },
      { once: true }
    );

    animationStylesheet.setAttribute("href", href);
  }


  /* ====================================================================
     Ausgewählte Animation auf die Vorschau anwenden
     ==================================================================== */

  function applySelectedAnimation() {
    stopPreviewReplay();

    const effect = animationEffect.value;
    const isSelfCreate = effect === "self-create";

    animationControls.hidden = !isSelfCreate;
    presetPreviewControls.hidden = !presetEffects.has(effect);
    chatPreview.dataset.previewAnimation = effect || "none";

    updatePreviewVariables();
    loadOptionalAnimation(effect);
  }


  /* ====================================================================
     Bedienung und Events
     ==================================================================== */

  animationEffect.addEventListener(
    "change",
    applySelectedAnimation
  );

  [presetPreviewSpeed, presetPreviewDisplayDuration].forEach((control) => {
    control.addEventListener("input", () => {
      if (presetEffects.has(animationEffect.value)) {
        replayPreview();
      }
    });
  });

  Object.values(controls).forEach((control) => {
    control.addEventListener("input", () => {
      updatePreviewVariables();

      if (animationEffect.value === "self-create") {
        replayPreview();
      }
    });
  });


  /* ====================================================================
     Öffentliche Schnittstelle
     ==================================================================== */

  window.settingsAnimations = {
    apply: applySelectedAnimation,
    replay: replayPreview
  };


  /* ====================================================================
     Start
     ==================================================================== */

  applySelectedAnimation();
})();