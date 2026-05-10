function renderMessage(output, message) {
  if (!output) return;
  output.textContent = message;
}

function formatSummaryItem(item, t) {
  if (typeof item === "string") {
    return item;
  }

  if (item?.key && item?.value !== undefined) {
    return `${t(item.key)}: ${item.value}`;
  }

  if (item?.text) {
    return item.text;
  }

  return String(item);
}

function formatPreviewTimestamp(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = ms % 1000;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(millis).padStart(3, "0")}`;
}

function formatMovedObjectsDetails(movedObjects, t) {
  if (!movedObjects?.length) {
    return [];
  }

  const lines = [];

  lines.push(`${t("details")}:`);
  lines.push(`${t("movedObjects")}:`);

  for (const item of movedObjects) {
    lines.push(
      `- ${formatPreviewTimestamp(item.originalTime)} → ${formatPreviewTimestamp(item.targetTime)} (${item.objectType}, diff ${item.diff})`
    );
  }

  lines.push("");

  return lines;
}

function renderTransformResult(output, result, t) {
  if (!output || !result) return;

  const lines = [];

  const inputLabel = `${t("input")}:`.padEnd(6, " ");
  const outputLabel = `${t("output")}:`.padEnd(6, " ");

  lines.push(`${inputLabel} ${result.originalFileName}`);
  lines.push(`${outputLabel} ${result.outputFileName}`);
  lines.push("");

  if (result.summary?.length) {
    lines.push(`${t("summary")}:`);
    for (const item of result.summary) {
      lines.push(`- ${formatSummaryItem(item, t)}`);
    }
    lines.push("");
  }

  if (result.details?.movedObjects?.length) {
    lines.push(...formatMovedObjectsDetails(result.details.movedObjects, t));
  }

  if (result.warnings?.length) {
    lines.push(`${t("warnings")}:`);
    for (const item of result.warnings) {
      lines.push(
        `<span class="preview-warning">- ${formatWarningItem(item, t)}</span>`
      );
    }
  }

  output.innerHTML = lines.join("<br>");
}

function formatWarningItem(item, t) {
  if (typeof item === "string") {
    return item;
  }

  if (item?.key === "noObjectNearBarline") {
    return `${t("noObjectNearBarline")}: ${item.time} ms`;
  }

  if (item?.key === "existingGreenLineOverwritten") {
    return `${t("existingGreenLineOverwritten")}: ${item.time} ms`;
  }

  if (item?.text) {
    return item.text;
  }
  
  if (item?.key === "noBarlineTimes") {
    return t("noBarlineTimes");
  }

  if (item?.key === "invalidSvValue") {
    return t("invalidSvValue");
  }

  if (item?.key === "invalidVolumeValue") {
    return t("invalidVolumeValue");
  }

  return String(item);
}