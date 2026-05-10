// i18n.js

const i18n = {
  en: {
    subtitle: "osu! gimmick generation tool",

    selectFile: "Select file",
    selectOsu: "Select .osu",
    noFileSelected: "No file selected",
    noFileLoaded: "No file loaded.",

    enableSuffix: "Add suffix to difficulty name",
    suffixPlaceholder: "e.g. gimmick, edit, v2",
    tabBasic: "Basic",

    convertDownload: "Convert & Download",

    loaded: "Loaded",
    readyToConvert: "Ready to convert.",
    input: "Input",
    output: "Output",
    summary: "Summary",
    warnings: "Warnings",

    noopCompleted: "Test transform completed.",
    noopNotChanged: "The file content was not changed except common options.",

    error: "Error",
    invalidFile: "Please select a .osu file.",

    tabDetachBarline: "Detach Barline",
    detachBarlineTitle: "Detach Barline",
    noteSv: "Note SV",
    barlineSv: "Barline SV",
    noteVolume: "Note volume",
    barlineVolume: "Barline volume",
    noteKiai: "Note kiai",
    barlineKiai: "Barline kiai",
    kiaiInherit: "Inherit",
    kiaiOn: "ON",
    kiaiOff: "OFF",
    detachBarlineDescription: "Moves hit objects on the barline to +1 ms, then adds separate SV lines for the object position and the barline position.",
    svEmptyInherit: "Leave empty to inherit",
    volumeEmptyInherit: "Leave empty to inherit",

    barlineTimes: "Barline times",
    suffixLabel: "Difficulty name suffix",
    noteSide: "Note side",
    barlineSide: "Barline side",
    barlineTimesPlaceholder: "e.g. 01:23:456 -",
    svPlaceholder: "SV (inherit if empty)",
    volumePlaceholder: "volume (inherit if empty)",

    barlineCount: "Barline count",
    movedNotes: "Moved notes",
    insertedGreenLines: "Inserted green lines",
    existingGreenLineOverwritten: "Existing green line was overwritten",
    suffixAdded: "Suffix added to difficulty name",

    noBarlineTimes: "No barline times were entered.",
    invalidSvValue: "SV must be greater than 0.",
    invalidVolumeValue: "volume must be between 0 and 100.",

    previewLog: "Preview log",
    previewTransform: "Preview",
    downloadTransformedFile: "Download",

    details: "Details",
    movedObjects: "Moved HitObjects",
    type: "Type",
    timeMove: "Time",

    basicDescription: "Select a transform tab, configure options, then preview and download the result.",
  },

  ja: {
    subtitle: "osu! gimmick 生成ツール",

    selectFile: "ファイルを選択",
    selectOsu: ".osu を選択",
    noFileSelected: "ファイルが選択されていません",
    noFileLoaded: "ファイルが読み込まれていません。",

    enableSuffix: "難易度名に suffix を追加する",
    suffixPlaceholder: "例: gimmick, edit, v2",
    tabBasic: "基本",

    convertDownload: "変換してダウンロード",

    loaded: "読み込み完了",
    readyToConvert: "変換準備完了",
    input: "入力",
    output: "出力",
    summary: "概要",
    warnings: "警告",

    noopCompleted: "テスト変換が完了しました。",
    noopNotChanged: "共通オプション以外のファイル内容は変更されていません。",

    error: "エラー",
    invalidFile: ".osu ファイルを選択してください。",

    tabDetachBarline: "小節線の分離",
    detachBarlineTitle: "小節線の分離",
    noteSv: "ノーツ側 SV",
    barlineSv: "小節線側 SV",
    noteVolume: "ノーツ側 volume",
    barlineVolume: "小節線側 volume",
    noteKiai: "ノーツ側 kiai",
    barlineKiai: "小節線側 kiai",
    kiaiInherit: "継承",
    kiaiOn: "ON",
    kiaiOff: "OFF",
    detachBarlineDescription: "小節線上の HitObject を +1 ms へ移動し、オブジェクト位置と小節線位置にそれぞれ新しい SV line を設定します。",
    svEmptyInherit: "空欄の場合は継承",
    volumeEmptyInherit: "空欄の場合は継承",

    barlineTimes: "小節線の時刻",
    suffixLabel: "難易度名 suffix",
    noteSide: "ノーツ側",
    barlineSide: "小節線側",
    barlineTimesPlaceholder: "例: 01:23:456 -",
    svPlaceholder: "SV（空欄で継承）",
    volumePlaceholder: "volume（空欄で継承）",

    barlineCount: "小節線数",
    movedNotes: "移動したノーツ数",
    insertedGreenLines: "追加した緑線数",
    existingGreenLineOverwritten: "既存の緑線を上書きしました",
    suffixAdded: "難易度名 suffix を追加しました",

    noBarlineTimes: "小節線の時刻が入力されていません。",
    invalidSvValue: "SV は 0 より大きい値にしてください。",
    invalidVolumeValue: "volume は 0〜100 の範囲にしてください。",

    previewLog: "プレビュー結果",
    previewTransform: "プレビュー",
    downloadTransformedFile: "ダウンロード",

    details: "詳細",
    movedObjects: "移動した HitObject",
    type: "種類",
    timeMove: "時刻",

    basicDescription: "変換タブを選び、設定を入力してから、プレビューとダウンロードを行います。",
  }
};

window.i18n = i18n;