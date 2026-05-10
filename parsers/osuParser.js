function getSectionLines(text, sectionName) {
  const lines = text.split(/\r?\n/);
  const result = [];

  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === `[${sectionName}]`) {
      inSection = true;
      continue;
    }

    if (inSection && trimmed.startsWith("[") && trimmed.endsWith("]")) {
      break;
    }

    if (inSection) {
      result.push(line);
    }
  }

  return result;
}

function parseMode(text) {
  const lines = getSectionLines(text, "General");

  for (const line of lines) {
    const match = line.match(/^Mode\s*:\s*(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return 0;
}

function parseMetadata(text) {
  const lines = getSectionLines(text, "Metadata");
  const metadata = {};

  for (const line of lines) {
    const index = line.indexOf(":");
    if (index < 0) continue;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();

    metadata[key] = value;
  }

  return metadata;
}

function parseTimingPoints(text) {
  const lines = getSectionLines(text, "TimingPoints");
  const timingPoints = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("//")) continue;

    const parts = trimmed.split(",").map(p => p.trim());
    if (parts.length < 8) continue;

    timingPoints.push({
      time: Number(parts[0]),
      beatLength: Number(parts[1]),
      meter: Number(parts[2]),
      sampleSet: Number(parts[3]),
      sampleIndex: Number(parts[4]),
      volume: Number(parts[5]),
      uninherited: Number(parts[6]),
      effects: Number(parts[7]),
      raw: line
    });
  }

  return timingPoints;
}

function parseHitObjects(text) {
  const lines = getSectionLines(text, "HitObjects");

  return lines
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("//"));
}