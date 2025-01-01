const { Octokit } = require("@octokit/core");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

let token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });


  //  TRAE TODOS LOS REPOS DE LA ORGANIZACION
  async function getReposNames(){
    let reposNames = [];  


    //PAGINA 1
    const response1 = await octokit.request('GET /orgs/{org}/repos', {
        org: 'No-Country',
        per_page: 100,
        page: 1
        
      })
      response1.data.map((repo) => {

            if(repo.name.indexOf('C') === 0 && repo.name.indexOf('3') === 1 ){
              reposNames.push(repo.name)
            }
            if(repo.name.indexOf('c') === 0 && repo.name.indexOf('3') === 1 ){
              reposNames.push(repo.name)
            }
            
        })
    
    //PAGINA 2
    const response2 = await octokit.request('GET /orgs/{org}/repos', {
      org: 'No-Country',
      per_page: 100,
      page: 2
            
    })    
    response2.data.map((repo) => {

        if(repo.name.indexOf('C') === 0 && repo.name.indexOf('3') === 1 ){
            reposNames.push(repo.name)
         }
        if(repo.name.indexOf('c') === 0 && repo.name.indexOf('3') === 1 ){
            reposNames.push(repo.name)
         }
            
    })  

    console.log(reposNames);

    // let repos = reposNames.join('\n')

    // fs.writeFileSync('./github/reposNames.txt', repos);

  }

  getReposNames()


