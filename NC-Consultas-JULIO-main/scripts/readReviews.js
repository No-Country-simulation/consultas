const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const { stringify } = require("querystring");
// const path = "C:/Users/julio/Downloads/respuestas.xlsx"
const path =
  "C:/Users/julio/OneDrive/Escritorio/No Country/Calificaicones/Calificaciones.xlsx";

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

// data.forEach(element => {
//     const words = element.nombre.split(" ")
//     let nombreaux = words.join("")
//     // console.log(words)
//     console.log(nombreaux.toLowerCase())
// });

let output = [];
async function getMembers() {
  let token = process.env.TOKEN;
  const res = await axios.get("http://localhost:5000/api/members", {
    headers: { token: `Bearer ${token}` },
  });
  const members = res.data.getAllMembers;
  // console.log(data)
  if (members.length > 0 && data.length > 0) {
    output.push(
      "Fullname;Email;Filtro;Emulaciones;Pais;Telefono;Git;Linkedin;Trabajo en equipo;Comunicacion;Proactividad;Tecnica;KT;Cordialidad;Calificaciones"
    );

    members.forEach((m) => {
      let trabajoequipo = 0;
      let comunicacion = 0;
      let proactividad = 0;
      let tecnica = 0;
      let kt = 0;
      let cordialidad = 0;
      let total = 0;
      let liderazgo = 0;
      let div = 0;
      let emulaciones = m.cohortHistory.length + m.selectionHistory.length;

      data.map((d) => {
        if (d.emailcalificado == m.email) {
          trabajoequipo += d.trabajoequipo;
          comunicacion += d.comunicacion;
          proactividad += d.proactividad;
          tecnica += d.tecnica;
          kt += d.kt;
          cordialidad += d.cordialidad;
          div++;
        }
      });

      if (div > 0) {
        let result = Math.round((trabajoequipo / div) * 10) / 10;
        // console.log(result)
        output.push(
          m.fullname +
            ";" +
            m.email +
            ";" +
            m.filterPassed +
            ";" +
            emulaciones +
            ";" +
            m.country +
            ";" +
            m.phone +
            ";" +
            m.github +
            ";" +
            m.linkedin +
            ";" +
            Math.round((trabajoequipo / div) * 10) / 10 +
            ";" +
            Math.round((comunicacion / div) * 10) / 10 +
            ";" +
            Math.round((proactividad / div) * 10) / 10 +
            ";" +
            Math.round((tecnica / div) * 10) / 10 +
            ";" +
            Math.round((kt / div) * 10) / 10 +
            ";" +
            Math.round((cordialidad / div) * 10) / 10 +
            ";" +
            div
        );
      }
    });

    let fullnamesWithSpace = output.join("\n");
    fs.writeFileSync("Reporte Calificaciones marzo.txt", fullnamesWithSpace);
  }
}

function normalizeName(name) {
  const words = name.split(" ");
  let nombreaux = words.join("");
  return nombreaux.toLowerCase();
}

// console.log(normalizeName("Julio Otero"))
getMembers();

// const workbook = xlsx.readFile(path)
// const worksheet = workbook.Sheets[workbook.SheetNames[0]]
// let data = []
// for (let i = 2; i < 10; i++){

//     // const fullname = worksheet[`A${i}`].v
//     // const team = worksheet[`B${i}`].v
//     // const qualfullname = worksheet[`C${i}`].v
//     // const kpi1 = worksheet[`D${i}`].v
//     // const kpi2 = worksheet[`E${i}`].v
//     // const kpi3 = worksheet[`F${i}`].v
//     // const kpi4 = worksheet[`G${i}`].v
//     // const kpi5 = worksheet[`H${i}`].v
//     // const kpi6 = worksheet[`I${i}`].v
//     // const leadership = worksheet[`J${i}`].v
//     // const comment = worksheet[`K${i}`].v

//     // console.log(fullname,team,qualfullname,kpi1,kpi2,kpi3,kpi4,kpi5,kpi6,leadership,comment)

// }

// const schema = {
//     'FULLNAME': {
//       // JSON object property name.
//       prop: 'fullname',
//       type: String
//     },
//     'TEAM': {
//       prop: 'team',
//       type: String
//     },
//     'QUALFULLNAME': {
//         prop: 'qualfullname',
//         type: String
//       },
//       'KPI1': {
//         prop: 'kpi1',
//         type: Number
//       },
//       'KPI2': {
//         prop: 'kpi2',
//         type: Number
//       },
//       'KPI3': {
//         prop: 'kpi3',
//         type: Number
//       },
//       'KPI4': {
//         prop: 'kpi4',
//         type: Number
//       },
//       'KPI5': {
//         prop: 'kpi5',
//         type: Number
//       },
//       'KPI6': {
//         prop: 'kpi6',
//         type: Number
//       },
//     //   'KPI7': {
//     //     prop: 'kpi7',
//     //     type: Number
//     //   },
//       'LEADERSHIP': {
//         prop: 'leadership',
//         type: String
//       },
//       'COMMENT': {
//         prop: 'comment',
//         type: String
//       },
//   }

// try {
//     readXlsxFile(path, { schema }).then(({ rows, errors }) => {

//         rows.forEach(element => {
//             console.log(element)
//         });

//     })
// } catch (error) {
//     console.log(error)
// }

// readXlsxFile(path).then((rows) => {
//     // console.log(rows)

//   })

//   // Readable Stream.
// //   readXlsxFile(fs.createReadStream('/path/to/file')).then((rows) => {
// //     // `rows` is an array of rows
// //     // each row being an array of cells.
// //   })
