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
const channelId = "C07RR5RL925";
async function postMessage() {
  try {
    // Call the chat.postMessage method using the WebClient
    let result = await web.chat.postMessage({
      channel: channelId,
      // text: "<@U055W8NBQ2F> prueba canla",
      text: "<!channel> prueba canla",
      username: "Botcito",
    });

    console.log(result);

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

async function pinMessage() {
  try {
    // Call the chat.postMessage method using the WebClient
    const result = await web.pins.add({
      channel: channelId,
      timestamp: "1728586138.585409",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

postMessage();
// pinMessage();

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
