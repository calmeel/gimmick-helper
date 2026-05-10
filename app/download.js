function downloadTextFile(fileName, text) {
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function createOutputFileName(fileName, suffix = "gimmick helper") {
  const match = fileName.match(/^(.*?)(\.osu)$/i);

  if (!match) {
    return `${fileName} (${suffix}).osu`;
  }

  return `${match[1]} (${suffix})${match[2]}`;
}