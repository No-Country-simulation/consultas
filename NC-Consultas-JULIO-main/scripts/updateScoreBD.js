const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const { stringify } = require("querystring");
// const path = "C:/Users/julio/Downloads/respuestas.xlsx"
const path = "C:/Users/julio/OneDrive/Escritorio/score.xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let data = [];
let token = process.env.TOKEN;
// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

console.log(data.length);
// return;

async function calculateScore() {
  try {
    for (i = 0; i < data.length; i++) {
      // for (i = 0; i < 5; i++) {
      const res = await axios.put(
        `http://${process.env.LOCALHOST}:5000/api/members/setscore`,
        // `${process.env.LOCALHOST}members`,
        {
          email: data[i].email,
          score: data[i].score,
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log(i + " " + data[i].email, +" " + res.status);
    }
  } catch (error) {
    console.error(error);
  }
}

calculateScore();
