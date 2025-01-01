//Reporte de excel de los equipos, cohorte y seleccionado, con la info de todos los miembros
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const inscriptos = [
  "roddericckk@gmail.com",
  "jinbyos@gmail.com",
  "mateoroserok13@gmail.com",
  "isabelle.cristine19@gmail.com",
  "araujo.oskr@gmail.com",
  "elideicersm@gmail.com",
  "elianfajimethcontreras@gmail.com",
  "ingthamairyg@gmail.com",
  "balcarcelagustina@gmail.com",
  "olezdev@gmail.com",
  "carballolaury@gmail.com",
  "rossileandrof@gmail.com",
  "ad.contacto7@gmail.com",
  "rodso.design@gmail.com",
  "tomascrespoes@gmail.com",
  "gustavo.arza@gmail.com",
  "thomendavid1@gmail.com",
  "machicadogomezalexander@gmail.com",
  "franco97nieva@gmail.com",
  "matifiordelli@gmail.com",
  "cinthialacolocha90@gmail.com",
  "daianacaffiero@gmail.com",
  "valerie22@live.com",
  "matias.nicolas.acevedo@gmail.com",
  "marcofacundolucas@gmail.com",
  "camilom200107@gmail.com",
  "lisandromarguello@gmail.com",
  "cynthiaolocco@gmail.com",
  "romero.darior@gmail.com",
  "yosmaparica@gmail.com",
  "secondmtx@gmail.com",
  "lucianamazur62@gmail.com",
  "felipe.calderon321@gmail.com",
  "work.maday@gmail.com",
  "kevinb45@gmail.com",
  "rodri.br18@gmail.com",
  "sandris19@gmail.com",
  "luz.tabrajb@gmail.com",
  "andres.segura.dev@gmail.com",
  "guillermodivan@hotmail.com",
  "emanuelpages.ps@gmail.com",
  "solabigail00@hotmail.com",
  "restellivanina@gmail.com",
  "paula.mar@gmx.com",
  "mymarce27@gmail.com",
  "alexandromoroz5@gmail.com",
  "pmagnavachi@gmail.com",
  "petterssonfacundo@gmail.com",
  "mauriciochambicaceres@gmail.com",
  "andiellie@gmail.com",
  "mgyanira96.2020@gmail.com",
  "agustin2051@gmail.com",
  "angelomonteroosorio@gmail.com",
  "ccasani93@gmail.com",
  "chavez.miguel.angel154@gmail.com",
  "edgardosilva.es@gmail.com",
  "gabyapd05@gmail.com",
  "mabebion.mb@gmail.com",
  "g44ravarotto@gmail.com",
  "azarjpm15@gmail.com",
  "esteban.adrian.gonz@gmail.com",
  "maurol.dev@gmail.com",
  "facurael@gmail.com",
  "florsarkis@gmail.com",
  "ivan.luciano.medina@gmail.com",
  "mikhailgarcilano1997@gmail.com",
  "93katu@gmail.com",
  "davidmedev@gmail.com",
  "sebasr.gomez90@gmail.com",
  "contacto.armiranda@gmail.com",
  "gvillegas1276@gmail.com",
  "lemosnicolas92@gmail.com",
  "sebasxgc@outlook.com",
  "alexmarinmendez@gmail.com",
  "spimentelm1201@gmail.com",
  "cvaleriocenteno.88@gmail.com",
  "rblazquez111@gmail.com",
  "juan.nebbia@gmail.com",
  "lucasscifo14@gmail.com",
  "91bluesora@gmail.com",
  "michaelbarboza7@gmail.com",
  "ceredondas@gmail.com",
  "ce.ibanez@gmail.com",
  "analaura.alaminoc@gmail.com",
  "bjcampagnoli@gmail.com",
  "reedq2.alt@gmail.com",
  "martinkunbrc@hotmail.com",
  "afgomezv@hotmail.com",
  "jossrobson@gmail.com",
  "isaacfloresva@gmail.com",
  "imnordi@gmail.com",
  "leonasturizaga@gmail.com",
  "lorena.lizamag@gmail.com",
  "ccortesm2000@gmail.com",
  "yunismelisa@gmail.com",
  "fer.gab.sua@gmail.com",
  "d.berrojalvis@gmail.com",
  "cereceda1991@gmail.com",
  "alvaroamestoycontact@gmail.com",
  "juanignaciolobo97@gmail.com",
  "pachecolobos.felix@gmail.com",
  "juangreen17@gmail.com",
  "rafaelstrongoli@gmail.com",
  "yordychoque124@gmail.com",
  "espinozayeff@gmail.com",
  "mamiehijos@gmail.com",
  "alejodi@gmail.com",
  "eschenmoserv@gmail.com",
  "cordobajosefinam@gmail.com",
];

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
      "Cohorte;Grupo;Miembro;Email;Telefono;Area;Lenguaje;Stack;Disponibilidad;teamLeader;canal;meet"
    );
  }
  allTeams.map((team) => {
    // teamsNormalized.push(
    //   team.name.substring(0, 3) +
    //     ";" +
    //     team.name.toLowerCase() +
    //     ";" +
    //     "NC" +
    //     ";" +
    //     "nocountryforjuniordevs@gmail.com" +
    //     ";" +
    //     "member.phone" +
    //     ";" +
    //     "c.area" +
    //     ";" +
    //     "c.language" +
    //     ";" +
    //     "c.stack" +
    //     ";" +
    //     "c.availability"
    // );

    team.members.forEach((member) => {
      // teamsNormalized.push(team.name.substring(0,2) + ";" + team.name.toLowerCase() + ";" + member.fullname + ";" + member.email + ";" + member.telefono);
      // console.log(team.name.slice(1, 2) + " " + team.name);

      // const encontrado = inscriptos.find((ins) => ins == member.email);
      // if (encontrado) {
      //   return;
      // }

      if (team.name.charAt(0) === "C" && team.name.startsWith("C21")) {
        member.cohortHistory.forEach((c) => {
          // if (c.cohort == team.name.charAt(1)) {

          if (c.cohort == 21) {
            teamsNormalized.push(
              `C${c.cohort}` +
                ";" +
                team.name +
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
                c.availability +
                ";" +
                c.teamLeader +
                ";" +
                team.channelId +
                ";" +
                team.meet
            );
          }
        });
      } else if (team.name.charAt(0) === "S" && team.name.startsWith("S18")) {
        member.selectionHistory.forEach((s) => {
          if (s.selection == 18) {
            teamsNormalized.push(
              `S${s.selection}` +
                ";" +
                team.name +
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
                s.availability +
                ";" +
                s.teamLeader +
                ";" +
                team.channelId +
                ";" +
                team.meet
            );
          }
        });
      } else if (team.name.startsWith("H2")) {
        member.hackathonMVPHistory.forEach((s) => {
          if (s.hackathon == 2) {
            teamsNormalized.push(
              `H${s.hackathon}` +
                ";" +
                team.name +
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
                s.availability +
                ";" +
                "N/A" +
                ";" +
                team.channelId +
                ";" +
                team.meet
            );
          }
        });
      }
    });
  });
  console.log(teamsNormalized.length);
  if (teamsNormalized.length > 0) {
    let fullnamesWithSpace = teamsNormalized.join("\n");
    fs.writeFileSync("Crear drive3.txt", fullnamesWithSpace);
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
