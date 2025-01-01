const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
const { CancellationToken } = require("mongodb");
dotenv.config();
//node '/home/user/NC-Consultas-JULIO/github/visibility/cahngeVisibilityActualRepos.js'
// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

async function getReposNames() {
  let page = 0;
  let cant = 0;
  let res;
  let repos = [];
  let reposNuevos = [];
  do {
    page++;
    res = await octokit.request("GET /orgs/{org}/repos", {
      org: "No-Country-simulation",
      type: "public",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    cant += res.data.length;

    res.data.forEach((data) => {
      const nombre = data.name.toLowerCase();
      // if (nombre.includes("c18") || nombre.includes("s15")) {
      reposNuevos.push(data.name);
      // }
    });
  } while (res.data.length > 0);
  console.log(cant);
  cant = 0;
  page = 0;
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

    cant += res.data.length;

    res.data.forEach((data) => {
      const nombre = data.name.toLowerCase();
      // if (nombre.includes("c18") || nombre.includes("s15")) {
      repos.push(data.name);
      // }
    });
  } while (res.data.length > 0);
  console.log(cant);
  // console.log(repos);

  // return;
  // let archivo = repos.join("\n");

  // fs.writeFileSync("./github/paraforkear.txt", archivo);

  // console.log(repos)
  let delta = [];
  for (const repo of repos) {
    if (!reposNuevos.includes(repo)) {
      delta.push(repo);
    }
  }
  console.log(delta);
  let archivo = delta.join("\n");

  fs.writeFileSync("./github/delta.txt", archivo);
}

getReposNames();
