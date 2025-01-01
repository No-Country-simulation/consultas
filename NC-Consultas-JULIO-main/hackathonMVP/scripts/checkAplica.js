const clientes = [
  "91bluesora@gmail.com",
  "abgarcia2694@gmail.com",
  "agomezjuan@hotmail.com",
  "agus_rizzo@hotmail.com",
  "agustingmaggi@gmail.com",
  "ailen.martinez.rosica@gmail.com",
  "aj_mariano1998@outlook.com",
  "alvanesc@gmail.com",
  "analiaaraki@gmail.com",
  "andrescamcho6@gmail.com",
  "andycorz96@gmail.com",
  "antonio.deldujo@gmail.com anavarro67@hotmail.com",
  "asernacalle@gmail.com",
  "azarjpm15@gmail.com",
  "camiloduquee@gmail.com",
  "camilom200107@gmail.com",
  "carballolaury@gmail.com",
  "d.berrojalvis@gmail.com",
  "danauriburu@gmail.com",
  "dandrea.floresdeluz@gmail.com",
  "davidnobati@gmail.com",
  "defedeleboria@gmail.com",
  "diegohp.dev@gmail.com",
  "duranlautarogabriel@gmail.com",
  "elibargaz@hotmail.com",
  "emanuelpages.ps@gmail.com",
  "emavalente.dev@gmail.com",
  "emiliopino.ar@gmail.com",
  "fede_pelourson@hotmail.com",
  "fer.gab.sua@gmail.com",
  "flavia.garcia.piotto@gmail.com",
  "gabm.remes@gmail.com",
  "gabyapd05@gmail.com",
  "germanosimani@gmail.com",
  "gja1960@gmail.com",
  "gloriaramosmoran@gmail.com",
  "goraffo@gmail.com",
  "ignaciofernandezdeveloper@gmail.com",
  "jaguargomezcom@gmail.com",
  "jatrujilloch1@gmail.com",
  "javierdamiani74@gmail.com",
  "jedamogar@gmail.com",
  "jordan11.tauro@gmail.com",
  "jpugliese2190@gmail.com",
  "kmayoralp@gmail.com",
  "laura.guauq@gmail.com",
  "lautarodisalvo5@gmail.com",
  "leandroyasutake@gmail.com",
  "lguzman.58erb@outlook.com",
  "linamaria126@gmail.com",
  "lisandromarguello@gmail.com",
  "llorentegabriel@gmail.com",
  "lolo252000@gmail.com",
  "lorena.lizamag@gmail.com",
  "lucas.idbetan@gmail.com",
  "luciafgangi@hotmail.com",
  "lunajosiasm@gmail.com",
  "maharba1707@gmail.com",
  "marda_da-capo@hotmail.com",
  "matias.nicolas.acevedo@gmail.com",
  "matifiordelli@gmail.com",
  "mauritobarragan@gmail.com",
  "maximilianovanmegroot@gmail.com",
  "medinafacundom@gmail.com",
  "michellangelasierra@gmail.com",
  "miguel.lopezm.dev@gmail.com",
  "miguelbranagan30@gmail.com",
  "mpazvanm@gmail.com",
  "nachtschattenx20@gmail.com",
  "nazarenojunin@gmail.com",
  "nicolastortosa91@gmail.com",
  "o98290039@gmail.com",
  "pablonudenberg@gmail.com",
  "patricioandradeh@gmail.com",
  "pedronuca3@gmail.com",
  "pinamba@gmail.com",
  "rafaelstrongoli@gmail.com",
  "ricardopueblaw@gmail.com",
  "riosalan264@gmail.com",
  "rodrigogeorgetti.cba@gmail.com",
  "rograff17@gmail.com",
  "rolando2207@gmail.com",
  "santiagorrodriguez9@gmail.com",
  "santinobertola03@gmail.com",
  "sergio.marquez.pelayo@gmail.com",
  "sllimefury@gmail.com",
  "sloureiro711@gmail.com",
  "ushiwushi@gmail.com",
  "verocampero2@gmail.com",
  "virginiagallo1@gmail.com",
  "wesgdeveloper@gmail.com",
  "wius93@gmail.com",
  "wsmithdrdev@gmail.com",
  "ximenaellis@gmail.com",
  "ygdani89@outlook.com",
  "adriandelosreyes2013@gmail.com",
  "adrievelyn@gmail.com",
  "agustin528rios@gmail.com",
  "araujo.oskr@gmail.com",
  "cec.alsina@gmail.com",
  "estebanmataluna@gmail.com",
  "inglterzariol@gmail.com",
  "jmbaccei@gmail.com",
  "juliojesusreyes@gmail.com",
  "kecastellanos7@gmail.com",
  "leodeni.do@gmail.com",
  "luz.tabrajb@gmail.com",
  "mamiehijos@gmail.com",
  "maria isabel robledo",
  "marianag.minio@gmail.com",
  "molinariveronica478@gmail.com",
  "paomedina_88@hotmail.com",
  "sabrinagarcia82@hotmail.com",
  "slcaroquiroga@gmail.com",
  "yosbermudez93@gmail.com",
];

const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "./hackathonMVP/Hackathon por Justina - Registro.xlsx";

async function check(req, res) {
  try {
    let token = process.env.TOKEN;
    let res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}members/actualhackathon/`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const hackathon = res.data.getActualHackathonMembers;
    console.log(hackathon.length);

    res = await axios.get(
      // `http://${process.env.LOCALHOST}:5000/api/members`,
      `${process.env.BACK_URL}members`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    const members = res.data.getAllMembers;
    console.log(members.length);

    let output = [];
    output.push("email;cliente;simulaciones;seleccionado");

    hackathon.forEach((h) => {
      let simulaciones = 0;
      let cliente = false;
      let filtro = false;

      const esCliente = clientes.find((c) => c == h.email);
      if (esCliente) {
        cliente = true;
      } else {
        const encontrado = members.find((m) => m.email == h.email);

        if (encontrado) {
          filtro = encontrado.filterPassed;
          encontrado.selectionHistory.forEach((s) => {
            if (s.selection != 18) {
              simulaciones++;
            }
          });

          encontrado.cohortHistory.forEach((c) => {
            if (c.cohort != 21) {
              simulaciones++;
            }
          });
        }
      }

      output.push(`${h.email};${cliente};${simulaciones};${filtro}`);
    });

    let fullnamesWithSpace = output.join("\n");
    fs.writeFileSync("Aplica.txt", fullnamesWithSpace);
  } catch (error) {
    console.error(error);
  }
}
check();
