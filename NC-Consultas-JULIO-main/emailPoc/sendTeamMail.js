const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const fs = require("fs");
let token = process.env.TOKEN;
const brevo = require("@getbrevo/brevo");
async function getTeams() {
  let body = "";

  // Configuracion de brevo
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_NC
  );

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Asignación de equipo";

  sendSmtpEmail.htmlContent = `<h1>Hello world</><br><br><p>Pruebita</>`;
  sendSmtpEmail.sender = {
    name: "No Country",
    email: "no-reply@nocountry.io",
  };

  try {
    console.log(token);
    const res = await axios.get(`${process.env.LOCALHOST}teams/normalized`, {
      headers: { token: `Bearer ${token}` },
    });

    let teams = res.data.teams;

    // console.log(teams);
    console.log(teams.length);
    // return;
    for (const team of teams) {
      body = "";
      sendSmtpEmail.to = [];
      const instancia =
        (team.instancia === "C" ? "Cohorte " : "Seleccionado ") + team.numero;

      (sendSmtpEmail.to = team.members.map((member) => ({
        email: member.email,
        name: member.fullname,
      }))),
        (sendSmtpEmail.bbc = [
          { email: "julio@nocountry.io", name: "Julio Otero" },
        ]);
      sendSmtpEmail.subject = `Asignación de Equipo ${team.name} 👩‍💻👨‍💻`;

      // console.log(sendSmtpEmail.to);
      sendSmtpEmail.htmlContent = `
                <html>
                <body>
                    <p1>Hola Junior! 😎<br>Bienvenid@s al ${instancia} 💙! <br>A continuación podras encontrar la información de tu equipo durante las siguientes 5 semanas. </p1>
                    <br><br><p1><b>Nombre del equipo: ${team.name}</b></p1>
                    <br><p1><b>Vertical tecnologica: ${team.vertical}</b></p1>
                    <br><br>
                    <p1><b>Coequipers</b></p1>
                    <ul>
                     <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Area</th>
                        <th>País</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${team.members
                        .map(
                          (member) => `
                        <tr>
                          <td>${member.fullname}</td>
                          <td>${member.email}</td>
                          <td>${member.area}</td>
                          <td>${member.country}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                  </ul>
                  <br><p1><b>Team Leader</b></p1>
                  <br><ul><li>Se les asignara un Team Leader durante la semana 0</li><li>Link de Reunión con el TL ${
                    team.meet
                  }</li></ul>
                  <br><p1><b>Repositorio</b></p1>
                  <br><ul><li>Deberan crearlo dentro de nuestra organización de <a href="https://github.com/No-Country-simulation">GitHub</a></li>
                  <li>Debera tener el mismo nombre del Equipo</li></ul>
                  <br><p1><b>INFORMACION IMPORTANTE 👉 </b> Leer <a href="https://nocountryteam.notion.site/12ee6c6a1de98009af32c316d0b7f704?v=12ee6c6a1de981bbabf4000c02b8fb50&pvs=4">Reglamento y Guias</a></p1>
                  <p>
                  <p>La simulación laboral se llevará a cabo en Slack. A continuación, encontrarás el enlace al canal de Slack del equipo:</p>
                  <p>👉 <a href="https://app.slack.com/client/T02KS88FB0E/${
                    team.channelId
                  }">Canal de Slack del equipo ${team.name}</a></p>
                  
                                 

                <b><br>Evidenciando el valor de los juniors.<b>
                <br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>;
                      <br><p style="color: gray; font-size: 0.9em;">
                    Este es un mail generado automáticamente, por favor no responder.
                  </p>
                </body>
                </html>
                `;
      //   }

      //   console.log(sendSmtpEmail.htmlContent);
      //   return;

      const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
      //   console.log(result);
      console.log(team.name + "  " + result.response.statusCode);

      for (let j = 0; j < 2000000000; j++) {}
      // return;
    }
  } catch (error) {
    console.log(error);
  }
}

getTeams();
