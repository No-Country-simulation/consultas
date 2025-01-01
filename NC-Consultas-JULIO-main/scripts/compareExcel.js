const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const pathForm = "C:/Users/julio/OneDrive/Escritorio/Batch 1.xlsx";

const pathMiembros = "C:/Users/julio/OneDrive/Escritorio/Slack Brasil.xlsx";

const file = reader.readFile(pathForm);
const sheets = file.SheetNames;
let form = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    form.push(res);
  });
}

const file2 = reader.readFile(pathMiembros);
const sheets2 = file2.SheetNames;
let miembros = [];

for (let i = 0; i < sheets2.length; i++) {
  const temp = reader.utils.sheet_to_json(file2.Sheets[file2.SheetNames[i]]);
  temp.forEach((res) => {
    miembros.push(res);
  });
}
console.log(form.length + " " + miembros.length);

let dataNormalized = [];
// dataNormalized.push("email;nombre;apellido");
dataNormalized.push("email;test");
// let j = 0;
// for (let i = 0; i < form.length; i++) {
//   const encontrado = miembros.find((s) => s.email == form[i].email);
//   if (!encontrado) {
//     j++;
//     dataNormalized.push(
//       // `${form[i].email};${form[i].nombre};${form[i].apellido}`
//       `${form[i].email};test`
//     );
//   }
// }

let j = 0;
for (let i = 0; i < miembros.length; i++) {
  const encontrado = form.find((s) => s.email == miembros[i].email);
  if (!encontrado) {
    j++;
    dataNormalized.push(
      // `${form[i].email};${form[i].nombre};${form[i].apellido}`
      `${miembros[i].email};test`
    );
  }
}

console.log(j);
// console.log(dataNormalized);

if (dataNormalized.length > 0) {
  let fullnamesWithSpace = dataNormalized.join("\n");
  fs.writeFileSync("Reporte Brasil - batch1.txt", fullnamesWithSpace);
}
