//obtengo los miembros (para reporte de MVP)
//ultimos verticales roles, etc,
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.BACK_URL);
let roles = [];
let verticales = [];
let rol = "";
let vertical = "";

async function getMiembros() {
  let memberNormalized = [];
  let token = process.env.TOKEN;
  console.log("Hols");

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
      "Fullname;Email;Seleccionado;Pais;Edad;Telefono;Git;Linkedin;Ultima vertical;verticales;Ultimo rol;roles;Simulaciones"
      // "Fullname;Email;Filtro;tl;Pais;Telefono;Git;Linkedin;Cohorte;Vertical;Len;Area;Stack;Experience;dispo;number;assigned"
    );
  }

  console.log(members.length);
  members.forEach((m) => {
    if (m.number > 0) {
      roles = [];
      rol = "";
      verticales = [];
      vertical = "";

      m.cohortHistory.forEach((c) => {
        roles.push(c.area);
        verticales.push(c.vertical);
      });
      m.selectionHistory.forEach((s) => {
        roles.push(s.area);
        verticales.push(s.vertical);
      });

      roles.sort();
      roles = [...new Set(roles)];
      rol = roles[roles.length - 1];

      verticales.sort();
      verticales = [...new Set(verticales)];
      vertical = verticales[verticales.length - 1];

      memberNormalized.push(
        m.fullname +
          ";" +
          m.email +
          ";" +
          m.filterPassed +
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
          vertical +
          ";" +
          verticales.join(" ") +
          ";" +
          rol +
          ";" +
          roles.join(" ") +
          ";" +
          m.number
      );
    }
  });

  if (memberNormalized.length > 0) {
    let fullnamesWithSpace = memberNormalized.join("\n");
    fs.writeFileSync("Miembros seleccionado.txt", fullnamesWithSpace, "utf-8");
  }
}

getMiembros();
