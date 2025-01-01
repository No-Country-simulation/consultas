const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
// const pathTl = "C:/Users/julio/OneDrive/Escritorio/C9 tl.xlsx";
// const pathTl = ""C:\Users\Administrator\Desktop\tl.xlsx"
// const pathTl = "C:/Users/Administrator/Desktop/tl.xlsx";
const pathTl = "C:/Users/julio/OneDrive/Escritorio/tls.xlsx";

const file = reader.readFile(pathTl);
const sheets = file.SheetNames;
let dataTl = [];
let token = process.env.TOKEN;
// console.log(file);
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    res.team = res.team.toLowerCase();
    res.email = res.email.toLowerCase();
    dataTl.push(res);
  });
}

// console.log(dataTl);
// return;
async function proccessTeamLeaders() {
  let teams = [];
  let members = [];
  let teamLeaders = [];
  teams = await getTeams();

  members = await getMembers();
  teamLeaders = await matchTeamLeaders(teams, members);
  console.log(teamLeaders);
  await addTeamLeader(teamLeaders);
  // console.log(teams.length)
  //   console.log(members);
}

async function getTeams() {
  let output = [];

  try {
    const res = await axios.get(`${process.env.LOCALHOST}teams`, {
      headers: { token: `Bearer ${token}` },
    });
    teams = res.data.getAllTeams;

    teams.forEach((team) => {
      output.push({
        _id: team._id,
        name: team.name.toLowerCase(),
      });
    });

    return output;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function matchTeamLeaders(teams, members) {
  let output = [];

  dataTl.forEach((data) => {
    if (data.team && data.email) {
      console.log(data.team + data.email);
      const team = teams.find(
        (t) => t.name.toLowerCase() == data.team.toLowerCase()
      );

      const member = members.find(
        (m) => m.email.toLowerCase() == data.email.toLowerCase()
      );

      if (team && member)
        output.push({
          team: team.name,
          teamId: team._id,
          memberId: member._id,
        });
    }
  });

  return output;
}

async function getMembers() {
  let output = [];

  try {
    const res = await axios.get(`${process.env.LOCALHOST}members`, {
      headers: { token: `Bearer ${token}` },
    });
    members = res.data.getAllMembers;

    members.forEach((member) => {
      output.push({
        _id: member._id,
        email: member.email.toLowerCase(),
      });
    });

    return output;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function addTeamLeader(teamLeaders) {
  for (const tl of teamLeaders) {
    try {
      const res = await axios.put(
        `${process.env.LOCALHOST}teams/addteamleader/${tl.teamId}/${tl.memberId}`,
        {},

        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log("Equipo: ", tl.team, " Procesado ", res.status);
    } catch (error) {
      console.log("Equipo: ", tl.team, " ERROR", error.response.status);
    }
  }
}

proccessTeamLeaders();
