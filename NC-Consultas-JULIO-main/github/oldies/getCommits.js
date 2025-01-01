const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
const { isDeepStrictEqual } = require("util");
dotenv.config();

let token = "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"
const octokit = new Octokit({ auth: token });

async function getCommits(){

    try{
        let commits = [];

   // TRAE TODOS LOS COMMITS DE UNA BRANCH DETERMINADA
        // const response = await octokit.request('GET /repos/{org}/{repo}/commits', {
        //     org: "No-Country",
        //     repo: 'C3-G07',
        //     sha:'develop',  //branch
    
        // })

        

        //GUARDAR EL AUTHOR Y UNA VARIABLE QUE SUME CANTIDAD
        // response.data.map((commit) => {
        //     commits.push({author: commit.author.login, commits: response.data.length})
        // })
        // const octokit = new Octokit({
        //     auth: 'YOUR-TOKEN'
        //   })
          

        
        let index = 0

        
        do {

            index ++
            res = await octokit.request('GET /orgs/{org}/repos', {
                org: 'No-Country',
                type: "public",
                per_page: 100,
                page: index
    
              })
            
            if (res.data.length > 0) {
                
                res.data.forEach(repo => {
                    if (repo.private == false)  {
                    console.log(repo.name + " " + repo.commits_url + " " + repo.deployments_url)
                        
                    }
                    
                });

            }
            
        } while (res.data.length > 0);
            


    }
    catch(err){
        console.log(err)
    }


}


getCommits();