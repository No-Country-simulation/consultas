const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const { Octokit } = require("@octokit/core");
// const ids = require("./UserIDC19");

// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

let invitadosOK = [];
let invitadosError = [];

async function getOutside() {
  let res;
  let page = 0;
  let cant = 0;
  let = outside = [];
  do {
    page++;
    res = await octokit.request("GET /orgs/{org}/failed_invitations", {
      // res = await octokit.request("GET /orgs/{org}/outside_collaborators", {
      org: "No-Country-simulation",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    console.log(page);
    console.log(res.data.length);

    cant += res.data.length;
    res.data.forEach((data) => {
      outside.push(data.login);
      //     const outside = data.name.toLowerCase();
      //     // if (nombre.includes("c18") || nombre.includes("s15")) {
      //     reposNuevos.push(data.name);
      //     // }
    });
  } while (res.data.length > 0);

  console.log(outside);
  console.log(outside.length);

  let archivo = outside.join("\n");
  fs.writeFileSync("./github/Failed.txt", archivo);
}

getOutside();
