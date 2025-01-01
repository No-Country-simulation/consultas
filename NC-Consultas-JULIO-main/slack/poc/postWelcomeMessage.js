const dotenv = require("dotenv");
dotenv.config();
//Slack auth
// Your OAuth token
const { WebClient } = require("@slack/web-api");
const slackToken = process.env.TOKEN_NC_SLACK;
const web = new WebClient(slackToken);

//configuraciones generales
const axios = require("axios");
const fs = require("fs");

const { channel } = require("diagnostics_channel");

let token = process.env.TOKEN;
// const channelId = "C07RR5RL925";

//Armado de mensaje
const bienvenida = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "<!channel> *INFORMACION DEL EQUIPO*", // Mensaje de bienvenida en negritas
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Bienvenid@s a su canal de equipo, este sera su espacio de trabajo durante las siguientes 5 semanas.`, // Lista con bullets generada dinámicamente
    },
  },
];

const final = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Repositorio:* \n\n\t• Deberan crearlo dentro de nuestra organización de <https://github.com/No-Country-simulation|GitHub> \n\t• Debera tener el mismo nombre del equipo ", // Mensaje de bienvenida en negritas
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `\n*INFORMACION IMPORTANTE* :point_right: Leer <https://nocountryteam.notion.site/12ee6c6a1de98009af32c316d0b7f704?v=12ee6c6a1de981bbabf4000c02b8fb50&pvs=4|Reglamento y Guias>`, // Lista con bullets generada dinámicamente
    },
  },
];

async function postMessage() {
  try {
    let mensaje = "";
    let blocks = [];
    let elements = [];
    const res = await axios.get(`${process.env.LOCALHOST}teams/normalized`, {
      headers: { token: `Bearer ${token}` },
    });

    const allTeams = res.data.teams;
    // console.log(allTeams);
    // return;
    for (const team of allTeams) {
      if (team.name.startsWith("S19")) {
        mensaje = "";
        blocks = [];
        elements = [];

        console.log(team.name + team.channelId);

        // mensaje = `Bienvenido al canal del equipo ${team.name}`;
        const integrantesFormatted = team.members
          .map(
            (member) =>
              `\t• <@${member.slack}> - ${member.area} | ${member.email} | ${member.country}`
          )
          .join("\n");

        blocks.push(...bienvenida);
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Nombre del equipo: ${team.name}*\n*Vertical Tecnologica del Proyecto:* ${team.vertical}`, // Mensaje de bienvenida en negritas
          },
        });
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Coequipers:*\n\n${integrantesFormatted}`, // Lista con bullets generada dinámicamente
          },
        });

        if (team.meet) {
          blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Team Leader:* \n\n\t• Se les asignara un Team Leader durante la Semana 0 \n\t• Link de Reunión con TL: ${team.meet}`, // Lista con bullets generada dinámicamente
            },
          });
        } else {
          blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Team Leader:* \n\n\t• Se les asignara un Team Leader durante la Semana 0`, // Lista con bullets generada dinámicamente
            },
          });
        }

        blocks.push(...final);

        let result = await web.chat.postMessage({
          channel: team.channelId,
          text: "<!channel>",
          blocks: blocks,
          username: "Botcito",
        });

        await pinMessage(team.channelId, result.ts);
      }
    }

    // Call the chat.postMessage method using the WebClient

    // console.log(result);

    // result = await web.chat.postMessage({
    //   channel: channelId,
    //   text: "@channel Hola",
    //   username: "Botcito",
    // });

    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function pinMessage(canal, tmsp) {
  try {
    // Call the chat.postMessage method using the WebClient
    const result = await web.pins.add({
      channel: canal,
      timestamp: tmsp,
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

postMessage();

// {
//     ok: true,
//     channel: 'C07RR5RL925',
//     ts: '1728585953.971399',
//     message: {
//       user: 'U07N0A74YDP',
//       type: 'message',
//       ts: '1728585953.971399',
//       bot_id: 'B07MMGTJB35',
//       app_id: 'A07MAMPFM6G',
//       text: 'Voy a pinear este mensaje',
//       team: 'T02KS88FB0E',
//       bot_profile: {
//         id: 'B07MMGTJB35',
//         app_id: 'A07MAMPFM6G',
//         name: 'No Country bot',
//         icons: [Object],
//         deleted: false,
//         updated: 1726506386,
//         team_id: 'T02KS88FB0E'
//       },
//       blocks: [ [Object] ]
//     },
//     response_metadata: {
//       scopes: [
//         'channels:join',
//         'channels:manage',
//         'channels:read',
//         'groups:read',
//         'groups:write',
//         'users:read',
//         'users:read.email',
//         'chat:write'
//       ],
//       acceptedScopes: [ 'chat:write' ]
//     }
//   }
