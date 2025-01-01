const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "./hackathonMVP/Hackathon - Registro (3).xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let inscriptos = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    inscriptos.push(res);
  });
}

console.log(inscriptos.length);
// return;

async function checkInscriptos() {
  try {
    let token = process.env.TOKEN;

    //hackathon members
    let res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}members/actualhackathon/`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const hackathon = res.data.getActualHackathonMembers;
    console.log(hackathon.length);

    //miembros seleccionado
    res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}selection/actual`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const seleccionado = res.data.getActualMembers;
    console.log(seleccionado.length);

    let output = [];
    output.push("email;encontrado;asignado");
    hackathon.forEach((h) => {
      let found = false;

      const encontrado = seleccionado.find((s) => s.email == h.email);
      if (encontrado) {
        found = true;
      }

      output.push(
        h.email + ";" + found + ";" + h.hackathonMVPHistory[0].assigned
      );
    });

    if (output.length > 1) {
      let fullnamesWithSpace = output.join("\n");
      fs.writeFileSync("hackathon - seleccionado.txt", fullnamesWithSpace);
    }
  } catch (error) {
    console.log(error);
  }
}

checkInscriptos();
