const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "./hackathonMVP/Hackathon - Registro (2).xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let inscriptos = [];
let token = process.env.TOKEN;

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
    console.log("Hols");
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjAwNzA4MzYsImV4cCI6MTY2MDMzMDAzNn0.nIPjdiTHSq1hnzDFV4oayffqqBQAOjPYQH0_e4W7yMM"
    const res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}members`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const members = res.data.getAllMembers;
    console.log(members.length);

    for (i = 0; i < inscriptos.length; i++) {
      // for (i = 0; i < 2; i++) {
      const encontrado = members.find((m) => m.email == inscriptos[i].Email);
      if (encontrado) {
        // console.log(`Encontrado : ${inscriptos[i].Email}`);
        await post(inscriptos[i]);
      } else {
        console.log(`NO Encontrado : ${inscriptos[i].Email}`);
      }
    }
    return;
  } catch (error) {
    console.log(error);
  }
}
// { firstname, lastname, email, area, language, stack, availability }
async function post(inscrip) {
  try {
    const res = await axios.put(
      `${process.env.LOCALHOST}members/hackathonmvp`,
      // `${process.env.LOCALHOST}members`,
      {
        firstname: inscrip.Nombre,
        lastname: inscrip.Apellido,
        email: inscrip.Email,
        area: inscrip.rolweb,
        vertical: "Web App",
        language: inscrip.lenguajeweb,
        stack: inscrip.webstack,
        availability: inscrip.availability,
      },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    console.log(inscrip.Email + " " + res.status);
  } catch (error) {
    console.log("ERROR :" + inscrip.Email);
    console.log(error);
  }
}

checkInscriptos();
