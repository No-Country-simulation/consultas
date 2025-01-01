const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const SCOPES = [
  "https://www.googleapis.com/auth/admin.reports.audit.readonly",
  "https://www.googleapis.com/auth/calendar",
];
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
    maxResults: 100,
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
  summary: "Google I/O 2015",
  location: "Virtual",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2024-10-24T09:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: "2024-10-24T09:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  conferenceData: {
    createRequest: {
      requestId: "some-random-string", // Un ID único para evitar duplicados
    },
  },
};

const teams = [
  // "C22-01-n-webapp",
  // "C22-02-n-webapp",
  // "C22-03-n-webapp",
  // "C22-04-n-webapp",
  // "C22-05-n-webapp",
  // "C22-06-n-webapp",
  // "C22-07-n-webapp",
  // "C22-08-n-webapp",
  // "C22-09-m-webapp",
  // "C22-10-m-webapp",
  // "C22-11-m-webapp",
  // "C22-12-m-webapp",
  // "C22-13-m-webapp",
  // "C22-14-m-webapp",
  // "C22-15-m-webapp",
  // "C22-16-m-webapp",
  // "C22-17-m-webapp",
  // "C22-18-t-webapp",
  // "C22-19-t-webapp",
  // "C22-20-t-webapp",
  // "C22-21-t-webapp",
  // "C22-22-t-webapp",
  // "C22-23-t-webapp",
  // "C22-24-ft-webapp",
  // "C22-25-ft-webapp",
  // "C22-26-ft-webapp",
  // "C22-27-ft-webapp",
  // "C22-28-ft-webapp",
  // "C22-29-ft-data-bi",
  // "C22-30-m-data-bi",
  // "C22-31-m-data-bi",
  // "C22-32-m-data-bi",
  // "C22-33-n-data-bi",
  // "C22-34-n-data-bi",
  // "C22-35-n-data-bi",
  // "C22-36-n-data-bi",
  // "C22-37-n-data-bi",
  // "C22-37-t-data-bi",
  // "C22-38-t-data-bi",
  // "C22-39-ft-nocode",
  // "C22-40-m-nocode",
  // "C22-41-m-nocode",
  // "C22-42-n-nocode",
  // "C22-43-n-nocode",
  // "C22-44-n-nocode",
  // "C22-45-t-nocode",
  // "C22-46-t-nocode",
  // "C22-47-m-mobile",
  // "C22-48-n-mobile",
  // "C22-49-t-mobile",
  // // "C22-50-ft-mobile",
  // // "C22-51-m-webapp",
  // "C22-52-m-webapp",
  // "C22-53-m-webapp",
  // "C22-54-t-webapp",
  // "C22-55-n-webapp",
  // "C22-56-n-webapp",
  // "C22-57-n-webapp",
  // "C22-58-n-webapp",
  // "C22-59-ft-webapp",
  // "S19-01-m-data-bi",
  // "S19-02-n-data-bi",
  // "S19-03-t-data-bi",
  "S19-04-nocode",
  "S19-05-m-webapp",
  "S19-06-m-webapp",
  "S19-07-n-webapp",
  "S19-08-n-webapp",
  "S19-09-n-webapp",
  "S19-10-ft-webapp",
  "S19-11-t-webapp",
  "S19-12-n-webapp",
  "S19-13-ft-webapp",
  "S19-14-t-webapp",
  "S19-15-n-mobile",
];

async function createEvent(auth) {
  let meets = [];

  const calendar = google.calendar({ version: "v3", auth });

  for (const team of teams) {
    const event = {
      summary: team,
      location: "Virtual",
      description: `Reunion del equipo: ${team}`,
      start: {
        dateTime: "2024-11-11T05:00:00-07:00",
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: "2024-11-11T05:00:00-07:00",
        timeZone: "America/Argentina/Buenos_Aires",
      },
      conferenceData: {
        createRequest: {
          requestId: "some-random-string", // Un ID único para evitar duplicados
        },
      },
    };

    let res = await calendar.events.insert(
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

        meets.push(`${team};${event.data.conferenceData.entryPoints[0].uri}`);
        // console.log("Evento creado: %s", event.data.htmlLink);
        // console.log(
        //   "Enlace de Google Meet: %s",
        //   event.data.conferenceData.entryPoints[0].uri
        // );

        console.log(`${team};${event.data.conferenceData.entryPoints[0].uri}`);
      }
    );

    try {
    } catch (error) {
      console.log(error);
    }
  }

  if (meets.length > 0) {
    let fullnamesWithSpace = meets.join("\n");
    fs.writeFileSync("Meets 1-10.txt", fullnamesWithSpace);
  }
}
// authorize().then(listEvents).catch(console.error);
authorize().then(createEvent).catch(console.error);
