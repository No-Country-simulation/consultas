const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
//Slack auth
// Your OAuth token
const { WebClient } = require("@slack/web-api");
const slackToken = process.env.TOKEN_NC_SLACK;
const web = new WebClient(slackToken);
const path = "C:/Users/julio/OneDrive/Escritorio/slackuserid.xlsx";
//configuraciones generales
const reader = require("xlsx");
const axios = require("axios");
// const fs = require("fs");

const { channel } = require("diagnostics_channel");
const { ok } = require("assert");

const file = reader.readFile(path);
const sheets = file.SheetNames;
let userids = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    userids.push(res);
  });
}

console.log(userids.length);
// console.log(userids);
// return;
let token = process.env.TOKEN;
let user = {};
let notFound = [];
async function getTeams() {
  let count = 0;
  let output = [];
  try {
    const res = await axios.get(`${process.env.LOCALHOST}teams/actualfull`, {
      headers: { token: `Bearer ${token}` },
    });

    const allTeams = res.data.getActualFullTeams;

    for (const team of allTeams) {
      // console.info("Procesando : " + team.name);
      for (const member of team.members) {
        const userid = userids.find(
          (u) => u.email.toLowerCase() == member.email.toLowerCase()
        );

        if (userid) {
          output.push(`${member.email.toLowerCase()};${userid.userid}`);
          // console.log(`${member.email.toLowerCase()};${userid.userid}`);
        } else {
          console.log("No existe");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (output.length > 0) {
    let fullnamesWithSpace = output.join("\n");
    fs.writeFileSync("usuarios de slack.txt", fullnamesWithSpace);
  }
}

// Function to look up a user by email
async function lookupUserByEmail(email) {
  try {
    const response = await web.users.lookupByEmail({ email });
    return (user = {
      ok: true,
      id: response.user.id,
    });
  } catch (error) {
    notFound.push(email);
    return (user = {
      ok: false,
      id: "NOT FOUND",
    });
  }
}

getTeams();

function esperar(ms) {
  console.log("LOADING BUFFER ::::::::::");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
