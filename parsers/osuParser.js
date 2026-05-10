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

function parseHitObjects(text) {
  const lines = getSectionLines(text, "HitObjects");

  return lines
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("//"));
}