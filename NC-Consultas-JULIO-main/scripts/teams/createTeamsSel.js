const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const token = process.env.TOKEN;

let numero = 0;
let pyManana = [];
let pyTarde = [];
let pyNoche = [];
let pyFullTime = [];
let teams = [];
let reactManana = [];
let reactTarde = [];
let reactNoche = [];
let reactFullTime = [];
let uxManana = [];
let uxTarde = [];
let uxNoche = [];
let uxFulllTime = [];
let nodeManana = [];
let nodeTarde = [];
let nodeNoche = [];
let nodeFulllTime = [];
let javaManana = [];
let javaTarde = [];
let javaNoche = [];
let javaFulllTime = [];
let typeManana = [];
let typeTarde = [];
let typeNoche = [];
let typeFulllTime = [];
// let reactManana = [];
// let reactManana = [];

async function createTeams() {
  try {
    const res = await axios.get(
      `http://${process.env.LOCALHOST}:5000/api/selection/actual`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    const members = res.data.getActualMembers;
    console.log(members.length);

    //recorro y guardo

    members.forEach((member) => {
      const encontrado = member.selectionHistory.find((c) => c.selection == 15);
      // Agrego los REACT

      if (
        encontrado.area == "Front-End" &&
        encontrado.stack == "React" &&
        encontrado.availability == "Mañana"
      ) {
        reactManana.push(member);
      } else if (
        encontrado.area == "Front-End" &&
        encontrado.stack == "React" &&
        encontrado.availability == "Tarde"
      ) {
        reactTarde.push(member);
      } else if (
        encontrado.area == "Front-End" &&
        encontrado.stack == "React" &&
        encontrado.availability == "Full-Time"
      ) {
        reactFullTime.push(member);
      } else if (
        encontrado.area == "Front-End" &&
        encontrado.stack == "React" &&
        encontrado.availability == "Noche"
      ) {
        reactNoche.push(member);
      }
      // Agrego los UX
      else if (
        encontrado.area == "UX/UI" &&
        // encontrado.stack == "React" &&
        encontrado.availability == "Mañana"
      ) {
        uxManana.push(member);
      } else if (
        encontrado.area == "UX/UI" &&
        // encontrado.stack == "React" &&
        encontrado.availability == "Tarde"
      ) {
        uxTarde.push(member);
      } else if (
        encontrado.area == "UX/UI" &&
        // encontrado.stack == "React" &&
        encontrado.availability == "Full-Time"
      ) {
        uxFulllTime.push(member);
      } else if (
        encontrado.area == "UX/UI" &&
        // encontrado.stack == "React" &&
        encontrado.availability == "Noche"
      ) {
        uxNoche.push(member);
      }
      // Agrego NODE!!!!!!!!!!!
      else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language != "Typescript" &&
        encontrado.availability == "Mañana"
      ) {
        nodeManana.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language != "Typescript" &&
        encontrado.availability == "Tarde"
      ) {
        nodeTarde.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language != "Typescript" &&
        encontrado.availability == "Full-Time"
      ) {
        nodeFulllTime.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language != "Typescript" &&
        encontrado.availability == "Noche"
      ) {
        nodeNoche.push(member);
      }
      // Agrego type NODE!!!!!!!!!!!
      else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language == "Typescript" &&
        encontrado.availability == "Mañana"
      ) {
        typeManana.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language == "Typescript" &&
        encontrado.availability == "Tarde"
      ) {
        typeTarde.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language == "Typescript" &&
        encontrado.availability == "Full-Time"
      ) {
        typeFulllTime.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        (encontrado.stack == "Express" || encontrado.stack == "Node") &&
        encontrado.language == "Typescript" &&
        encontrado.availability == "Noche"
      ) {
        typeNoche.push(member);
      }
      // Agrego java!!!!!!!!!!!
      else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Java" &&
        encontrado.availability == "Mañana"
      ) {
        javaManana.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Java" &&
        encontrado.availability == "Tarde"
      ) {
        javaTarde.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Java" &&
        encontrado.availability == "Full-Time"
      ) {
        javaFulllTime.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Java" &&
        encontrado.availability == "Noche"
      ) {
        javaNoche.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Python" &&
        encontrado.availability == "Mañana"
      ) {
        pyManana.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Python" &&
        encontrado.availability == "Tarde"
      ) {
        pyTarde.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Python" &&
        encontrado.availability == "Full-Time"
      ) {
        pyFullTime.push(member);
      } else if (
        encontrado.area == "Back-End" &&
        encontrado.language == "Python" &&
        encontrado.availability == "Noche"
      ) {
        pyNoche.push(member);
      }
    });

    console.log("React Mañana ", reactManana.length);
    console.log("React Tarde ", reactTarde.length);
    console.log("React Noche ", reactNoche.length);
    console.log("React Full ", reactFullTime.length);
    console.log("Node Mañana ", nodeManana.length);
    console.log("Node Tarde ", nodeTarde.length);
    console.log("Node Noche ", nodeNoche.length);
    console.log("Node Full ", nodeFulllTime.length);
    console.log("Ux Mañana ", uxManana.length);
    console.log("Ux Tarde ", uxTarde.length);
    console.log("Ux Noche ", uxNoche.length);
    console.log("Ux Full ", uxFulllTime.length);
    console.log("java Mañana ", javaManana.length);
    console.log("java Tarde ", javaTarde.length);
    console.log("java Noche ", javaNoche.length);
    console.log("java Full ", javaFulllTime.length);
    console.log("type Mañana ", typeManana.length);
    console.log("type Tarde ", typeTarde.length);
    console.log("type Noche ", typeNoche.length);
    console.log("type Full ", typeFulllTime.length);
    console.log("PY Mañana ", pyManana.length);
    console.log("PY Tarde ", pyTarde.length);
    console.log("PY Noche ", pyNoche.length);
    console.log("PY Full ", pyFullTime.length);

    const arraysLength =
      reactManana.length +
      reactTarde.length +
      reactNoche.length +
      reactFullTime.length +
      uxManana.length +
      uxTarde.length +
      uxNoche.length +
      uxFulllTime.length +
      nodeManana.length +
      nodeTarde.length +
      nodeNoche.length +
      nodeFulllTime.length +
      javaManana.length +
      javaTarde.length +
      javaNoche.length +
      javaFulllTime.length;
    console.log(arraysLength);

    // Node + React MAÑANA 26 - 62
    let i = 0;
    let nodereactmanana = 0;
    let nodereacttarde = 0;

    i = 0;
    numero = 0;
    nodeManana.forEach((node) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${node.email};NODE;m;NODE REACT MAÑANA`);
      i++;
    });

    nodereactmanana = numero;

    i = 0;
    numero = 0;
    reactManana.forEach((react) => {
      if (i % 6 == 0) {
        numero++;
      }
      if (numero > nodereactmanana) {
        return;
      }
      teams.push(`${numero};${react.email};REACT;m;NODE REACT MAÑANA`);
      i++;
    });

    i = 0;
    numero = 0;
    uxManana.forEach((ux) => {
      if (i % 1 == 0) {
        numero++;
      }
      if (numero > nodereactmanana) {
        return;
      }
      teams.push(`${numero};${ux.email};UX;m;NODE REACT MAÑANA`);
      i++;
    });

    /// NODE TARDE
    i = 0;
    numero = 0;
    nodeTarde.forEach((node) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${node.email};NODE;t;NODE REACT TARDE`);
      i++;
    });

    nodereacttarde = numero;

    i = 0;
    numero = 0;
    reactTarde.forEach((react) => {
      if (i % 5 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${react.email};REACT;t;NODE REACT TARDE`);
      i++;
    });

    i = 0;
    numero = 0;
    uxTarde.forEach((ux) => {
      if (i % 1 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${ux.email};UX;t;NODE REACT TARDE`);
      i++;
    });

    /// NODE NOCHE
    i = 0;
    numero = 0;
    nodeNoche.forEach((node) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${node.email};NODE;n;NODE REACT NOCHE`);
      i++;
    });

    nodereacttarde = numero;

    i = 0;
    numero = 0;
    reactNoche.forEach((react) => {
      if (i % 5 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${react.email};REACT;n;NODE REACT NOCHE`);
      i++;
    });

    i = 0;
    numero = 0;
    uxNoche.forEach((ux) => {
      if (i % 1 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${ux.email};UX;n;NODE REACT NOCHE`);
      i++;
    });

    /// NODE FULLTIME
    i = 0;
    numero = 0;
    nodeFulllTime.forEach((node) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${node.email};NODE;ft;NODE REACT FULL`);
      i++;
    });

    nodereacttarde = numero;

    i = 0;
    numero = 0;
    reactFullTime.forEach((react) => {
      if (i % 5 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${react.email};REACT;ft;NODE REACT FULL`);
      i++;
    });

    i = 0;
    numero = 0;
    uxFulllTime.forEach((ux) => {
      if (i % 1 == 0) {
        numero++;
      }
      if (numero > nodereacttarde) {
        return;
      }
      teams.push(`${numero};${ux.email};UX;ft;NODE REACT FULL`);
      i++;
    });

    /// JAVA TARDE
    i = 0;
    numero = 0;
    javaManana.forEach((JAVA) => {
      if (i % 6 == 0) {
        numero++;
      }
      teams.push(`${numero};${JAVA.email};JAVA;m;JAVA REACT MAÑANA`);
      i++;
    });

    /// JAVA FULL
    i = 0;
    numero = 0;
    javaFulllTime.forEach((JAVA) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${JAVA.email};JAVA;ft;JAVA REACT FULL`);
      i++;
    });

    /// JAVA NOCHE
    i = 0;
    numero = 0;
    javaNoche.forEach((JAVA) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${JAVA.email};JAVA;n;JAVA REACT NOCHE`);
      i++;
    });

    /// JAVA TARDE
    i = 0;
    numero = 0;
    javaTarde.forEach((JAVA) => {
      if (i % 6 == 0) {
        numero++;
      }
      teams.push(`${numero};${JAVA.email};JAVA;t;JAVA REACT TARDE`);
      i++;
    });

    // /// TYPE MAÑANA
    // i = 0;
    // numero = 0;
    // typeManana.forEach((tipo) => {
    //   numero++;
    //   teams.push(`${numero};${tipo.email};TYPE;TARDE;TYPE MAÑANA`);
    //   i++;
    // });

    // /// TYPE FULL
    // i = 0;
    // numero = 0;
    // typeFulllTime.forEach((tipo) => {
    //   numero++;
    //   teams.push(`${numero};${tipo.email};TYPE;FULL;TYPE FULL`);
    //   i++;
    // });

    i = 0;
    numero = 0;
    pyNoche.forEach((py) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${py.email};python;n;py REACT NOCHE`);
      i++;
    });

    i = 0;
    numero = 0;
    pyTarde.forEach((py) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${py.email};python;t;py REACT NOCHE`);
      i++;
    });

    i = 0;
    numero = 0;
    pyManana.forEach((py) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${py.email};python;m;py REACT NOCHE`);
      i++;
    });

    i = 0;
    numero = 0;
    pyFullTime.forEach((py) => {
      if (i % 5 == 0) {
        numero++;
      }
      teams.push(`${numero};${py.email};python;ft;py REACT NOCHE`);
      i++;
    });

    console.log(teams);
    console.log(teams.length);

    if (teams.length > 0) {
      let fullnamesWithSpace = teams.join("\n");
      fs.writeFileSync("Template S15.txt", fullnamesWithSpace);
    }
  } catch (error) {
    console.log(error);
  }
}

createTeams();
