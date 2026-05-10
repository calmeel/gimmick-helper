function parseTimingPoints(text) {
  const lines = text.split(/\r?\n/);

  const sectionIndex = lines.findIndex(
    line => line.trim() === "[TimingPoints]"
  );

  if (sectionIndex < 0) {
    return [];
  }

  const result = [];

  for (let i = sectionIndex + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) continue;

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      break;
    }

    const parts = trimmed.split(",");

    if (parts.length < 8) {
      continue;
    }

    result.push({
      raw: trimmed,

      time: parseFloat(parts[0]),
      beatLength: parseFloat(parts[1]),
      meter: parseInt(parts[2], 10),

      sampleSet: parseInt(parts[3], 10),
      sampleIndex: parseInt(parts[4], 10),

      volume: parseInt(parts[5], 10),

      uninherited: parseInt(parts[6], 10),

      effects: parseInt(parts[7], 10)
    });
  }

  return result;
}

function getActiveTimingPointStateAt(text, time) {
  const timingPoints = parseTimingPoints(text);

  let currentRed = null;
  let currentGreen = null;

  for (const point of timingPoints) {
    if (point.time > time) {
      break;
    }

    if (point.uninherited === 1) {
      currentRed = point;
    } else {
      currentGreen = point;
    }
  }

  const sv = currentGreen
    ? -100 / currentGreen.beatLength
    : 1;

  const volume =
    currentGreen?.volume ??
    currentRed?.volume ??
    100;

  const kiai =
    ((currentGreen?.effects ?? currentRed?.effects ?? 0) & 1) !== 0;

  return {
    sv,
    volume,
    kiai
  };
}

function createGreenLine({
  time,
  sv,
  volume,
  kiai,
  fallbackState
}) {
  const finalSv =
    sv == null
      ? fallbackState?.sv ?? 1
      : sv;

  const finalVolume =
    volume == null
      ? fallbackState?.volume ?? 100
      : volume;

  const finalKiai =
    kiai === "inherit"
      ? (fallbackState?.kiai ?? false)
      : kiai === "on";

  const beatLength = -100 / finalSv;

  let effects = 0;

  if (kiai === "on") {
    effects |= 1;
  }

  return [
    time,
    beatLength,
    4,
    1,
    0,
    finalVolume,
    0,
    effects
  ].join(",");
}

function isGreenTimingLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("//")) return false;

  const parts = trimmed.split(",");
  if (parts.length < 8) return false;

  const uninherited = parseInt(parts[6], 10);
  return uninherited === 0;
}

function getTimingLineTime(line) {
  const parts = line.trim().split(",");
  return Math.round(parseFloat(parts[0]));
}

function insertOrReplaceTimingPoints(text, timingLines) {
  const lines = text.split(/\r?\n/);
  const newline = text.includes("\r\n") ? "\r\n" : "\n";

  const warnings = [];

  const sectionIndex = lines.findIndex(
    line => line.trim() === "[TimingPoints]"
  );

  if (sectionIndex < 0) {
    return {
      text,
      warnings: ["[TimingPoints] section was not found."]
    };
  }

  let sectionEnd = lines.length;

  for (let i = sectionIndex + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      sectionEnd = i;
      break;
    }
  }

  const existingLines = lines.slice(sectionIndex + 1, sectionEnd);
  const replacementTimes = new Set(
    timingLines.map(line => getTimingLineTime(line))
  );

  const keptLines = [];

  for (const line of existingLines) {
    if (
      isGreenTimingLine(line) &&
      replacementTimes.has(getTimingLineTime(line))
    ) {
      warnings.push({
        key: "existingGreenLineOverwritten",
        time: getTimingLineTime(line)
      });
      continue;
    }

    keptLines.push(line);
  }

  const combined = [
    ...keptLines,
    ...timingLines
  ];

  combined.sort((a, b) => {
    const ta = parseFloat(a.split(",")[0]);
    const tb = parseFloat(b.split(",")[0]);

    return ta - tb;
  });

  const result = [
    ...lines.slice(0, sectionIndex + 1),
    ...combined,
    ...lines.slice(sectionEnd)
  ];

  return {
    text: result.join(newline),
    warnings
  };
}