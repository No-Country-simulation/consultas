//Reporte de Excel de todos los miembros del cohorte 6 y seleccionado 3. Para catalogo
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.BACK_URL);
async function getFullNames() {
  let memberNormalized = [];
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
  // const members = res.data.getActualMembers;

  console.log(members.length);
  if (members.length > 0) {
    memberNormalized.push(
      "Fullname;Email;Filtro;tl;Pais;Edad;Telefono;Git;Linkedin;Cohorte;From;Vertical;Len;Area;Stack;Experience;dispo;number;assigned;slack"
      // "Fullname;Email;Filtro;tl;Pais;Telefono;Git;Linkedin;Cohorte;Vertical;Len;Area;Stack;Experience;dispo;number;assigned"
    );
  }

  console.log(members.length);
  members.forEach((m) => {
    // if (m.selectionHistory.length > 0) {

    m.cohortHistory.forEach((c) => {
      memberNormalized.push(
        m.fullname +
          ";" +
          m.email +
          ";" +
          m.filterPassed +
          ";" +
          c.teamLeader +
          ";" +
          m.country +
          ";" +
          m.age +
          ";" +
          m.phone +
          ";" +
          m.github +
          ";" +
          m.linkedin +
          ";" +
          `C${c.cohort}` +
          ";" +
          m.from +
          ";" +
          c.vertical +
          ";" +
          c.language +
          ";" +
          c.area +
          ";" +
          c.stack +
          ";" +
          c.experience +
          ";" +
          c.availability +
          ";" +
          m.number +
          ";" +
          c.assigned +
          ";" +
          m.slack
      );
    });

    m.selectionHistory.forEach((s) => {
      memberNormalized.push(
        m.fullname +
          ";" +
          m.email +
          ";" +
          m.filterPassed +
          ";" +
          s.teamLeader +
          ";" +
          m.country +
          ";" +
          m.age +
          ";" +
          m.phone +
          ";" +
          m.github +
          ";" +
          m.linkedin +
          ";" +
          `S${s.selection}` +
          ";" +
          m.from +
          ";" +
          s.vertical +
          ";" +
          s.language +
          ";" +
          s.area +
          ";" +
          s.stack +
          ";" +
          s.experience +
          ";" +
          s.availability +
          ";" +
          m.number +
          ";" +
          s.assigned +
          ";" +
          m.slack
      );
    });

    m.hackathonMVPHistory.forEach((c) => {
      memberNormalized.push(
        m.fullname +
          ";" +
          m.email +
          ";" +
          m.filterPassed +
          ";" +
          "N/A" +
          ";" +
          m.country +
          ";" +
          m.age +
          ";" +
          m.phone +
          ";" +
          m.github +
          ";" +
          m.linkedin +
          ";" +
          `H${c.hackathon}` +
          ";" +
          m.from +
          ";" +
          c.vertical +
          ";" +
          c.language +
          ";" +
          c.area +
          ";" +
          c.stack +
          ";" +
          "N/A" +
          ";" +
          c.availability +
          ";" +
          m.number +
          ";" +
          c.assigned +
          ";" +
          m.slack
      );
    });

    // }
  });

  if (memberNormalized.length > 0) {
    let fullnamesWithSpace = memberNormalized.join("\n");
    fs.writeFileSync("certificado c21.txt", fullnamesWithSpace, "utf-8");
  }
}

getFullNames();
