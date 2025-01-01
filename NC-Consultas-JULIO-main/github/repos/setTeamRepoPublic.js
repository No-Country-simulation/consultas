const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "C:/Users/julio/Downloads/Repositorios (2).xlsx"

async function getTeams() {
    const res = await axios.get(
      `http://${process.env.LOCALHOST}:5000/api/teams`,
      {
        headers: { token: `Bearer ${process.env.TOKEN}` },
      }
    );
  
    return res.data.getAllTeams;
  }

let output = []
async function getRepos() { 



    try {
        teams = await getTeams();
        console.log(teams.length);

        output.push("equipo;repo;status")

        for (let i = 0; i < teams.length; i++) {

            if (teams[i].repositoryList.length > 0) {
                let res;
                for (let j = 0; j < teams[i].repositoryList.length; j++) {
                    try {
                        res = await axios.get(teams[i].repositoryList[j].repo)
                        const info = `${teams[i].name};${teams[i].repositoryList[j].repo};${res.status}`
                        // console.log(info);
                        output.push(info)
                        
                    } catch (error) {
                        const info = `${teams[i].name};${teams[i].repositoryList[j].repo};${error.response.status}`
                        // console.log(info);
                        output.push(info)
                    }


                }

            }

        }

        if (output.length > 0) {
            let fullnamesWithSpace = output.join("\n");
            fs.writeFileSync("Reporte Repositorios poner.txt", fullnamesWithSpace, "utf-8");
          }

    } catch (error) {
        console.error(error);
    }

}


getRepos()