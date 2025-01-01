const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "C:/Users/julio/OneDrive/Escritorio/reposviejos.xlsx";
let teams = [];
const file = reader.readFile(path);
const sheets = file.SheetNames;
let data = [];

// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

async function putRepos() {
  try {
    for (let index = 0; index < data.length; index++) {
      const res = await axios.put(
        `http://${process.env.LOCALHOST}:5000/api/teams/approved/${data[index].equipo}`,
        {
          approved: true,
        },

        {
          headers: { token: `Bearer ${process.env.TOKEN}` },
        }
      );

      console.log(index + " " + data[index].equipo + " " + res.status);
    }
  } catch (error) {
    console.log(error);
  }
}

putRepos();
