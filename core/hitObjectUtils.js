function parseDetachableHitObjects(text) {
  const lines = getSectionLines(text, "HitObjects");

  const objects = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    const parts = line.split(",");

    if (parts.length < 5) continue;

    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    const time = parseInt(parts[2], 10);
    const type = parseInt(parts[3], 10);

    const isCircle = (type & 1) !== 0;
    const isSlider = (type & 2) !== 0;
    const isSpinner = (type & 8) !== 0;

    if (!isCircle && !isSlider && !isSpinner) continue;

    objects.push({
      index: i,
      line,
      parts,
      x,
      y,
      time,
      type,
      objectType: isCircle
        ? "circle"
        : isSlider
          ? "slider"
          : "spinner"
    });
  }

  return objects;
}

function replaceHitObjectLines(text, replacements) {
  const lines = text.split(/\r?\n/);
  const newline = text.includes("\r\n") ? "\r\n" : "\n";

  const hitObjectSectionIndex = lines.findIndex(
    line => line.trim() === "[HitObjects]"
  );

  if (hitObjectSectionIndex < 0) {
    return text;
  }

  let currentObjectIndex = 0;

  for (let i = hitObjectSectionIndex + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) continue;

    if (trimmed.startsWith("[")) {
      break;
    }

    const replacement = replacements.find(
      r => r.objectIndex === currentObjectIndex
    );

    if (replacement) {
      lines[i] = replacement.newLine;
    }

    currentObjectIndex++;
  }

  return lines.join(newline);
}