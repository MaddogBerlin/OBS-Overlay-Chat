"use strict";

window.browserChatLanguages = window.browserChatLanguages || {};

window.browserChatLanguages["pt-BR"] = {
  "app": {
    "title": "Browser Chat Local Settings",
    "openSettings": "Abrir configurações",
    "closeSettings": "Fechar configurações",
    "settingsAriaLabel": "Configurações do Browser Chat"
  },
  "general": {
    "settings": "Configurações",
    "menuSettings": "Menu de configurações"
  },
  "welcome": {
    "presentation": "Browser Chat apresenta nosso trabalho em conjunto",
    "title": "Browser Chat Local Settings",
    "intro": "Personalize seu overlay de chat multiplataforma para Twitch, Kick e YouTube diretamente na visualização ao vivo.",
    "availableTitle": "Já disponível",
    "featurePlatformDesign": "Cores e fontes personalizadas para cada plataforma",
    "featureWindowDesign": "Ajustar tamanho da janela, arredondamento e aparência",
    "featureAnimations": "Selecionar animações Fade, Pop, Slide e Zoom",
    "featureAnimationTiming": "Ajustar duração e velocidade das animações",
    "featureEmotesFilters": "Preparar emotes da Twitch e filtros de chat",
    "featureLocalSave": "Salvar e recarregar as configurações localmente",
    "hint": "Escolha uma seção no menu central para começar a personalizar."
  },
  "menu": {
    "chatSettings": "Configurações de chat dos canais",
    "animationSettings": "Configurações de animação",
    "tabletSettings": "Configurações do tablet"
  },
  "tabletInfo": {
    "title": "Design do tablet",
    "intro": "Personalize aqui somente o tablet de configurações. O overlay do chat permanece inalterado.",
    "modesTitle": "Modos de cor",
    "separateText": "Separadas: Cores individuais para o botão de energia e a borda do tablet.",
    "linkedText": "Vinculadas: Uma cor compartilhada para a borda, o botão de energia e os contornos dos botões.",
    "djainTrailText": "Rastro Djain: Violeta-azul com pulsação suave.",
    "harmonyText": "Harmony: Borda dividida em vermelho e prata com botões de efeito fosco.",
    "controlsTitle": "Controles",
    "confirmText": "Confirmar janela: Atualiza somente a prévia e ainda não salva.",
    "saveSettingsText": "Salvar configurações: Salva localmente as configurações do chat e as envia ao Streamer.bot.",
    "saveTabletText": "Salvar tablet: Salva somente o modo de cor e o design do tablet.",
    "saveHint": "As alterações aparecem inicialmente apenas na prévia. Depois, use o botão de salvamento correspondente para aplicá-las permanentemente."
  },
  "channels": {
    "title": "Configurações de chat dos canais",
    "selectPlatformAriaLabel": "Selecionar plataforma de chat",
    "selectFirst": "Selecione primeiro um canal.",
    "local": "Local",
    "twitch": "Twitch",
    "kick": "Kick",
    "youtube": "YouTube"
  },
  "window": {
    "title": "Configurações da janela",
    "maxChatWidth": "Largura máxima do chat",
    "info": "Controla a largura máxima do chat ao vivo de 320 a 960 px."
  },
  "theme": {
    "selection": "Seleção de tema",
    "standard": "Padrão – cor personalizada",
    "dark": "Escuro",
    "green": "Verde",
    "purple": "Roxo",
    "yellow": "Amarelo",
    "selfCreate": "Criar próprio"
  },
  "design": {
    "chatDesign": "Design do chat",
    "backgroundColor": "Cor de fundo",
    "textColor": "Cor do texto",
    "font": "Fonte",
    "selectFont": "Selecionar fonte",
    "resetColors": "Redefinir cores",
    "resetColorsButton": "Restaurar padrão"
  },
  "twitch": {
    "settingsAriaLabel": "Configurações da Twitch",
    "chatTitle": "Chat da Twitch",
    "emotesFilters": "Emotes e filtros",
    "emotes": {
      "title": "Emotes",
      "betterTTV": "Ativar BetterTTV",
      "sevenTV": "Ativar 7TV",
      "frankerFaceZ": "Ativar FrankerFaceZ"
    },
    "filters": {
      "title": "Filtro de chat",
      "hideCommands": "Ocultar comandos do chat no overlay",
      "commandPrefix": "Prefixo de comando",
      "specificCommands": "Comandos específicos",
      "commandInfoAriaLabel": "Informações sobre o filtro de comandos",
      "commandInfo": "Esses comandos são ocultados apenas no overlay. O Streamer.bot continua executando-os. Os comandos que não estiverem nesta lista permanecem visíveis no overlay.",
      "disabled": "O filtro de comandos está desativado.",
      "commandPlaceholder": "!discord\n!uptime\n!song"
    }
  },
  "kick": {
    "chatTitle": "Chat da Kick"
  },
  "youtube": {
    "chatTitle": "Chat do YouTube"
  },
  "animations": {
    "title": "Configurações de animação",
    "effect": "Efeito de animação",
    "selectEffect": "Selecionar animação",
    "effects": {
      "fade": "Fade",
      "pop": "Pop",
      "slideLeft": "Deslizar para a esquerda",
      "slideRight": "Deslizar para a direita",
      "zoom": "Zoom"
    },
    "controlsTitle": "Controles de animação",
    "speed": "Velocidade da animação",
    "displayDuration": "Duração da exibição",
    "fadeInDuration": "Duração da entrada",
    "fadeOutDuration": "Duração da saída",
    "reset": {
      "title": "Redefinir",
      "enable": "Ativar redefinição",
      "button": "Redefinir animação",
      "locked": "A redefinição não está ativada",
      "unlocked": "A redefinição está ativada",
      "completed": "Animação redefinida – ainda não salva",
      "info": "Redefine o rascunho da animação atual para os valores padrão."
    },
    "previewControlsTitle": "Controles de pré-visualização",
    "previewSpeed": "Velocidade de entrada",
    "previewInfo": "Estes controles se aplicam apenas à janela de pré-visualização. Eles mostram a animação básica predefinida com diferentes velocidades de entrada e durações de exibição. A animação original não é alterada nem salva."
  },
  "preview": {
    "title": "Janela de visualização do chat",
    "twitch": {
      "username": "Alex Carter",
      "message": "Bem-vindo ao nosso chat multiplataforma – todas as mensagens aparecem aqui em harmonia."
    },
    "kick": {
      "username": "NovaRider",
      "message": "O novo overlay do Browser Chat está incrível e combina perfeitamente com a stream!"
    },
    "youtube": {
      "username": "LunaStreams",
      "message": "Saudações do chat do YouTube – a visualização compartilhada está funcionando perfeitamente! 👋"
    }
  },
  "tablet": {
    "title": "Configurações do tablet",
    "hint": "Estas cores se aplicam apenas ao tablet de configurações.",
    "colorMode": "Modo de cor",
    "separateColors": "Cores separadas",
    "linkedColors": "Vincular cores",
    "buttonColor": "Cor do botão",
    "borderColor": "Cor da borda",
    "language": "Idioma",
    "save": "Salvar tablet"
  },
  "actions": {
    "confirmWindow": "Confirmar janela",
    "saveSettings": "Salvar configurações"
  },
  "status": {
    "title": "Status de salvamento",
    "tabletTitle": "Status de salvamento do tablet",
    "noChanges": "Nenhuma alteração",
    "unsavedChanges": "Alterações não salvas",
    "loaded": "As configurações salvas foram carregadas.",
    "previewUpdated": "A visualização foi atualizada.",
    "settingsSaved": "Configurações salvas – recarregue a fonte do navegador.",
    "settingsDamaged": "As configurações salvas estão corrompidas.",
    "tabletUnsaved": "As alterações do tablet ainda não foram salvas.",
    "tabletSaved": "A aparência do tablet foi salva.",
    "colorsResetUnsaved": "Cores redefinidas – ainda não salvas"
  },
  "dialog": {
    "unsavedTitle": "Alterações não salvas",
    "discardQuestion": "Deseja descartar as alterações e fechar o tablet?",
    "cancel": "Cancelar",
    "confirm": "OK"
  },
  "liveChat": {
    "title": "Configurações do chat ao vivo",
    "infoIntro": "Configure aqui a aparência e a duração de exibição do seu chat ao vivo para a sobreposição do OBS.",
    "currentStatus": "Status atual",
    "featurePreview": "Pré-visualização do chat ao vivo com mensagens reais",
    "featureDuration": "Duração de exibição ajustável de 10 a 45 segundos",
    "featureBrowserSource": "A fonte do navegador é integrada manualmente por meio do index.html no momento",
    "transparencyHint": "O fundo escuro é usado apenas para a exibição nas configurações. O chat ao vivo permanece transparente na sobreposição do OBS.",
    "settingsAriaLabel": "Configurações do chat ao vivo",
    "emptyPreviewAriaLabel": "Área de exibição vazia para o chat ao vivo",
    "durationButton": "Duração de exibição",
    "browserSourceButton": "Fonte do navegador",
    "durationTitle": "Duração de exibição do chat ao vivo",
    "durationLabel": "Duração de exibição",
    "durationInfo": "Mais tarde, isto alterará por quanto tempo o chat ao vivo será exibido. No momento, o controle deslizante está visível apenas para demonstração.",
    "browserSourceCopyButton": "Copiar fonte do navegador",
    "browserSourceInfo": "A função de cópia automática está planejada para uma versão futura. Até lá, abra index.html manualmente na pasta do projeto e copie o endereço da barra de endereços. Como alternativa, ative 'Arquivo local' no OBS e selecione index.html diretamente.",
    "browserSourceCopySuccess": "A fonte do navegador foi copiada.",
    "browserSourceCopyError": "Não foi possível copiar a fonte do navegador."
  }
};