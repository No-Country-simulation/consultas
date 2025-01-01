const dotenv = require("dotenv");
dotenv.config();
//Slack auth
// Your OAuth token
const { WebClient } = require("@slack/web-api");
const slackToken = process.env.TOKEN_NC_SLACK_SEL;
const web = new WebClient(slackToken);

//configuraciones generales
const axios = require("axios");
const fs = require("fs");

const { channel } = require("diagnostics_channel");

let token = process.env.TOKEN;

//////////////////////////////////////////////////////////////////////////
// SELECCIONADO
// SELECCIONADO
// SELECCIONADO
// SELECCIONADO
//////////////////////////////////////////////////////////////////////////
const allTeams = [
  "H3-01-klowhub",
  // "H3-02-klowhub",
  // "H3-03-klowhub",
  // "H3-04-klowhub",
  // "H3-05-klowhub",
  // "H3-06-klowhub",
  // "H3-07-klowhub",
  // "H3-08-klowhub",
  // "H3-09-klowhub",
  // "H3-10-klowhub",
  // "H3-11-openlab",
  // "H3-12-openlab",
  // "H3-13-openlab",
  // "H3-14-bookie",
  // "H3-15-bookie",
  // "H3-16-bookie",
  // "H3-17-proptech",
  // "H3-18-proptech",
  // "H3-19-proptech",
  // "H3-20-proptech",
  // "H3-21-proptech",
  // "H3-22-proptech",
  // "H3-23-proptech",
  // "H3-24-proptech",
  // "H3-25-proptech",
  // "H3-26-proptech",
];
const prefijo = "equipo-";
let output = [];

async function getTeams() {
  try {
    for (const team of allTeams) {
      console.log("Crear el canal : " + team.toLowerCase());
      // creo el canal de Slack
      const channelId = await createChannel(prefijo + team.toLowerCase());
      // const channelId = "C07P9K4R4TG";
      if (channelId) {
        //   //agrego a julio ignacio

        output.push(`${team.toLowerCase()};${channelId}`);

        const usuarios = `${process.env.NOCOUNTRY_ID_SEL},${process.env.NOCOUNTRYSUPPORT_ID_SEL}`;
        console.log(usuarios);
        await addMemberToChannel(channelId, usuarios);
        // await addMemberToChannel(channelId, process.env.NOCOUNTRYSUPPORT_ID);

        //Agregar channel id

        const res = await axios.put(
          `${process.env.LOCALHOST}teams/channelid/${team}`,
          { channelId: channelId },
          {
            headers: { token: `Bearer ${process.env.TOKEN}` },
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (output.length > 0) {
    let fullnamesWithSpace = output.join("\n");
    fs.writeFileSync("Canales creados5.txt", fullnamesWithSpace);
  }
}

async function createChannel(channelName) {
  try {
    const result = await web.conversations.create({
      name: channelName,
      is_private: true,
    });

    console.log(`Channel created: ${result.channel.id}`);
    return result.channel.id;
  } catch (error) {
    // console.error(error);
    console.error(error.data);
  }
}

async function addMemberToChannel(channelId, userId) {
  try {
    // Use the conversations.invite method to add a user to the channel
    const result = await web.conversations.invite({
      channel: channelId,
      users: userId,
    });
    console.log(`User ${userId} added to channel ${channelId}`);
  } catch (error) {
    console.error(`Error adding user to channel: ${error}`);
  }
}

getTeams();
