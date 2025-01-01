//Compara el archivo del drive Demo Day (Donde pongo activo)
//Contra el excel de califiaciones y devuelve un nuevo excel que dice si el activo califico o no
const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const noCodeTeam = "S5-no-code";
const pathCalificaciones = "C:/Users/julio/OneDrive/Escritorio/NC/C15.xlsx";

const pathDD = "C:/Users/julio/OneDrive/Escritorio/C15 bajas.xlsx";

// "C:\Users\Administrator\Desktop\c10dd.xlsx"
// "C:\Users\julio\Downloads\procesar\Nueva carpeta\C9miembros.xlsx"

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

const fileDD = reader.readFile(pathDD);
const sheetsDD = fileDD.SheetNames;
let dataDD = [];
// let members = []
for (let i = 0; i < sheetsDD.length; i++) {
  const temp = reader.utils.sheet_to_json(fileDD.Sheets[fileDD.SheetNames[i]]);
  temp.forEach((res) => {
    dataDD.push(res);
  });
}

// console.log(dataDD.length);
// console.log(dataReviews.length);

// return;

let output = [];
output.push("email;baja;califico");
// output.push("team;email;baja;califico");
dataDD.forEach((dd) => {
  let califico;
  const found = dataReviews.find((review) => review.email == dd.email);
  // console.log(dd.team , noCodeTeam)
  if (found) {
    califico = true;
  } else {
    califico = false;
  }
  // console.log(dd.presente);
  // output.push(dd.equipo + ";" + dd.email + ";" + dd.baja + ";" + califico);

  output.push(dd.email + ";" + dd.baja + ";" + califico);
});
console.log(output.length);
if (output.length > 1) {
  let fullnamesWithSpace = output.join("\n");
  fs.writeFileSync("Reporte PROCESS C15.txt", fullnamesWithSpace);
}
