function runNoopTransform(text, options = {}) {
  return {
    text,
    summary: [
      "No-op transform completed.",
      "The file content was not changed."
    ],
    warnings: []
  };
}