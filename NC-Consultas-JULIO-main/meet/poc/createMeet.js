const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "/meet/poc/credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

const event = {
  summary: "Prueba Meet",
  // location: "Virtual",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2024-10-24T14:00:00-07:00",
    timeZone: "America/Argentina/Buenos_Aires",
  },
  end: {
    dateTime: "2024-10-24T14:30:00-07:00",
    timeZone: "America/Argentina/Buenos_Aires",
  },
  conferenceData: {
    createRequest: {
      requestId: "some-random-string", // Un ID único para evitar duplicados
    },
  },
  reminders: {
    useDefault: false, // Desactiva los recordatorios predeterminados
    overrides: [], // No se añaden recordatorios personalizados
  },
};

async function createEvent(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log(
        "Evento creado: %s",
        event.data.conferenceData.conferenceSolution.key
      );
      console.log(
        "Enlace de Google Meet: %s",
        event.data.conferenceData.entryPoints[0].uri
      );
    }
  );
}
// authorize().then(listEvents).catch(console.error);
authorize().then(createEvent).catch(console.error);
