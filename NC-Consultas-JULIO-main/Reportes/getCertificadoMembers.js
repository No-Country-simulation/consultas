//Reporte de Excel de todos los miembros del cohorte 6 y seleccionado 3. Para catalogo
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getFullNames() {
  let memberNormalized = [];
  let token = process.env.TOKEN;
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjAwNzA4MzYsImV4cCI6MTY2MDMzMDAzNn0.nIPjdiTHSq1hnzDFV4oayffqqBQAOjPYQH0_e4W7yMM"
  const res = await axios.get(
    `http://${process.env.LOCALHOST}:5000/api/members`,
    {
      // const res = await axios.get("http://localhost:5000/api/members", {
      headers: { token: `Bearer ${token}` },
    }
  );
  const members = res.data.getAllMembers;

  if (members.length > 0) {
    memberNormalized.push("Fullname;Email;Filtro;Area;stack;lag");
  }

  console.log(members.length);
  members.forEach((m) => {
    // if (m.selectionHistory.length > 0) {

    m.selectionHistory.forEach((c) => {
      if (c.selection == 14 && m.filterPassed == true) {
        memberNormalized.push(
          m.fullname +
            ";" +
            m.email +
            ";" +
            m.filterPassed +
            ";" +
            c.area +
            ";" +
            c.stack +
            ";" +
            c.language
        );
        //  + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `C${c.cohort}` + ";" + c.language + ";" + c.area + ";" + c.stack + ";" + c.experience)
      }
    });

    m.cohortHistory.forEach((c) => {
      if (c.cohort == 17 && m.filterPassed == true) {
        memberNormalized.push(
          m.fullname +
            ";" +
            m.email +
            ";" +
            m.filterPassed +
            ";" +
            c.area +
            ";" +
            c.stack +
            ";" +
            c.language
        );
        //  + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `C${c.cohort}` + ";" + c.language + ";" + c.area + ";" + c.stack + ";" + c.experience)
      }
    });

    // }
  });

  if (memberNormalized.length > 0) {
    console.log(memberNormalized.length);
    let fullnamesWithSpace = memberNormalized.join("\n");
    fs.writeFileSync("Certificados Mayo.txt", fullnamesWithSpace, "utf-8");
    console.log(memberNormalized.length);
  }
}

getFullNames();
