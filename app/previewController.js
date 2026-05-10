function setupPreviewController(context) {
  let lastTransformResult = null;

  function clearPreview() {
    lastTransformResult = null;

    if (context.downloadButton) {
      context.downloadButton.disabled = true;
    }
  }

  function preview() {
    const currentSource = context.getCurrentSource();

    if (!currentSource) {
      renderMessage(context.output, context.t("noFileLoaded"));
      return;
    }

    const selected = getSelectedTransform(context.dom);
    const suffix = context.dom.suffixInput?.value ?? "";

    lastTransformResult = runTransformForFile(
      currentSource,
      selected.fn,
      {
        ...selected.options,
        enableSuffix: suffix.trim().length > 0,
        suffix
      }
    );

    renderTransformResult(
      context.output,
      lastTransformResult,
      context.t
    );

    if (context.downloadButton) {
      context.downloadButton.disabled = false;
    }
  }

  function download() {
    if (!lastTransformResult) {
      renderMessage(context.output, context.t("noFileLoaded"));
      return;
    }

    downloadTextFile(
      lastTransformResult.outputFileName,
      lastTransformResult.text
    );
  }

  return {
    preview,
    download,
    clearPreview
  };
}