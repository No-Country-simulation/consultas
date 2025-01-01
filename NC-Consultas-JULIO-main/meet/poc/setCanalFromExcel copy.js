const dotenv = require("dotenv");
dotenv.config();
//Slack auth
// Your OAuth token
const { WebClient } = require("@slack/web-api");
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);

//configuraciones generales
const axios = require("axios");
const fs = require("fs");
const { channel } = require("diagnostics_channel");
const reader = require("xlsx");
let token = process.env.TOKEN;

const path = "C:/Users/julio/OneDrive/Escritorio/canales.xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let canales = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    canales.push(res);
  });
}

console.log(canales);
// return;
async function setMeet() {
  try {
    for (const canal of canales) {
      const res = await axios.put(
        `${process.env.LOCALHOST}teams/channelid/${canal.team}`,
        { channelId: canal.canal },
        {
          headers: { token: `Bearer ${process.env.TOKEN}` },
        }
      );
      console.log(canal.team + " - " + res.status);
    }
  } catch (error) {
    console.log(error);
  }
}
setMeet();
