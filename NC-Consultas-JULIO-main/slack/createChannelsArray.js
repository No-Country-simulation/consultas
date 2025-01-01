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

//COHORTEEEEEEEEEEEEEEE

const allTeams = [
  // "H3-01-klowhub",
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
  // "S19-01-m-data-bi",
  // "S19-02-n-data-bi",
  // "S19-03-t-data-bi",
  // "S19-04-nocode",
  // "S19-05-m-webapp",
  // "S19-06-m-webapp",
  // "S19-07-n-webapp",
  // "S19-08-n-webapp",
  // "S19-09-n-webapp",
  // "S19-10-ft-webapp",
  // "S19-11-t-webapp",
  // "S19-12-n-webapp",
  // "S19-13-ft-webapp",
  // "S19-14-t-webapp",
  // "S19-15-n-mobile",

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
  "C22-49-t-mobile",
  "C22-50-ft-mobile",
  "C22-51-m-webapp",
  "C22-52-m-webapp",
  "C22-53-m-webapp",
  "C22-54-t-webapp",
  "C22-55-n-webapp",
  "C22-56-n-webapp",
  "C22-57-n-webapp",
  "C22-58-n-webapp",
  "C22-59-ft-webapp",
];
const prefijo = "equipo-";
let output = [];
// return;
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

        const usuarios = `${process.env.NOCOUNTRY_ID},${process.env.NOCOUNTRYSUPPORT_ID}`;
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
