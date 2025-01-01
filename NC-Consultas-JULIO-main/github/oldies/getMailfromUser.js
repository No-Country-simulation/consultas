const dotenv = require("dotenv");
dotenv.config();
const { Octokit } = require("@octokit/core");

let token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });


async function getMailFromUser(){


    try{
        await octokit.request('GET /users/{username}', {
            username: 'Reptilcuantico99'
          })


    }
    catch(err){
        console.log(err)
    }
}

getMailFromUser();