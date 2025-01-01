const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const noCodeTeam = "S5-no-code";
const asd = "C:/Users/Administrator/Desktop/NC/Calificaciones/S9.xlsx";
const pathCalificaciones =
  "C:/Users/julio/OneDrive/Escritorio/No Country - Feedback Simulación Agosto.xlsx";

// "C:\Users\julio\Downloads\No Country - Feedback Simulación (2).xlsx"
//S10"C:\Users\julio\OneDrive\Escritorio\NC\C15.xlsx"
// const emails = [
//   ];
const tieneMayuscula = (str) => /[A-Z]/.test(str);

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

console.log(dataReviews.length);
// return;

let notFound = [];
async function checkEmails() {
  let memberNormalized = [];
  let token = process.env.TOKEN;
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjAwNzA4MzYsImV4cCI6MTY2MDMzMDAzNn0.nIPjdiTHSq1hnzDFV4oayffqqBQAOjPYQH0_e4W7yMM"
  const res = await axios.get(`${process.env.LOCALHOST}members`, {
    headers: { token: `Bearer ${token}` },
  });
  const members = res.data.getAllMembers;

  console.log(members.length);
  // return;

  dataReviews.forEach((data) => {
    const encontrado = members.find((m) => m.email === data.email);
    if (encontrado) {
      //   console.log(email);
    } else {
      notFound.push(data.email);
      // console.log(data.email + "   " + data.nombre);
    }
  });
  const uniqueEmails = [...new Set(notFound)];
  console.log(`Emails no encontrados: ${uniqueEmails.length}`);

  uniqueEmails.forEach((element) => {
    if (tieneMayuscula(element)) {
      console.log(element + "      MAYUS");
    } else {
      console.log(element);
    }
  });

  //   emails.forEach((data) => {
  //     const encontrado = members.find((m) => m.email === data);
  //     if (encontrado) {
  //       //   console.log(email);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }
}

checkEmails();
