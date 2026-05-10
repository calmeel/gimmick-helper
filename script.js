document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "gimmickHelperSettings";
  const updateLogModal = document.getElementById("updateLogModal");
  const openUpdateLogButton = document.getElementById("openUpdateLogButton");
  const closeUpdateLogButton = document.getElementById("closeUpdateLogButton");
  const langEn = document.getElementById("langEn");
  const langJa = document.getElementById("langJa");
  const fileInput = document.getElementById("fileInput");
  const fileName = document.getElementById("fileName");
  const dropArea = document.querySelector(".drop-area");
  const output = document.getElementById("output");
  const previewTransformButton = document.getElementById("previewTransformButton");
  const downloadTransformButton = document.getElementById("downloadTransformButton");
  const suffixInput = document.getElementById("suffixInput");
  /** detach */
  const detachBarlineTimes = document.getElementById("detachBarlineTimes");
  const detachNoteSv = document.getElementById("detachNoteSv");
  const detachBarlineSv = document.getElementById("detachBarlineSv");
  const detachNoteVolume = document.getElementById("detachNoteVolume");
  const detachBarlineVolume = document.getElementById("detachBarlineVolume");
  const detachNoteKiai = document.getElementById("detachNoteKiai");
  const detachBarlineKiai = document.getElementById("detachBarlineKiai");

  const i18nData = window.i18n ?? i18n;

  const dom = {
    suffixInput,

    detachBarlineTimes,
    detachNoteSv,
    detachBarlineSv,
    detachNoteVolume,
    detachBarlineVolume,
    detachNoteKiai,
    detachBarlineKiai
  };

  let currentLang =
    localStorage.getItem("gimmickHelperLang") ||
    ((navigator.language || "").startsWith("ja") ? "ja" : "en");

  let currentSource = null;

  const previewController = setupPreviewController({
    dom,
    output,
    downloadButton: downloadTransformButton,
    t,
    getCurrentSource: () => currentSource
  });

  function t(key) {
    return i18nData[currentLang]?.[key] || key;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang;

    if (langEn) langEn.classList.toggle("active", currentLang === "en");
    if (langJa) langJa.classList.toggle("active", currentLang === "ja");

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = t(key);
    });

    if (!currentSource && fileName) {
      fileName.textContent = t("noFileSelected");
    }

    if (!currentSource && output) {
      output.textContent = t("noFileLoaded");
    }
  }

  async function handleFileSelected(file) {
    try {
      currentSource = await loadOsuFile(file);

      previewController.clearPreview();

      if (fileName) {
        fileName.textContent = currentSource.fileName;
      }

      renderMessage(
        output,
        `${t("loaded")}: ${currentSource.fileName}\n\n${t("readyToConvert")}`
      );
    } catch (error) {
      currentSource = null;

      previewController.clearPreview();

      if (fileName) {
        fileName.textContent = t("noFileSelected");
      }

      renderMessage(
        output,
        `${t("error")}: ${error.message}`
      );
    }
  }

  setupTabs();
  setupDropArea(dropArea, handleFileSelected);
  setupFileInput(fileInput, handleFileSelected);

  setupLanguageButtons(
    langEn,
    langJa,
    () => currentLang,
    lang => {
      currentLang = lang;
      localStorage.setItem("gimmickHelperLang", lang);
    },
    applyLanguage
  );

  if (previewTransformButton) {
    previewTransformButton.addEventListener("click", previewController.preview);
  }

  if (downloadTransformButton) {
    downloadTransformButton.addEventListener("click", previewController.download);
  }

  openUpdateLogButton?.addEventListener("click", () => {
    updateLogModal?.classList.remove("hidden");
  });

  closeUpdateLogButton?.addEventListener("click", () => {
    updateLogModal?.classList.add("hidden");
  });

  setupGimmickHelperSettings(dom);

  applyLanguage();
});