function getActiveTransformName() {
  const activeButton = document.querySelector(".tab-button.active");
  return activeButton?.dataset.tab || "noop";
}

function parseOptionalFloat(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;

  const parsed = parseFloat(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseOptionalInt(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;

  const parsed = parseInt(trimmed, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function getDetachBarlineOptions(dom) {
  return {
    barlineTimesText: dom.detachBarlineTimes?.value ?? "",

    noteSv: parseOptionalFloat(dom.detachNoteSv?.value),
    barlineSv: parseOptionalFloat(dom.detachBarlineSv?.value),

    noteVolume: parseOptionalInt(dom.detachNoteVolume?.value),
    barlineVolume: parseOptionalInt(dom.detachBarlineVolume?.value),

    noteKiai: "inherit",
    barlineKiai: "inherit"
  };
}

function getSelectedTransform(dom) {
  const activeTransform = getActiveTransformName();

  if (activeTransform === "detachBarline") {
    return {
      fn: runDetachBarlineTransform,
      options: getDetachBarlineOptions(dom)
    };
  }

  return {
    fn: runNoopTransform,
    options: {}
  };
}