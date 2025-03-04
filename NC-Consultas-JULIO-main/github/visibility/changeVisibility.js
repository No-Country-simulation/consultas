//MODIF
const repos = [
  "h3-12-openlab",
  "equipo-h3-04-klowhub",
  "h3-07-klowhub",
  "h3-02-klowhub",
  "h3-09-klowhub",
  "equipo-h3-19-proptech",
  "equipo-h3-18-proptech",
  "h3-17-proptech",
  "h3-01-klowhub",
  "h3-01-klowhub-frontend",
  "equipo-h3-11-openlab",
  "h3-24-proptech-java-react",
  "h3-20-proptech",
  "H3-26-proptech",
  "h3-21-proptech",
  "h3-03-klowhub",
  "h3-10-klowhub",
  "h3-06-klowhub",
  "h3-08-klowhub",
  "equipo-h3-05-klowhub",
  "equipo-h3-25-proptech",
  "h3-13-openlab",
  "h3-23-proptech",
  "h3-14-bookie",
];

const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

async function changeVisibility() {
  try {
    for (const repo of repos) {
      const res = await octokit.request("PATCH /repos/{owner}/{repo}", {
        owner: "No-Country-simulation",
        repo: repo,
        visibility: "public",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      console.log(res.status + " " + repo);
    }
  } catch (error) {
    console.log(error);
  }
}

changeVisibility();
