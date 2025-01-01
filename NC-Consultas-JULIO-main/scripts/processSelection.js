//Este use para bajar al seleccionado JUN 2023

const emails = [
  "adrianmcenturion@gmail.com",
  "alejagb.04@gmail.com",
  "alextoso@gmail.com",
  "alexruiz1666@gmail.com",
  "alexismesac@gmail.com",
  "andrea01abdala@gmail.com",
  "c.andreavanesa@gmail.com",
  "andres.burbano.dev@gmail.com",
  "pipecajas1999@hotmail.com",
  "brayancastillo743@gmail.com",
  "camilo.durand1@gmail.com",
  "candelariaromero5@gmail.com",
  "carlosluisprad@gmail.com",
  "camunozn89@gmail.com",
  "cristian_granero90@yahoo.com",
  "damian_g1988@hotmail.com",
  "david.cicconi94@gmail.com",
  "davidmedev@gmail.com",
  "dicar.96@hotmail.com",
  "zambrano.84.d@gmail.com",
  "guzman.diego@outlook.com.ar",
  "nieves.diego0426@gmail.com",
  "dyakobowicz@gmail.com",
  "doliverpoleo15@gmail.com",
  "enmanuelpaulcarrillo.rakata900@gmail.com",
  "ezequielmatiasb@hotmail.com",
  "fabiandisenocapital@gmail.com",
  "felipe.calderon321@gmail.com",
  "ferkovalink@gmail.com",
  "francopelozo@gmail.com",
  "gemanepa@gmail.com",
  "xdhaber12@gmail.com",
  "gonzalo.loncaric@gmail.com",
  "gonzalovasquezher@gmail.com",
  "gregjose2513@gmail.com",
  "jaimeorosco501@gmail.com",
  "josefina.anschutz@gmail.com",
  "jamarantog95u@gmail.com",
  "julian.andres.rodriguez@gmail.com",
  "julvertvargas@gmail.com",
  "abbalucas4@gmail.com",
  "chueko@gmail.com",
  "lucianonicolasolmedo@gmail.com",
  "luisvelark@gmail.com",
  "martinmaruca@gmail.com",
  "matiasbarengo99@gmail.com",
  "mbcacciatore@gmail.com",
  "maespinozav@gmail.com",
  "nataliachehda@gmail.com",
  "nicolaspantojadi@gmail.com",
  "tholleybhabs@gmail.com",
  "oscaracu@miplazaweb.com.mx",
  "oscarzx@gmail.com",
  "talero@gmail.com",
  "philtaboada1997@gmail.com",
  "rramiromorard@gmail.com",
  "raykevin1999@gmail.com",
  "silviorosas@yahoo.com.ar",
  "tancredi620@gmail.com",
  "spimentelm1201@gmail.com",
  "tomymza10@gmail.com",
  "mokajua@gmail.com",
  "villacresa@gmail.com",
  "tutaguaradigital@gmail.com",
  "zoeguzman.ok@gmail.com",
  "alerock.dorian@gmail.com",
  "bryandavidaaa@gmail.com",
  "carolinadesign.com@gmail.com",
  "eitan03@hotmail.com.ar",
  "fredyalberbaron@hotmail.com",
  "gastonsaravia112@gmail.com",
  "jfpalomino.22@gmail.com",
  "leanwebdeveloper@gmail.com",
  "ebazzarelli@gmail.com",
  "naleonesaguiar@gmail.com",
  "ramirocosa@gmail.com",
];

const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function processDemoDay() {
  //Si hay miembros del seleccionado que no aprobaron, debemos bajarlos /filtertofalse
  if (emails.length > 0) {
    for (let i = 0; i < emails.length; i++) {
      try {
        //Llamamos a bajar del seleccionado
        let res = await axios.put(
          "http://localhost:5000/api/selection/filterpassed/",
          {
            email: emails[i],
            filter: false,
          }
        );

        //Agrego a salida
        console.log("Procesado OK: " + emails[i]);
      } catch (error) {
        console.log("No se pudo procesar: " + emails[i]);
      }
    }
  }
}

processDemoDay();
