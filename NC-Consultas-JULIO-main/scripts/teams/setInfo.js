const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
// const pathTl = "C:/Users/julio/OneDrive/Escritorio/C9 tl.xlsx";
const path = "C:/Users/julio/OneDrive/Escritorio/info.xlsx";

const mailToken = "gtbsvxllxphhfoqh";
// const mailToken = "AIzaSyCDr3AMywVebkUJS74yleRvooLL4E5k5XA";
const nodemailer = require("nodemailer");
const file = reader.readFile(path);
const sheets = file.SheetNames;
let data = [];
let token = process.env.TOKEN;
// console.log(file);
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    res.equipo = res.equipo.toLowerCase();
    data.push(res);
  });
}

let info = [];
// console.log(data);

async function processTeamInfo() {
  let teams = [];

  teams = await getTeams();
  console.log(teams.length);

  data.forEach((d) => {
    const equipo = teams.find(
      (t) => t.name.toLowerCase() == d.equipo.toLowerCase()
    );

    if (equipo) {
      info.push({
        _id: equipo._id,
        repository: d.github,
        video: d.video,
        deploy: d.deploy,
        figma: d.figma,
        type: d.tipo,
      });
    } else {
      console.log("NOOOOOO" + d.equipo);
    }
  });

  await addInfo(info);
}

async function getTeams() {
  try {
    const res = await axios.get(
      `http://${process.env.LOCALHOST}:5000/api/teams`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    const allTeams = res.data.getAllTeams;

    return allTeams;
  } catch (error) {
    console.log(error);
  }
}

async function addInfo(info) {
  for (const i of info) {
    try {
      const res = await axios.put(
        `http://${process.env.LOCALHOST}:5000/api/teams/addinfo/${i._id}`,
        {
          repository: i.repository,
          github: i.github,
          video: i.video,
          deploy: i.deploy,
          figma: i.figma,
          type: i.type,
        },

        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log("Equipo: ", i.team, " Procesado ", res.status);
    } catch (error) {
      console.log("Equipo: ", i.team, " ERROR", error.response.status);
    }
  }
}

processTeamInfo();
