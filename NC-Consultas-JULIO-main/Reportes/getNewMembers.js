//Reporte excel de los nuevos miemrbos
const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();

async function getTeams()  {

    let memberNormalized = [];
    let token =process.env.TOKEN;

    const res = await axios.get("http://localhost:5000/api/members/new/", {headers: { token: `Bearer ${token}` },});

    const newMembers = res.data.getNewMembers;
    console.log(newMembers);
    if (newMembers.length > 0) {
        memberNormalized.push("Nombre;Apellido;Email;GIT")
    }


    newMembers.forEach(member => {




        memberNormalized.push(member.firstname + ";" + member.lastname + ";" + member.email + ";" + member.github)
    });
    

    if (memberNormalized.length > 0) {
        let fullnamesWithSpace = memberNormalized.join('\n')
        fs.writeFileSync('NUEVOS.csv', fullnamesWithSpace);
    }

   
}

getTeams();
