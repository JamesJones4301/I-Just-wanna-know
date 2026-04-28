const SHEET_ID = '1prpf4EtoP9DrHiyb7Izr2pS7YML2HacfrBQxk8pARkk';
const SHEET_NAME = 'Responses';

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'I Just Wanna Know API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const sheet = getResponseSheet();

    sheet.appendRow([
      new Date(),
      clean(payload.fullName),
      clean(payload.email),
      clean(payload.favoriteColor),
      clean(payload.savorySnack),
      clean(payload.likesCarrots),
      clean(payload.favoriteDrink),
      clean(payload.favoriteNonSavorySnack),
      clean(payload.babyToothStory),
      clean(payload.favoriteHeroCharacter),
      clean(payload.source)
    ]);

    return jsonResponse({ status: 'success' });
  } catch (error) {
    return jsonResponse({ status: 'error', message: error.message });
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }

  return JSON.parse(e.postData.contents);
}

function getResponseSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaders(sheet);
  return sheet;
}

function ensureHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Name',
    'Email',
    'Favorite Color',
    'Savory Snack',
    'Likes Carrots',
    'Favorite Drink',
    'Favorite Non-Savory Snack',
    'Craziest Way Lost Baby Tooth',
    'Favorite Hero or Character',
    'Source'
  ];

  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(value => String(value).trim() !== '');

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function clean(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
