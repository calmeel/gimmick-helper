function runTransformForFile(source, transformFn, options = {}) {
  const result = transformFn(source.text, options);

  const suffix = options.enableSuffix
    ? normalizeSuffix(options.suffix)
    : "";

  const finalText = suffix
    ? applyDifficultySuffixToText(result.text, suffix)
    : result.text;

  const outputFileName = suffix
    ? createOutputFileNameWithDifficultySuffix(source.fileName, suffix)
    : source.fileName;

  return {
    originalFileName: source.fileName,
    outputFileName,
    text: finalText,
    summary: [
      ...(result.summary ?? []),
      ...(suffix
        ? [{
            key: "suffixAdded",
            value: suffix
          }]
        : [])
    ],
    warnings: result.warnings ?? []
  };
}

function normalizeSuffix(suffix) {
  return String(suffix ?? "").trim();
}

function createOutputFileNameWithDifficultySuffix(fileName, suffix) {
  const match = fileName.match(/^(.*)\[([^\[\]]*)\](\.osu)$/i);

  if (!match) {
    return fileName.replace(/\.osu$/i, ` (${suffix}).osu`);
  }

  const before = match[1];
  const diffName = match[2].trim();
  const ext = match[3];

  return `${before}[${diffName} ${suffix}]${ext}`;
}

function applyDifficultySuffixToText(text, suffix) {
  const lines = text.split(/\r?\n/);
  const newline = text.includes("\r\n") ? "\r\n" : "\n";

  let inMetadata = false;
  let versionUpdated = false;

  const updatedLines = lines.map(line => {
    const trimmed = line.trim();

    if (trimmed === "[Metadata]") {
      inMetadata = true;
      return line;
    }

    if (inMetadata && trimmed.startsWith("[") && trimmed.endsWith("]")) {
      inMetadata = false;
      return line;
    }

    if (inMetadata && line.match(/^Version\s*:/)) {
      versionUpdated = true;

      const index = line.indexOf(":");
      const key = line.slice(0, index + 1);
      const value = line.slice(index + 1).trim();

      return `${key}${value} ${suffix}`;
    }

    return line;
  });

  if (!versionUpdated) {
    return text;
  }

  return updatedLines.join(newline);
}