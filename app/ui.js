function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  for (const button of tabButtons) {
    button.addEventListener("click", () => {
      const tabName = button.dataset.tab;

      for (const b of tabButtons) {
        b.classList.remove("active");
      }

      for (const panel of tabPanels) {
        panel.classList.remove("active");
      }

      button.classList.add("active");

      const targetPanel = document.getElementById(`tab-${tabName}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  }
}

function setupDropArea(dropArea, onFileSelected) {
  if (!dropArea) return;

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-over");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-over");
  });

  dropArea.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];
    await onFileSelected(file);
  });
}

function setupFileInput(fileInput, onFileSelected) {
  if (!fileInput) return;

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    await onFileSelected(file);

    fileInput.value = "";
  });
}

function setupLanguageButtons(langEn, langJa, getCurrentLang, setCurrentLang, applyLanguage) {
  if (langEn) {
    langEn.addEventListener("click", () => {
      setCurrentLang("en");
      applyLanguage();
    });
  }

  if (langJa) {
    langJa.addEventListener("click", () => {
      setCurrentLang("ja");
      applyLanguage();
    });
  }
}