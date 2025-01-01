const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const { ObjectId } = require("mongodb");
const pathViejo =
  "C:/NC/NC-Consultas-JULIO/calificaciones/Catalogo Enero 2024 (C15 S12) CORREGIDO (1).xlsx";

// "C:/Users/julio/Downloads/Catalogo Enero 2024 (C15 S12) CORREGIDO (1).xlsx";

// const pathActual = "C:/Users/julio/Downloads/ACUMULADAS.xlsx";
const pathActual =
  "C:/NC/NC-Consultas-JULIO/calificaciones/ACUMULADAS Noviembre.xlsx";

const file = reader.readFile(pathViejo);
const sheets = file.SheetNames;
let modeloViejo = [];
const fileActual = reader.readFile(pathActual);
const sheetsActual = fileActual.SheetNames;
let modeloActual = [];

/* Archivos
COlumnas de modelo viejo

-Nombre
-email
-reviews
-trabajoEquipo
-comunicacion
-proactividad
-liderazgo
-cordialidad
-tecnica
-kt

Columnas modelo nuevo

-nombre
-email
-emailEquipo
-comunicacion
-trabajoEquipo
-proactividad
-actitudPositiva
-autonomia
-cosasNuevas
-adaptabilidad
-tolerancia
-resolucion
-gestionTiempo
-empatia
-solidaridad
-review
-nombreTl
-emailTl
-comunicacionTl
-empatiaTl
-actitudPosTl
-puntualidadTl
-gestionTiempoTl
-resolucionTl

calificaciones que suman:

-trabajoEquipo + trabajoEquipo
-comunicacion + comunicacion + comunicacionTl
-proactividad + proactividad
-cordialidad + cordialidad


Calificaciones de tl y miembro

- comunicacion + comunicacionTl
- empatia + empatiaTl
- puntualidad (Solo tl)
- actitudPositiva + actitudPosTl
- gestionTiempo + gestionTiempoTl
- resolucion + resolucionTl


*/
//Levanto excel del model viejo
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    modeloViejo.push(res);
  });
}

//Levanto excel del modelo acutal.
for (let i = 0; i < sheetsActual.length; i++) {
  const temp = reader.utils.sheet_to_json(
    fileActual.Sheets[fileActual.SheetNames[i]]
  );
  temp.forEach((res) => {
    modeloActual.push(res);
  });
}

console.log(modeloActual.length);
console.log(modeloViejo.length);
// return;
let trabajoEquipo = 0;
let comunicacion = 0;
let proactividad = 0;
let capacidad = 0;
let tolerancia = 0;
let adaptabilidad = 0;
let resolucion = 0;
let autonomia = 0;
let actitudPositiva = 0;
let rol = "";
let empatia = 0;
let puntualidad = 0;
let gestionTiempo = 0;
let solidaridad = 0;
let cantReviews = 0;
let cantReviewsTl = 0;
let cosasNuevas = 0;
let cordialidad = 0;
let cantidadSim = 0;
let div = 0;
let divNuevo = 0;
let divMiembro = 0;
let roles = [];
let equipos = [];
let repos = [];
let output = [];
let existeNuevo = false;

console.log(modeloViejo.length);
// console.log(modeloViejo)

console.log(modeloActual.length);
// console.log(modeloActual)

let emailsFull = [];

output.push(
  "Nombre;Email;Rol;Pais;Linkedin;Github;Simulaciones;Semanas;Reviews Coequipers;Reviews como TL;Trabajo en equipo;Comunicacion;Proactividad;Capacidad de aprendizaje;Tolerancia al cambio;Adaptabilidad;Resolucion de problemas;Autonomia;Actitud positiva;Emaptia;Puntualidad;Gestion del Tiempo;Solidaridad;Equipos;Repos"
);

for (let i = 0; i < modeloActual.length; i++) {
  if (modeloActual[i].emailEquipo) {
    emailsFull.push(modeloActual[i].emailEquipo);
  }
  if (modeloActual[i].emailTl) {
    emailsFull.push(modeloActual[i].emailTl);
  }
}

for (let i = 0; i < modeloViejo.length; i++) {
  emailsFull.push(modeloViejo[i].email);
}

const emails = [...new Set(emailsFull)];
// let emails = [];
// emails.push("kevinb45@hotmail.com");

console.log(emailsFull.length);

async function getInfo() {
  //Traigo toda la informacion de miembros y de equipos
  let token = process.env.TOKEN;
  const res = await axios.get(`${process.env.LOCALHOST}members`, {
    headers: { token: `Bearer ${token}` },
  });
  const members = res.data.getAllMembers;
  const resteam = await axios.get(`${process.env.LOCALHOST}teams`, {
    headers: { token: `Bearer ${token}` },
  });
  const teams = resteam.data.getAllTeams;
  console.log(members.length);
  console.log(teams.length);
  //
  // return;
  emails.forEach((email) => {
    roles = [];
    equipos = [];
    rol = "";
    trabajoEquipo = 0;
    cantidadSim = 0;
    comunicacion = 0;
    proactividad = 0;
    capacidad = 0;
    tolerancia = 0;
    adaptabilidad = 0;
    resolucion = 0;
    autonomia = 0;
    actitudPositiva = 0;
    empatia = 0;
    puntualidad = 0;
    gestionTiempo = 0;
    solidaridad = 0;
    cantReviews = 0;
    cantReviewsTl = 0;
    cordialidad = 0;
    cosasNuevas = 0;
    divMiembro = 0;
    divNuevo = 0;
    div = 0;
    repos = [];
    existeNuevo = false;

    //Recorro el modelo viejo
    modeloViejo.forEach((viejo) => {
      if (viejo.email == email) {
        cantReviews = viejo.reviews;
        comunicacion += viejo.comunicacion;
        proactividad += viejo.proactividad;
        cordialidad += viejo.cordialidad;
        trabajoEquipo += viejo.trabajoEquipo;
        div++;
        divMiembro++;
      }
    });

    modeloActual.forEach((actual) => {
      if (actual.emailEquipo == email) {
        comunicacion += actual.comunicacion;
        trabajoEquipo += actual.trabajoEquipo;
        proactividad += actual.proactividad;
        actitudPositiva += actual.actitudPos;
        autonomia += actual.autonomia;
        cosasNuevas += actual.cosasNuevas;
        adaptabilidad += actual.adaptabilidad;
        tolerancia += actual.tolerancia;
        resolucion += actual.resolucion;
        gestionTiempo += actual.gestionTiempo;
        empatia += actual.empatia;
        solidaridad += actual.solidaridad;
        cantReviews++;
        div++;
        divMiembro++;
        divNuevo++;
        existeNuevo = true;
      }
      if (actual.emailTl == email) {
        comunicacion += actual.comunicacionTl;
        actitudPositiva += actual.actitudPosTl;
        resolucion += actual.resolucionTl;
        gestionTiempo += actual.gestionTiempoTl;
        empatia += actual.empatiaTl;
        puntualidad += actual.puntualidadTl;
        cantReviewsTl++;
        div++;
        existeNuevo = true;
      }
    });

    const member = members.find((m) => m.email == email);
    if (member) {
      //Agrego can sim
      member.cohortHistory.forEach((c) => {
        roles.push(c.area);
        if (c.cohort != 22) {
          cantidadSim++;
        }
      });
      member.selectionHistory.forEach((s) => {
        roles.push(s.area);
        if (s.selection != 19) {
          cantidadSim++;
        }
      });

      member.hackathonMVPHistory.forEach((s) => {
        // roles.push(s.area);
        if (s.hackathon != 3) {
          cantidadSim++;
        }
      });
      teams.forEach((team) => {
        const encontrado = team.members.find((m) => m._id == member._id);
        if (
          encontrado &&
          !team.name.includes("S19") &&
          !team.name.includes("C22") &&
          !team.name.includes("H3")
        ) {
          equipos.push(team.name);
          if (team.approved || !team.approved) {
            team.repositoryList.forEach((r) => {
              repos.push(r.repo);
            });
          }
        }
      });

      if (existeNuevo) {
        if (divNuevo > 0) {
          cosasNuevas = cosasNuevas / divNuevo;
          tolerancia = tolerancia / divNuevo;
          adaptabilidad = adaptabilidad / divNuevo;
          autonomia = autonomia / divNuevo;
        }

        if (divNuevo > 0 || cantReviewsTl > 0) {
          resolucion = resolucion / (divNuevo + cantReviewsTl);
          actitudPositiva = actitudPositiva / (divNuevo + cantReviewsTl);
          empatia = empatia / (divNuevo + cantReviewsTl);
          gestionTiempo = gestionTiempo / (divNuevo + cantReviewsTl);
        }
      }

      if (div > 0) {
        comunicacion = comunicacion / div;
      }
      if (divMiembro > 0) {
        trabajoEquipo = trabajoEquipo / divMiembro;
        proactividad = proactividad / divMiembro;
      }
      if (cantReviewsTl == 0) {
        puntualidad = (autonomia + comunicacion + proactividad) / 3;
      } else {
        puntualidad = puntualidad / cantReviewsTl;
      }
      solidaridad = (trabajoEquipo + proactividad) / 2;

      comunicacion = Math.round(comunicacion * 10) / 10;
      trabajoEquipo = Math.round(trabajoEquipo * 10) / 10;
      proactividad = Math.round(proactividad * 10) / 10;
      cosasNuevas = Math.round(cosasNuevas * 10) / 10;
      tolerancia = Math.round(tolerancia * 10) / 10;
      adaptabilidad = Math.round(adaptabilidad * 10) / 10;
      resolucion = Math.round(resolucion * 10) / 10;
      autonomia = Math.round(autonomia * 10) / 10;
      actitudPositiva = Math.round(actitudPositiva * 10) / 10;
      empatia = Math.round(empatia * 10) / 10;
      puntualidad = Math.round(puntualidad * 10) / 10;
      gestionTiempo = Math.round(gestionTiempo * 10) / 10;
      solidaridad = Math.round(solidaridad * 10) / 10;
      rol = roles[roles.length - 1];
      output.push(
        member.fullname +
          ";" +
          member.email +
          ";" +
          rol +
          ";" +
          member.country +
          ";" +
          member.linkedin +
          ";" +
          member.github +
          ";" +
          cantidadSim +
          ";" +
          cantidadSim * 5 +
          ";" +
          cantReviews +
          ";" +
          cantReviewsTl +
          ";" +
          trabajoEquipo +
          ";" +
          comunicacion +
          ";" +
          proactividad +
          ";" +
          cosasNuevas +
          ";" +
          tolerancia +
          ";" +
          adaptabilidad +
          ";" +
          resolucion +
          ";" +
          autonomia +
          ";" +
          actitudPositiva +
          ";" +
          empatia +
          ";" +
          puntualidad +
          ";" +
          gestionTiempo +
          ";" +
          solidaridad +
          ";" +
          equipos.join(",") +
          ";" +
          repos.join(" - ")
      );
    }
  });

  // comunicacion = comunicacion / div;
  // trabajoEquipo = trabajoEquipo / divMiembro;
  // proactividad = proactividad / divMiembro;
  // cosasNuevas = cosasNuevas / divNuevo;
  // tolerancia = tolerancia / divNuevo;
  // adaptabilidad = adaptabilidad / divNuevo;
  // resolucion = resolucion / (divNuevo + cantReviewsTl);
  // autonomia = autonomia / divNuevo;
  // actitudPositiva = actitudPositiva / (divNuevo + cantReviewsTl);
  // empatia = empatia / (divNuevo + cantReviewsTl);
  // puntualidad = puntualidad / cantReviewsTl;
  // gestionTiempo = gestionTiempo / (divNuevo + cantReviewsTl);

  // console.log("Trabajo en equipo: ", trabajoEquipo);
  // console.log("Comunicacion ", comunicacion);
  // console.log("Proactividad ", proactividad);
  // console.log("Cosas nuevas ", cosasNuevas);
  // console.log("Tolerancia ", tolerancia);
  // console.log("Adaptabilidad ", adaptabilidad);
  // console.log("Resolucion ", resolucion);
  // console.log("Autonomia ", autonomia);
  // console.log("Actitud positiva ", actitudPositiva);
  // console.log("Empatia ", empatia);
  // console.log("Puntualidad ", puntualidad);
  // console.log("Gestion del tiempo ", gestionTiempo);
  // console.log(div);
  // console.log(divNuevo);
  // console.log(cantReviews);
  // console.log(cantReviewsTl);

  let fullnamesWithSpace = output.join("\n");
  // fs.writeFileSync("POSS elcira lara.txt", fullnamesWithSpace);
  fs.writeFileSync("POSS Noviembre.txt", fullnamesWithSpace);
  console.log("Descargado POSS ACA");
}

getInfo();
