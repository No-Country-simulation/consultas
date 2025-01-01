const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const pathCohorte = "C:/Users/julio/OneDrive/Escritorio/C16 S13/C16 Miembros Activos.xlsx";
const pathSelecciondo = "C:/Users/julio/OneDrive/Escritorio/C16 S13/Miembros que calificaron.xlsx";
const pathCalificaron = "C:/Users/julio/OneDrive/Escritorio/C16 S13/Miembros que calificaron.xlsx";


//En un excel tengo los miemrbos activos (Excel de drive con baja = false) 
//En otro todos los mails de los que calificaron
//Recorro los excels y si encuentro match lo agrego a un txt para subir al seleccionado
//Leo el cohorte los miembros activos
const file = reader.readFile(pathCohorte);
const sheets = file.SheetNames;
let cohorte = [];
// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    cohorte.push(res);
  });
}

const file2 = reader.readFile(pathCalificaron);
const sheets2 = file2.SheetNames;
let calificaron = [];
// let members = []
for (let i = 0; i < sheets2.length; i++) {
  const temp = reader.utils.sheet_to_json(file2.Sheets[file2.SheetNames[i]]);
  temp.forEach((res) => {
    calificaron.push(res);
  });
}

console.log(cohorte.length);
console.log(calificaron.length);

let cohorteSubir = []



cohorte.forEach(c => {
    
    const califico = calificaron.find(cal => cal.email == c.email);
    if (califico) {
        // console.log(c.email);
        cohorteSubir.push(c.email)
    } else {
        
    }

});


if (cohorteSubir.length > 0) {

    let fullnamesWithSpace = cohorteSubir.join("\n");
    fs.writeFileSync("C16 subir.txt", fullnamesWithSpace, "utf-8");
   

}