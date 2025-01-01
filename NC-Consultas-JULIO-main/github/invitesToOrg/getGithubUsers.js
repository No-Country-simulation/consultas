const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getGithubUsers() {
  let githubs = [];
  let token = process.env.TOKEN;

  const res = await axios.get(`${process.env.BACK_URL}members`, {
    // const res = await axios.get(`${process.env.BACK_URL}members/new`, {
    headers: { token: `Bearer ${token}` },
  });

  // const members = res.data.getNewMembers;

  const members = res.data.getAllMembers;
  console.log(members.length);
  // ""
  // return;
  members.forEach((m) => {
    m.cohortHistory.map((mh) => {
      //ELEGIR EL NUMERO DE COHORTE
      if (mh.cohort == 22 && m.github != null) {
        githubs.push(m.github);
      }
    });

    m.selectionHistory.map((mh) => {
      //ELEGIR EL NUMERO DE COHORTE
      if (mh.selection == 19 && m.github != null) {
        githubs.push(m.github);
      }
    });

    //   // if (m.github != null) {
    //   //   githubs.push(m.github);
    //   // }
  });

  //remueve duplicados

  let uniqGithubs = [...new Set(githubs)];
  console.log(githubs.length);
  console.log(uniqGithubs.length);

  normalizedGithubs = [];

  console.log(uniqGithubs);
  // return;

  //normaliza, quita urls, quita @, quita linkedin, quita behance
  for (let i = 0; i < uniqGithubs.length; i++) {
    console.log(uniqGithubs[i]);
    if (
      uniqGithubs[i].includes("/") &&
      !uniqGithubs[i].includes("behance") &&
      !uniqGithubs[i].includes("linkedin")
    ) {
      let aux = uniqGithubs[i].split("/");
      normalizedGithubs.push(aux[aux.length - 1]);
    } else if (
      !uniqGithubs[i].includes("/") &&
      !uniqGithubs[i].includes("@") &&
      !uniqGithubs[i].includes("behance") &&
      !uniqGithubs[i].includes("linkedin")
    ) {
      normalizedGithubs.push(uniqGithubs[i]);
    }
  }
  console.log(uniqGithubs.length, "before normalize");
  console.log(normalizedGithubs.length, "after normalize");

  let githubUsers = normalizedGithubs.join("\n");

  fs.writeFileSync("./github/invitesToOrg/C22 nuevos.txt", githubUsers);
}

getGithubUsers();

//19:31
