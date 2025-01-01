const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { Octokit } = require("@octokit/core");
// const users = require("./githubsUsersC18");

let token = process.env.GITHUB_TOKEN;
token = "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";
const octokit = new Octokit({ auth: token });

async function getInvitations() {
  let members = [];

  let page = 0;
  let cant = 0;
  let res;

  do {
    page++;

    res = await octokit.request("GET /orgs/{org}/invitations", {
      org: "No-Country-simulation",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    res.data.forEach((d) => {
      console.log(d.login);
      members.push(d.login);
    });
  } while (res.data.length > 0);

  // return;
  // //3- https://api.github.com/users/:user ENDPOINT para obtener el id del user
  // let res;
  // let idsArray = [];
  // try {
  //   // res = await octokit.request("GET /orgs/{org}/invitations", {
  //   //   org: "No-Country-simulation",
  //   //   per_page: 100,
  //   //   headers: {
  //   //     "X-GitHub-Api-Version": "2022-11-28",
  //   //   },
  //   // });
  //   // console.log(res.data.length);
  //   // res.data.forEach((d) => {
  //   //   console.log(d.login);
  //   // });
  //   //members
  //   const octokit = new Octokit({
  //     auth: token,
  //   });
  //   res = await octokit.request("GET /orgs/{org}/members", {
  //     org: "No-Country-simulation",
  //     per_page: 100,
  //     headers: {
  //       "X-GitHub-Api-Version": "2022-11-28",
  //     },
  //   });
  //   console.log(res.data.length);
  //   res.data.forEach((d) => {
  //     console.log(d.login);
  //   });
  // } catch (error) {
  //   console.log(error.status);
  //   // console.log(error);
  // }
}

async function getMembers() {
  // return;

  let members = [];

  let page = 0;
  let cant = 0;
  let res;

  do {
    page++;

    res = await octokit.request("GET /orgs/{org}/members", {
      org: "No-Country-simulation",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    res.data.forEach((d) => {
      members.push(d.login);
      console.log(d.login);
    });
  } while (res.data.length > 0);
}

getInvitations();
getMembers();
