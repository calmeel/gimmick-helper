function parseBarlineTimes(text) {
  if (!text) return [];

  return text
    .split(/\r?\n|,/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(parseBarlineTimeToken)
    .filter(time => !Number.isNaN(time))
    .sort((a, b) => a - b);
}

function parseBarlineTimeToken(token) {
  if (!token) return NaN;

  const cleaned = token
    .trim()
    .replace(/\s*-\s*.*$/, "");

  if (/^\d+$/.test(cleaned)) {
    return parseInt(cleaned, 10);
  }

  const match = cleaned.match(/^(\d+):(\d{2}):(\d{3})$/);

  if (!match) {
    return NaN;
  }

  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  const millis = parseInt(match[3], 10);

  return minutes * 60000 + seconds * 1000 + millis;
}