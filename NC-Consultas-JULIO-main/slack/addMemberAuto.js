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
const reader = require("xlsx");
let token = process.env.TOKEN;

//const member = "U03FBQMBSJG" //julioignaciootero
// const noCountrySupport = "U055W8NBQ2F"; //No Country Support
// const noCountry = "U055W8NBQ2F"; //No Country Support

let output = [];
let userids = [];
const path = "C:/Users/julio/OneDrive/Escritorio/slackuserid.xlsx";
const file = reader.readFile(path);
const sheets = file.SheetNames;
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    userids.push(res);
  });
}

let canales = [];
const pathCanal = "C:/Users/julio/OneDrive/Escritorio/chanel y nombre.xlsx";
const fileCanal = reader.readFile(pathCanal);
const sheetsCanal = fileCanal.SheetNames;
for (let i = 0; i < sheetsCanal.length; i++) {
  const tempCanal = reader.utils.sheet_to_json(
    fileCanal.Sheets[fileCanal.SheetNames[i]]
  );
  tempCanal.forEach((res) => {
    canales.push(res);
  });
}

console.log(userids.length);
console.log(canales.length);
let usuarios = [];
async function getTeams() {
  try {
    const res = await axios.get(`${process.env.LOCALHOST}teams/actualfull`, {
      headers: { token: `Bearer ${token}` },
    });

    const allTeams = res.data.getActualFullTeams;
    console.log(allTeams.length);
    // for (const element of allTeams) {
    //   console.log(element.name);
    // }

    // return;
    for (const team of allTeams) {
      console.log("Procesando : " + team.name.toLowerCase());
      // creo el canal de Slack
      // const channelId = canales.find(
      //   (c) => c.name.toLowerCase() == team.name.toLowerCase()
      // );

      if (team.channelId) {
        //   //agrego a julio ignacio
        usuarios = [];
        console.log(`${team.name.toLowerCase()};${team.channelId}`);

        team.members.forEach((member) => {
          // const encontrado = userids.find(
          //   (u) => u.email.toLowerCase() == member.email.toLowerCase()
          // );

          if (member.slack) {
            usuarios.push(member.slack);
          } else {
            console.log("NO ENCONTRADO MIEMBRO");
          }
        });

        const agregar = usuarios.join(",");
        console.log(agregar);
        // const usuarios = `${process.env.NOCOUNTRY_ID},${process.env.NOCOUNTRYSUPPORT_ID}`;
        // console.log(usuarios);
        await addMemberToChannel(team.channelId, agregar);

        setTimeout(() => {
          // console.log("Han pasado 2 segundos.");
        }, 5000);
        // return;
      } else {
        console.log("No encontrado : " + team.name.toLowerCase());
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
      force: true,
    });
    console.log(`User ${userId} added to channel ${channelId}`);
  } catch (error) {
    console.error(`Error adding user to channel: ${error}`);
  }
}

getTeams();
