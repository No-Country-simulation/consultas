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
inscriptos.forEach((inscip) => {
  console.log(inscip);
});
console.log(inscriptos.length);
// return;
async function checkInscriptos() {
  try {
    let token = process.env.TOKEN;
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

    inscriptos.forEach((inscip) => {
      const encontrado = members.find(
        (m) => m.email == inscip.Email.toLowerCase()
      );
      if (encontrado) {
        console.log(
          `Encontrado : ${inscip.Email} --> ${encontrado.filterPassed}`
        );
      } else {
        console.log(`NO Encontrado : ${inscip.Email}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

checkInscriptos();
