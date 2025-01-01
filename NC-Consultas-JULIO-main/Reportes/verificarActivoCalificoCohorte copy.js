const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");

const pathSelecciondo = "C:/Users/julio/OneDrive/Escritorio/C16 S13/S13 Miembros Activos.xlsx";
const pathCalificaron = "C:/Users/julio/OneDrive/Escritorio/C16 S13/Miembros que calificaron.xlsx";


//En un excel tengo los miemrbos activos (Excel de drive con baja = false) 
//En otro todos los mails de los que calificaron
//Recorro los excels y si encuentro match lo agrego a un txt para subir al seleccionado
//Leo el cohorte los miembros activos
const file = reader.readFile(pathSelecciondo);
const sheets = file.SheetNames;
let seleccionado = [];
// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    seleccionado.push(res);
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

console.log(seleccionado.length);
console.log(calificaron.length);

let seleccionadoOk = []
let seleccionadoNOcalifico = []



seleccionado.forEach(c => {
    
    const califico = calificaron.find(cal => cal.email == c.email);
    if (califico) {
        // console.log(c.email);
        seleccionadoOk.push(c.email)
    } else {
        seleccionadoNOcalifico.push(c.email)
    }

});


console.log(seleccionadoOk.length);
console.log(seleccionadoNOcalifico.length);

if (seleccionadoNOcalifico.length > 0) {

    let fullnamesWithSpace = seleccionadoNOcalifico.join("\n");
    fs.writeFileSync("S13 Bajar.txt", fullnamesWithSpace, "utf-8");
   

}