//Reporte de excel de los equipos, cohorte y seleccionado, con la info de todos los miembros
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getTeams() {
  let teamsC3 = [];
  let teamsNormalized = [];
  let token = process.env.TOKEN;

  const res = await axios.get(`${process.env.LOCALHOST}teams`, {
    headers: { token: `Bearer ${token}` },
  });

  const allTeams = res.data.getAllTeams;
  // console.log(allTeams);

  // allTeams.map((team) => {
  //     if(/^C3/.test(team.name)){
  //       teamsC3.push(team)
  //     }
  // })

  // console.log(teamsC3);

  if (allTeams.length > 0) {
    teamsNormalized.push(
      "Cohorte;Grupo;Miembro;Email;Telefono;Area;Lenguaje;Stack;Disponibilidad"
    );
  }
  allTeams.map((team) => {
    team.members.forEach((member) => {
      // teamsNormalized.push(team.name.substring(0,2) + ";" + team.name.toLowerCase() + ";" + member.fullname + ";" + member.email + ";" + member.telefono);

      if (team.name.charAt(0) === "C") {
        member.cohortHistory.forEach((c) => {
          // if (c.cohort == team.name.charAt(1)) {

          if (c.cohort == team.name.substring(1, 2)) {
            teamsNormalized.push(
              `C${c.cohort}` +
                ";" +
                team.name.toLowerCase() +
                ";" +
                member.fullname +
                ";" +
                member.email +
                ";" +
                member.phone +
                ";" +
                c.area +
                ";" +
                c.language +
                ";" +
                c.stack +
                ";" +
                c.availability
            );
          }
        });
      } else if (team.name.charAt(0) === "S") {
        member.selectionHistory.forEach((s) => {
          // console.log(s.selection + "    " + team.name.charAt(1));
          if (s.selection == team.name.charAt(1)) {
            // console.log("holis");
            teamsNormalized.push(
              `S${s.selection}` +
                ";" +
                team.name.toLowerCase() +
                ";" +
                member.fullname +
                ";" +
                member.email +
                ";" +
                member.phone +
                ";" +
                s.area +
                ";" +
                s.language +
                ";" +
                s.stack +
                ";" +
                s.availability
            );
          }
        });

        // member.cohortHistory.forEach(s => {
        //     // console.log(s.selection + "    " + team.name.charAt(1));
        //     if (s.cohort == '9') {
        //         // console.log("holis");
        //         teamsNormalized.push(team.name.substring(0,2) + ";" + team.name.toLowerCase() + ";" + member.fullname + ";" + member.email + ";" + member.phone + ";" + s.area + ";" + s.language  + ";" + s.stack + ";" + s.availability)

        //     }

        // })
      }
    });
  });

  if (teamsNormalized.length > 0) {
    let fullnamesWithSpace = teamsNormalized.join("\n");
    fs.writeFileSync("Para crear.txt", fullnamesWithSpace);
  }

  // teamsC3.map((team) => {
  //     team.members.forEach((member) => {
  //         teamsNormalized.push({
  //             name: team.name,
  //             member: member.fullname,
  //             github: member.github,
  //             phone: member.phone,
  //             stack: member.cohortHistory[cohortHistory.length - 1].stack,
  //             language: member.cohortHistory[cohortHistory.length - 1].language,
  //             area: member.cohortHistory[cohortHistory.length - 1].area
  //         })
  //     })
  // })

  // teamsNormalized.push(teamsC3[0].members.forEach(m => m.cohortHistory.filter(c => c.cohort === 3)))
  // console.log(teamsNormalized);

  // for(let i = 0; i < teamsC3.length; i++){

  // }
  // console.log(teamsNormalized);
  //visualizar la info de cada equipo por miembro , nombre, lenguaje, area, stack, github, telefono

  // teams.forEach((m) => {
  //     m.cohortHistory.map((mh) => {
  //         //ELEGIR EL NUMERO DE COHORTE
  //         if(mh.cohort === 3){
  //             teams.push(m.fullname)
  //         }
  //     })
  // })

  // let teamsWithSpace = teams.join('\n')

  // fs.writeFileSync('teamleadersC3.txt', teamsWithSpace);
}

getTeams();
