const repos = [
  's16-24-t-java-react-3',
  'c19-27-m-php-react',
  'c19-59-n-python-react',
  's16-01-ft-csharp-react'
];

const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// let token = process.env.GITHUB_TOKEN;
let token = "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";
const octokit = new Octokit({ auth: token });

async function deleteRepos() {
  try {
    for (const repo of repos) {
      const res = await octokit.request("DELETE /repos/{owner}/{repo}", {
        owner: "No-Country",
        repo: repo,
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

deleteRepos();
