const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const repos = require("../reposNames");

let token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });

async function getInfoRepos() {
  //  console.log(repos)
  try {
    let info = [];

    for (let i = 0; i < repos.length; i++) {
      let branches = [];
      let collaborators = [];
      //Trae las ramas de cada uno de los repos
      const response = await octokit.request(
        "GET /repos/{org}/{repo}/branches",
        {
          org: "No-Country",
          repo: repos[i],
        }
      );

      //Guardar las branches del repo en un array
      response.data.map((branch) => {
        branches.push(branch.name);
      });

      //Trae los authors de cada uno de los repos
      const responseColl = await octokit.request(
        "GET /repos/{org}/{repo}/collaborators",
        {
          org: "No-Country",
          repo: repos[i],
        }
      );
      //Guardar los authors del repo en un array
      responseColl.data.map((dev) => {
        if (dev.login !== "superjonic") {
          collaborators.push(dev.login);
        }
      });

      info.push({ repo: repos[i], branch: branches, authors: collaborators });
    }
    console.log(info);

    fs.writeFileSync("./github/infoRepos.json", JSON.stringify(info));
  } catch (err) {
    console.log(err);
  }
}

getInfoRepos();
