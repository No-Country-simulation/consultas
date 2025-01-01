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

async function createInvitation() {
  let data = fs.readFileSync("./github/invitesToOrg/C22 invitation.json");
  // let data = fs.readFileSync("./github/invitesToOrg/Procesar ERROR mar.json");
  // let data = fs.readFileSync("./github/invitesToOrg/SEL ERROR Dom.json");
  // let data = fs.readFileSync("./github/invitesToOrg/C18 ERROR Nuevos2.json");
  // let data = fs.readFileSync('./github/invitesToOrg/C6ERROR.json')
  let users = JSON.parse(data);

  try {
    // for(let i = 0; i < 200; i++){

    //    await octokit.request('POST /orgs/{org}/invitations', {
    //         org: 'No-Country',
    //         invitee_id: ids[i]

    //       })

    // }
    console.log(users.length);
    // return;
    for (let i = 0; i < users.length; i++) {
      // for (let i = 0; i < 100; i++) {
      console.log("Procesando registro N°: " + i);
      try {
        await octokit.request("POST /orgs/{org}/invitations", {
          org: "No-Country-simulation",
          // org: "No-Country",
          invitee_id: users[i].inviteid,
        });
        invitadosOK.push(users[i]);
      } catch (error) {
        invitadosError.push({
          user: users[i].user,
          inviteid: users[i].inviteid,
          error: error.message,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  console.log(invitadosOK);
  console.log(invitadosError);

  fs.writeFileSync(
    "./github/invitesToOrg/OK c22 Jueves.json",
    JSON.stringify(invitadosOK)
  );
  fs.writeFileSync(
    "./github/invitesToOrg/ERROR c22 Jueves.json",
    JSON.stringify(invitadosError)
  );
}

createInvitation();
