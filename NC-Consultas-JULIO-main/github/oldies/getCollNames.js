const { Octokit } = require("@octokit/core");
const dotenv = require("dotenv");
dotenv.config();

let token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });


async function getCollaborators() {
   let collaborators = []; 

   const response = await octokit.request('GET /repos/{org}/{repo}/collaborators', {
    org: "No-Country",
    repo: 'C3-G07'
    
  })
  response.data.map((dev) => {
      if(dev.login !== 'superjonic'){
        collaborators.push(dev.login)
      }
  })
  console.log(collaborators);
}

getCollaborators()