//obtenemos la ultima instancia de un listado de emails
const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const noCodeTeam = "S5-no-code";
const asd = "C:/Users/Administrator/Desktop/NC/Calificaciones/S9.xlsx";
const pathCalificaciones =
  "C:/Users/julio/OneDrive/Escritorio/emails subir bajar check.xlsx";

const file = reader.readFile(pathCalificaciones);
const sheets = file.SheetNames;
let dataReviews = [];
// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    dataReviews.push(res);
  });
}

async function checkEmails() {
  let memberNormalized = [];
  let token = process.env.TOKEN;
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjAwNzA4MzYsImV4cCI6MTY2MDMzMDAzNn0.nIPjdiTHSq1hnzDFV4oayffqqBQAOjPYQH0_e4W7yMM"
  const res = await axios.get(
    `http://${process.env.LOCALHOST}:5000/api/members`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );
  const members = res.data.getAllMembers;

  dataReviews.forEach((data) => {
    const encontrado = members.find((m) => m.email === data.email);
    if (encontrado) {
      console.log(encontrado.email + ";" + encontrado.filterPassed);
    } else {
      console.log(data.email + "   " + data.nombre);
    }
  });
}
checkEmails();
