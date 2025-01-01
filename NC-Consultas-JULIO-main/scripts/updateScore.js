const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const { stringify } = require("querystring");
// const path = "C:/Users/julio/Downloads/respuestas.xlsx"
// const path = "C:/Users/julio/OneDrive/Escritorio/POSS Junio.xlsx";
const path =
  "C:/NC/NC-Consultas-JULIO/calificaciones/Catalogo POSS Junio C18 S15.xlsx";

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

console.log(data.length);

let output = [];
output.push("email;suma;div;score");

async function calculateScore() {
  data.forEach((member) => {
    let suma =
      parseFloat(member.trabajoEquipo) +
      parseFloat(member.comunicacion) +
      parseFloat(member.proactividad) +
      parseFloat(member.capacidadAprendizaje) +
      parseFloat(member.tolerancia) +
      parseFloat(member.adaptabilidad) +
      parseFloat(member.resolucion) +
      parseFloat(member.autonomia) +
      parseFloat(member.actitudPos) +
      parseFloat(member.empatia) +
      parseFloat(member.puntualidad) +
      parseFloat(member.gestion) +
      parseFloat(member.solidaridad);

    let div = 0;
    if (parseFloat(member.trabajoEquipo) > 0) {
      div++;
    }
    if (parseFloat(member.comunicacion) > 0) {
      div++;
    }
    if (parseFloat(member.proactividad) > 0) {
      div++;
    }
    if (parseFloat(member.capacidadAprendizaje) > 0) {
      div++;
    }
    if (parseFloat(member.tolerancia) > 0) {
      div++;
    }
    if (parseFloat(member.adaptabilidad) > 0) {
      div++;
    }
    if (parseFloat(member.resolucion) > 0) {
      div++;
    }
    if (parseFloat(member.autonomia) > 0) {
      div++;
    }
    if (parseFloat(member.actitudPos) > 0) {
      div++;
    }
    if (parseFloat(member.empatia) > 0) {
      div++;
    }
    if (parseFloat(member.puntualidad) > 0) {
      div++;
    }
    if (parseFloat(member.gestion) > 0) {
      div++;
    }
    if (parseFloat(member.solidaridad) > 0) {
      div++;
    }

    let score = suma / div;

    output.push(member.Email + ";" + suma + ";" + div + ";" + score.toFixed(1));
    console.log(suma + " " + div + " " + score);
  });

  if (output.length > 0) {
    let fullnamesWithSpace = output.join("\n");
    fs.writeFileSync("Score.txt", fullnamesWithSpace);
  }
}

calculateScore();
