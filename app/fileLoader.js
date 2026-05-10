async function loadOsuFile(file) {
  if (!file) {
    throw new Error("No file selected.");
  }

  if (!file.name.toLowerCase().endsWith(".osu")) {
    throw new Error("Please select a .osu file.");
  }

  const text = await file.text();

  return {
    file,
    fileName: file.name,
    text
  };
}