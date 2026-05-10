function setupGimmickHelperSettings(dom) {
  const STORAGE_KEY = "gimmickHelperSettings";

  function getSettings() {
    return {
      suffix: dom.suffixInput?.value ?? "",

      detachBarlineTimes: dom.detachBarlineTimes?.value ?? "",
      detachNoteSv: dom.detachNoteSv?.value ?? "",
      detachBarlineSv: dom.detachBarlineSv?.value ?? "",
      detachNoteVolume: dom.detachNoteVolume?.value ?? "",
      detachBarlineVolume: dom.detachBarlineVolume?.value ?? "",
    };
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSettings()));
  }

  function loadSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const settings = JSON.parse(raw);

      if (dom.suffixInput) dom.suffixInput.value = settings.suffix ?? "";

      if (dom.detachBarlineTimes) dom.detachBarlineTimes.value = settings.detachBarlineTimes ?? "";
      if (dom.detachNoteSv) dom.detachNoteSv.value = settings.detachNoteSv ?? "";
      if (dom.detachBarlineSv) dom.detachBarlineSv.value = settings.detachBarlineSv ?? "";
      if (dom.detachNoteVolume) dom.detachNoteVolume.value = settings.detachNoteVolume ?? "";
      if (dom.detachBarlineVolume) dom.detachBarlineVolume.value = settings.detachBarlineVolume ?? "";
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function syncSuffixCheckbox() {
    if (!dom.enableSuffix || !dom.suffixInput) return;

    const hasSuffix = dom.suffixInput.value.trim().length > 0;

    dom.enableSuffix.checked = hasSuffix;
    dom.enableSuffix.disabled = !hasSuffix;
  }

  function setupPersistence() {
    const targets = [
      dom.suffixInput,
      dom.detachBarlineTimes,
      dom.detachNoteSv,
      dom.detachBarlineSv,
      dom.detachNoteVolume,
      dom.detachBarlineVolume,
      dom.detachNoteKiai,
      dom.detachBarlineKiai
    ];

    for (const target of targets) {
      if (!target) continue;

      target.addEventListener("input", () => {
        saveSettings();
      });

      target.addEventListener("change", () => {
        saveSettings();
      });
    }
  }

  loadSettings();
  setupPersistence();

  return {
    saveSettings,
    loadSettings,
    syncSuffixCheckbox
  };
}