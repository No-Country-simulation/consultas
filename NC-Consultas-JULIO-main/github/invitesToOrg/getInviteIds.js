const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { Octokit } = require("@octokit/core");
// const users = require("./githubsUsersC18");
// const users = require("./githubsSeleccionado");
const users = require("./C22 procesar copy.js");

let token = process.env.GITHUB_TOKEN;
token = "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";
const octokit = new Octokit({ auth: token });

async function getIds() {
  console.log(users.length);
  // return;

  //3- https://api.github.com/users/:user ENDPOINT para obtener el id del user
  let response;

  try {
    let idsArray = [];
    // console.log(users);
    // for(let i = 0; i < users.length; i++){
    //     console.log("Posicion: " + i);
    //     const response = await octokit.request('GET /users/{username}', {
    //         username: users[i]
    //       })

    //     idsArray.push( users[i] , response.data.id)

    // }

    for (let i = 0; i < users.length; i++) {
      // for(let i = 0; i < 8; i++){
      console.log("Posicion: " + i);
      try {
        response = await octokit.request("GET /users/{username}", {
          username: users[i],
        });
        idsArray.push({ user: users[i], inviteid: response.data.id });
      } catch (error) {
        console.log(error.status);
        // console.log(error);
      }
    }

    console.log(idsArray);
    fs.writeFileSync(
      "./github/invitesToOrg/C22 invitation.json",
      JSON.stringify(idsArray)
    );
  } catch (err) {
    console.log(err);
  }
}

getIds();
