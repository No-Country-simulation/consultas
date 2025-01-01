const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "C:/Users/julio/OneDrive/Escritorio/repos.xlsx";

let teams = [];
const file = reader.readFile(path);
const sheets = file.SheetNames;
let data = [];
const url = "https://github.com/No-Country-simulation/";

// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

// console.log(data.length);
// console.log(data);

async function getTeams() {
  const res = await axios.get(`${process.env.LOCALHOST}teams`, {
    headers: { token: `Bearer ${process.env.TOKEN}` },
  });

  return res.data.getAllTeams;
}

async function putRepos() {
  let repoUrl = "";
  try {
    teams = await getTeams();
    console.log(teams.length);
    for (let i = 0; i < data.length; i++) {
      // for (let i = 0; i < 2; i++) {
      let reposArray = [];
      const team = teams.find(
        (t) => t.name.toLowerCase() == data[i].team.toLowerCase()
      );
      if (team) {
        if (data[i].repo != "no existe" && data[i].repo != "noimporta") {
          const repositorios = data[i].repo.split(",");

          for (let i = 0; i < repositorios.length; i++) {
            if (repositorios[i].includes("https://github.com")) {
              reposArray.push({ repo: repositorios[i] });
            } else {
              reposArray.push({ repo: url + repositorios[i] });
            }
          }

          // repoUrl = url + data[i].repo
        } else {
          repoUrl = "";
        }
        if (reposArray.length > 0) {
          const res = await axios.put(
            `${process.env.LOCALHOST}teams/addinfo/${team._id}`,
            {
              repositoryList: reposArray,
            },

            {
              headers: { token: `Bearer ${process.env.TOKEN}` },
            }
          );
          // console.log("Equipo: ", team.name, " Procesado OK", res.status);
          console.log("Equipo: ", team.name, " Procesado OK");
          // return;
        }
      } else {
        console.log("No encontrado : " + data[i].team.toLowerCase());
      }
    }
  } catch (error) {
    console.error(error);
  }
}

putRepos();
