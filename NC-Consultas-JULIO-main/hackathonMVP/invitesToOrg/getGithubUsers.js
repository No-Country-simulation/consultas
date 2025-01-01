const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getGithubUsers() {
  let githubs = [];
  let token = process.env.TOKEN;

  githubs = [
    "https://github.com/DamBeDev",
    "https://github.com/leonasturizaga",
    "https://github.com/rodrigo-georgetti",
    "https://github.com/MatiFiordelli",
    "https://github.com/valeday",
    "https://github.com/Pablo2311",
  ];
  //remueve duplicados

  let uniqGithubs = [...new Set(githubs)];

  normalizedGithubs = [];

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

  fs.writeFileSync("./hackathonMVP/invitesToOrg/Hackathon 4.txt", githubUsers);
}

getGithubUsers();
