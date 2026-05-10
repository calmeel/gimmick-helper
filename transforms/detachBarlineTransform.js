function runDetachBarlineTransform(text, options = {}) {
  const warnings = [];

  const barlineTimes = parseBarlineTimes(
    options.barlineTimesText
  );

  if (!barlineTimes.length) {
    warnings.push({
      key: "noBarlineTimes"
    });

    return {
      text,
      summary: [],
      warnings
    };
  }

  if (options.noteSv != null && options.noteSv <= 0) {
    warnings.push({ key: "invalidSvValue" });
  }

  if (options.barlineSv != null && options.barlineSv <= 0) {
    warnings.push({ key: "invalidSvValue" });
  }

  if (
    options.noteVolume != null &&
    (options.noteVolume < 0 || options.noteVolume > 100)
  ) {
    warnings.push({ key: "invalidVolumeValue" });
  }

  if (
    options.barlineVolume != null &&
    (options.barlineVolume < 0 || options.barlineVolume > 100)
  ) {
    warnings.push({ key: "invalidVolumeValue" });
  }

  if (warnings.length) {
    return {
      text,
      summary: [],
      warnings
    };
  }

  const hitObjects = parseDetachableHitObjects(text);

  const replacements = [];
  const movedNotes = [];
  const timingLines = [];

  for (const barlineTime of barlineTimes) {
    const fallbackState =
      getActiveTimingPointStateAt(
        text,
        barlineTime
      );

    const targetTime = barlineTime + 1;

  for (const barlineTime of barlineTimes) {
    const targetTime = barlineTime + 1;

    const matchedObjects = hitObjects.filter(object => {
      const diff = object.time - barlineTime;
      return diff >= -1 && diff <= 1;
    });

    if (!matchedObjects.length) {
      warnings.push({
        key: "noObjectNearBarline",
        time: barlineTime
      });

      continue;
    }

    const fallbackState =
      getActiveTimingPointStateAt(
        text,
        barlineTime
      );

    timingLines.push(
      createGreenLine({
        time: barlineTime,
        sv: options.barlineSv,
        volume: options.barlineVolume,
        kiai: options.barlineKiai,
        fallbackState
      })
    );

    timingLines.push(
      createGreenLine({
        time: targetTime,
        sv: options.noteSv,
        volume: options.noteVolume,
        kiai: options.noteKiai,
        fallbackState
      })
    );

    for (const object of matchedObjects) {
      const diff = object.time - barlineTime;

      const newParts = [...object.parts];
      newParts[2] = String(targetTime);

      const newLine = newParts.join(",");

      replacements.push({
        objectIndex: object.index,
        originalLine: object.line,
        newLine
      });

      movedNotes.push({
        originalTime: object.time,
        targetTime,
        diff,
        objectType: object.objectType
      });
    }
  }
  }

  let rewrittenText = replaceHitObjectLines(
    text,
    replacements
  );

  const timingResult = insertOrReplaceTimingPoints(
    rewrittenText,
    timingLines
  );

  rewrittenText = timingResult.text;

  const summary = [];

  summary.push({
    key: "barlineCount",
    value: barlineTimes.length
  });

  summary.push({
    key: "movedNotes",
    value: movedNotes.length
  });

  summary.push({
    key: "insertedGreenLines",
    value: timingLines.length
  });

  if (movedNotes.length) {
    summary.push("");

    for (const item of movedNotes) {
      summary.push(
        `${item.originalTime} → ${item.targetTime} (${item.objectType}, diff ${item.diff})`
      );
    }
  }

  return {
    text: rewrittenText,
    summary,
    warnings: [
      ...warnings,
      ...(timingResult.warnings ?? [])
    ],
    details: {
      movedObjects: movedNotes
    }
  };
}