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

const path = "C:/Users/julio/OneDrive/Escritorio/meets.xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let meets = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    meets.push(res);
  });
}

// console.log(meets);

async function setMeet() {
  try {
    for (const meet of meets) {
      const res = await axios.put(
        `${process.env.LOCALHOST}teams/meet/${meet.team}`,
        { meet: meet.meet },
        {
          headers: { token: `Bearer ${process.env.TOKEN}` },
        }
      );
      console.log(meet.team + " - " + res.status);
    }
  } catch (error) {
    console.log(error);
  }
}
setMeet();
