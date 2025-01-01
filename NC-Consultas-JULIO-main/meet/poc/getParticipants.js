const { google } = require("googleapis");
const path = require("path");
// Configura las credenciales
const CREDENTIALS_PATH = path.join(process.cwd(), "/meet/poc/credentials.json");
const credentials = require(CREDENTIALS_PATH);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/admin.reports.audit.readonly"],
});

async function getMeetParticipants(meetingId) {
  const reports = google.admin({ version: "reports_v1", auth });

  try {
    const response = await reports.activities.list({
      userKey: "all", // Obtener datos para todos los usuarios
      applicationName: "meet", // Filtrar por la aplicación Meet
      //   startTime: "2023-12-22T09:00:00Z", // Fecha y hora de inicio de la reunión
      //   endTime: "2023-12-22T10:00:00Z", // Fecha y hora de fin de la reunión
      filters: `events.parameters.meeting_code eq "${meetingId}"`, // Filtrar por el ID de la reunión
    });

    const activities = response.data.items;
    const participants = [];

    activities.forEach((activity) => {
      if (activity.events) {
        activity.events.forEach((event) => {
          if (event.name === "join") {
            const participantEmail = event.parameters.find(
              (param) => param.name === "participant_email"
            )?.value;

            if (participantEmail && !participants.includes(participantEmail)) {
              participants.push(participantEmail);
            }
          }
        });
      }
    });

    console.log("Participantes:", participants);
  } catch (error) {
    console.error("Error al obtener los participantes:", error);
  }
}

// Reemplaza 'tu_meeting_id' con el ID de tu reunión
getMeetParticipants("odp-dijb-ehb");
