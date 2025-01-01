const { Octokit } = require("@octokit/core");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

let teams = [];
let repos = [];

async function getReposNames() {
  let page = 0;
  let cant = 0;
  let res;

  do {
    page++;
    res = await octokit.request("GET /orgs/{org}/repos", {
      org: "No-Country",
      type: "public",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    // console.log(page);
    // console.log(res.data.length);
    // cant += res.data.length;

    res.data.forEach((data) => {
      repos.push({ name: data.name, nameLower: data.name.toLowerCase() });
    });
  } while (res.data.length > 0);

  console.log(cant);
  // console.log(repos);

  // return;
  let archivo = repos.join("\n");

  //   console.log(repos);
  // fs.writeFileSync("./github/c15.txt", archivo);
}

async function getTeams() {
  const res = await axios.get(
    `http://${process.env.LOCALHOST}:5000/api/teams`,
    {
      headers: { token: `Bearer ${process.env.TOKEN}` },
    }
  );

  teams = res.data.getAllTeams;
}

async function match() {
  let data = [];
  await getReposNames();
  await getTeams();
  console.log(teams.length);
  console.log(repos.length);
  data.push("Equipo;Repositorio");
  teams.forEach((t) => {
    let name = t.name.toLowerCase();
    const encontrado = repos.find((repo) => repo.nameLower == name);
    if (encontrado) {
      data.push(t.name + ";" + encontrado.name);
    } else {
      data.push(t.name + "; ");
    }
  });

  if (data.length > 1) {
    let salida = data.join("\n");
    fs.writeFileSync("Repos enero.txt", salida);
  }
}

match();
