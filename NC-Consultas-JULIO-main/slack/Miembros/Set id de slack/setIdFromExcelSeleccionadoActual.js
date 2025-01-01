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

// const path = "C:/Users/julio/OneDrive/Escritorio/slack-seleccionado.xlsx";
const path = "C:/Users/julio/OneDrive/Escritorio/slackmembers.xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let slackMembers = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    slackMembers.push(res);
  });
}

let output = [];

console.log(slackMembers.length);

async function getMembers() {
  try {
    const res = await axios.get(`${process.env.LOCALHOST}selection/actual`, {
      headers: { token: `Bearer ${token}` },
    });
    const members = res.data.getActualMembers;

    console.log(members.length);
    // return;
    let i = 0;
    for (const member of members) {
      i++;
      const encontrado = slackMembers.find(
        (slack) => slack.email.toLowerCase() == member.email.toLowerCase()
      );
      if (encontrado) {
        console.log(i + " " + encontrado.email + " " + encontrado.userid);

        const upd = await axios.put(
          `${process.env.LOCALHOST}members/setslack`,
          {
            email: encontrado.email,
            slackSeleccionado: encontrado.userid,
          },

          {
            headers: { token: `Bearer ${process.env.TOKEN}` },
          }
        );
        // return;
      } else {
        // console.log(member.email); // + "  " + "NOT FOUND");
        console.log(member.email + "  " + "NOT FOUND");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

getMembers();
