# Setup Guide

This setup gives you a backup app for users who have trouble opening the Google Form on iPhone.

The public flow is simple:

1. User opens the backup app link.
2. User completes the mobile form.
3. The app sends the response to Google Apps Script.
4. Google Apps Script writes the response to Google Sheets.

## Step 1, Create or open your response sheet

Use the same spreadsheet connected to your Google Form, or create a new Google Sheet.

Create a tab named:

```text
Responses
```

The script will add headers if the sheet is blank.

## Step 2, Copy your Google Sheet ID

Open the Google Sheet.

The URL will look like this:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

Copy only the ID between `/d/` and `/edit`.

## Step 3, Add the Apps Script backend

1. Open the Google Sheet.
2. Select Extensions.
3. Select Apps Script.
4. Delete any starter code.
5. Paste the contents of `google-apps-script/Code.gs`.
6. Replace this line:

```javascript
const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
```

with your real sheet ID.

## Step 4, Deploy the Apps Script web app

1. Select Deploy.
2. Select New deployment.
3. Select Web app.
4. Set Execute as to Me.
5. Set Who has access to Anyone.
6. Select Deploy.
7. Copy the Web app URL.

## Step 5, Add the web app URL to index.html

Open `index.html`.

Find this line:

```javascript
const SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace it with your Apps Script Web app URL.

## Step 6, Publish the backup app

Use GitHub Pages:

1. Open the GitHub repository.
2. Select Settings.
3. Select Pages.
4. Under Build and deployment, select Deploy from a branch.
5. Select branch `main`.
6. Select folder `/root`.
7. Save.

GitHub will give you a public website link.

## Step 7, Test on iPhone and Android

Test these items:

- Open the backup app link on iPhone Safari.
- Open the backup app link on Android Chrome.
- Submit one test response.
- Confirm the response appears in Google Sheets.
- Add the backup app link anywhere the Google Form link fails.

## Recommended public message

Use this message when you send the link:

```text
Please use this mobile form. It works on iPhone and Android and sends your request directly to our response sheet.
```

## Notes

Keep the original Google Form live. Use this app as the backup entry point when iPhone users have trouble with the form.
