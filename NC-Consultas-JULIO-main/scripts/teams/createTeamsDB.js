const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const token = process.env.TOKEN;

const teams = [
  "C22-39-ft-nocode",
  "C22-40-m-nocode",
  "C22-41-m-nocode",
  "C22-42-n-nocode",
  "C22-43-n-nocode",
  "C22-44-n-nocode",
  "C22-45-t-nocode",
  "C22-46-t-nocode",
];
let input = {};
async function createTeamsBD() {
  try {
    for (const team of teams) {
      //   console.log(team);
      input = { name: team, stack: "", project: "" };
      console.log(input.name);
      await axios.post(`${process.env.LOCALHOST}teams`, input, {
        headers: { token: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

createTeamsBD();
