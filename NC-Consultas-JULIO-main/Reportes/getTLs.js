const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getFullNames() {
  let memberNormalized = [];
  let token = process.env.TOKEN;

  const res = await axios.get(
    `http://${process.env.LOCALHOST}:5000/api/members`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );
  const members = res.data.getAllMembers;

  if (members.length > 0) {
    memberNormalized.push("Fullname;Email;TL;inst");
  }

  console.log(members.length);
  members.forEach((m) => {
    m.cohortHistory.forEach((c) => {
      if (c.cohort == 14) {
        //  memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `C${c.cohort}` + ";" + c.language + ";" + c.area + ";" + c.stack + ";" + c.experience)
        memberNormalized.push(
          m.fullname + ";" + m.email + ";" + c.teamLeader + ";C"
        );
      }
    });

    m.selectionHistory.forEach((s) => {
      if (s.selection == 11) {
        // memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `S${s.selection}` + ";" + s.language + ";" + s.area + ";" + s.stack + ";" + s.experience)
        memberNormalized.push(
          m.fullname + ";" + m.email + ";" + s.teamLeader + ";S"
        );
      }
    });
  });

  if (memberNormalized.length > 0) {
    let fullnamesWithSpace = memberNormalized.join("\n");
    fs.writeFileSync("TLs reporte 11.txt", fullnamesWithSpace);
  }
}

getFullNames();
