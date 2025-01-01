const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const token = process.env.TOKEN;
const path = "C:/Users/julio/OneDrive/Escritorio/nocodecrear.xlsx";

let members = [];
let teams = [];

async function getMembers() {
  const res = await axios.get(`${process.env.LOCALHOST}members/actual`, {
    headers: { token: `Bearer ${token}` },
  });
  members = res.data.getActualMembers;
}

async function getActualMembers() {
  const res = await axios.get(`${process.env.LOCALHOST}teams/actual`, {
    headers: { token: `Bearer ${token}` },
  });
  teams = res.data.getActualTeams;
}

async function assignar() {
  try {
    await getMembers();
    await getActualMembers();

    //levanto el excel
    const file = reader.readFile(path);
    const sheets = file.SheetNames;
    let data = [];

    // console.log(file);
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        res.team = res.team;
        res.email = res.email.toLowerCase();
        data.push(res);
      });
    }

    console.log(data.length);
    console.log(members.length);
    console.log(teams.length);
    // console.log(data);
    // return;
    for (const d of data) {
      const member = members.find((m) => m.email == d.email);
      const team = teams.find((t) => t.name == d.team);

      if (member && team) {
        console.log(member.email + " " + team.name);
        //llamo a la api
        await axios.put(
          `${process.env.LOCALHOST}teams/asignar/${team._id}`, // (putMemberTeam)
          { members: member._id },
          {
            headers: { token: `Bearer ${token}` },
          }
        );
      } else {
        console.log("No se encontro ", d.email);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function Procesar() {
  await assignar();
}

Procesar();
