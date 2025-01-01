const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

async function getReposNames() {
  let page = 0;
  let cant = 0;
  let res;
  let repos = [];
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

    console.log(page);
    console.log(res.data.length);
    cant += res.data.length;

    res.data.forEach((data) => {
      const nombre = data.name.toLowerCase();
      // if (nombre.includes("c18") || nombre.includes("s15")) {
      repos.push(data.name);
      // }
    });
  } while (res.data.length > 0);

  console.log(cant);
  console.log(repos);

  // return;
  let archivo = repos.join("\n");

  fs.writeFileSync("./github/ejemplo pu.txt", archivo);
}

getReposNames();
