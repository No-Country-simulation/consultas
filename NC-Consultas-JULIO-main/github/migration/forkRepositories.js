const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

let token = process.env.TOKEN_JULIO;
const octokit = new Octokit({ auth: token });

console.log(token);
let errores = [];
const repos = ["c18-76-n-data-bi"];
let res;
async function forkRepo() {
  let i = 0;
  console.log(`Repositorios para forkear: ${repos.length}`);
  for (const repo of repos) {
    i++;
    try {
      res = await octokit.request("POST /repos/{owner}/{repo}/forks", {
        owner: "No-Country",
        repo: repo,
        organization: "No-Country-simulation",
        name: repo,
        default_branch_only: false,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log(i + " " + res.status + " " + repo);
    } catch (error) {
      errores.push(repo);
      console.log(i + " " + repo + " " + error.response.data.message);
      // console.log(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  if (errores) {
    let archivo = errores.join("\n");
    fs.writeFileSync("./github/erroresfork.txt", archivo);
  }
}

forkRepo();
