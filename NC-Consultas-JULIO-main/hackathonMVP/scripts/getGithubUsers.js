const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "./hackathonMVP/Hackathon por Justina - Registro (13).xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let inscriptos = [];

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    inscriptos.push(res);
  });
}

console.log(inscriptos.length);

let githubUsers = [];

async function checkInscriptos() {
  try {
    let token = process.env.TOKEN;
    console.log("Hols");
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjAwNzA4MzYsImV4cCI6MTY2MDMzMDAzNn0.nIPjdiTHSq1hnzDFV4oayffqqBQAOjPYQH0_e4W7yMM"
    const res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}members`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const members = res.data.getAllMembers;
    console.log(members.length);

    inscriptos.forEach((inscip) => {
      const encontrado = members.find((m) => m.email == inscip.Email);
      if (encontrado) {
        if (encontrado.github) githubUsers.push(encontrado.github);
        // console.log(`Encontrado : ${inscip.Email}`);
      } else {
        console.log(`NO Encontrado : ${inscip.Email}`);
      }
    });

    githubUsers.forEach((gh) => {
      console.log(gh);
    });
  } catch (error) {
    console.log(error);
  }
}

checkInscriptos();

// Viernes 21 a la noche
// https://github.com/IsaacFloresv
// https://max-cereceda.vercel.app/
// https://github.com/annath29
// GitHub.com/cotamo1901
// https://github.com/Fajimeth
// https://github.com
// https://leonardofvp.github.io/portafolio/
// https://github.com/sbtn63
// https://github.com/Cristiancm49
// https://github.com/De1t4
// https://github.com/No-Country/c17-99-t-data-bi
// https://github.com/adrian120401
// https://github.com/AdelFetner
// https://github.com/Chinaskidev
// https://github.com/agusbcl
// https://github.com/DDarioBenitez
// https://www.behance.net/lisandrarguell1
// github.com/Juampi095
// https://github.com/MatiViglianco
// https://github.com/Visual2024
// https://www.behance.net/vaninarestelli
// https://github.com/MatiasNicolasAcevedo
// https://github.com/snowingt
// https://www.youtube.com/watch?v=6vlvtmwKsMU
// https://github.com/andres101010
// www.github.com/spimentel1201
// https://github.com/Melisayunis
// AlanProgrammer93
// luleheco
// https://alexandromoroz.github.io
// https://github.com/jlcapor
// https://silviorosas.netlify.app/#cont
// JuanNebbia
// https://github.com/DMRamirezZarta
// https://github.com/julandrod
// https://github.com/jlcapor
// https://www.behance.net/juanlobo6
// https://github.com/AdnerbImohan1107
// https://github.com/FacundoMarcoBacigalupo
// https://github.com/GustavoJCL/
// https://github.com/rodrikohnen
// https://github.com/drr2021
// https://mi-portafolio-seven-sigma.vercel.app/
// frishlin
// https://github.com/nicolemos
// https://github.com/sandris192024
// https://github.com/Abisol-2711
// be.net/rodso
// https://github.com/espinozayff
// https://portafolio-taupe-nine.vercel.app/
// www.migueldigitalweb.com
// https://github.com/xsebasx3
// github.com/Gabot3ck
// Jerry0811
// https://github.com/kevinb45 / https://www.behance.net/kevingrassi
// https://github.com/jigcolapaolo
// https://github.com/Madays
// KatuGT
// https://github.com/Jjfonsecab
// https://github.com/jlcapor
// https://www.behance.net/ce_ibanez
// https://www.behance.net/galarzamarcela
// https://github.com/valeday
// https://github.com/mateok13
// https://github.com/gustavo-arza
// https://www.behance.net/uirodriruiz
// https://www.behance.net/FlorenciaAbrilSarkis
// https://github.com/Armando-Amezquita
// https://github.com/Gabyp05
// behance.net/paucreation
// https://github.com/Lourdes69
// https://www.behance.net/sebasrgomez90
// https://github.com/xiriuxb
// https://github.com/CrisStudyZone
// https://github.com/OskrAraujo
// www.josefinacdesign.com
// https://github.com/franklinjunior23
// https://github.com/valeday
// https://www.behance.net/luciafgangi
// https://github.com/ThamairyGonzalez/RepositorioDePrueba
// https://github.com/David-Coach-Dev
// https://github.com/MarcossIC
// https://github.com/robertrengel
// https://github.com/zaicrot
// https://alan-porfolio-web.netlify.app/
// https://github.com/francojnieva
// https://github.com/ChristopherPeralta
// https://github.com/emanuelpps
// https://www.behance.net/ismaelmiranda4
// https://github.com/kevin3080
// https://github.com/MikhailIvanGarcilano
// https://github.com/gustavo-arza
// https://github.com/PabloMagna
// https://github.com/rodrikohnen
// https://github.com/Dexametasona
// https://github.com/GuillermoDivan
// https://github.com/MiguelAChavez
// https://github.com/An7h0ny1
// https://www.behance.net/gastaldistudio
// https://github.com/CarlosV319
// yovana888
// evincere
// https://github.com/federicoDicillo
// https://metaldev.com.ar/
// https://github.com/luztabraj
// https://www.behance.net/gallery/198122997/Personal-Portfolio
// https://github.com/LauryCGit
// mikelm2020
// https://github.com/snowingt
// https://github.com/Edgardosilva
// https://github.com/fer-gab-sua/
// https://mariabebion.my.canva.site/mariabebionportfolio
// https://www.behance.net/ivanmedina13
