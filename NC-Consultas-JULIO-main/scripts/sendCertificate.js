const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
// const pathTl = "C:/Users/julio/OneDrive/Escritorio/C9 tl.xlsx";
const pathMembers = "C:/Users/julio/OneDrive/Escritorio/c21cert.xlsx";

// const pathMembers =
//   "C:/Users/julio/OneDrive/Escritorio/Cert/Developer/Developer.xlsx";

const mailToken = "gtbsvxllxphhfoqh";
// const mailToken = "AIzaSyCDr3AMywVebkUJS74yleRvooLL4E5k5XA";
const nodemailer = require("nodemailer");
const file = reader.readFile(pathMembers);
const sheets = file.SheetNames;
let data = [];
let token = process.env.TOKEN;
// console.log(file);
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    // console.log(res);
    if (!res.hecho) {
      res.email = res.email.toLowerCase();
      data.push(res);
    }
  });
}

const mailbody = `<p1>Hola!<br><br>
Felicitaciones por haber superado la Simulación Laboral Tech. Adjunto encontrarás tu diploma de participación. 
<br><br>Has demostrado que perteneces al Seleccionado de No Country. Ahora es el momento de llevar tu potencial al siguiente nivel y destacarte frente a los empleadores.
<br><br>
<b>¿Quieres destacar tu perfil y acelerar tu empleabilidad?</b>
<br><br>
<b>Únete al canal #destaca-tu-perfil de Slack para recibir mas información.</b>
<br><br>
Nuestro compromiso es seguir evidenciando el valor de los juniors y ayudarte a alcanzar tus metas profesionales. La oportunidad está cada vez más cerca. 
<br>
¡Adelante y éxitos en tu camino profesional!
</p1><br><br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

let transporter = nodemailer.createTransport({
  // pool: true,
  service: "gmail",
  // maxMessages: 10000,
  auth: {
    user: "nocountryforjuniordevs@gmail.com",
    pass: mailToken,
  },
});

console.log(data.length);
// return;
// for (let i = 0; i < data.length; i++) {
// for (let i = 0; i < 50; i++) {
//este iba bien
// for (let i = 0; i < 60; i++) {
for (let i = 0; i < data.length; i++) {
  // ("C:UsersAdministratorDesktopNCCertificadosS7");
  // "C:\Users\julio\OneDrive\Escritorio\Certificados S18\imagenes"
  // C:\Users\julio\Downloads\C21-20241211T141712Z-001\C21
  let imgPath = `C:/Users/julio/Downloads/C21-20241211T141712Z-001/C21/${data[i].NOMBRE}.jpg`;
  // let imgPath = `C:/Users/julio/OneDrive/Escritorio/Cert/Developer/${data[i].NOMBRE}.jpg`;

  let existe = fs.existsSync(imgPath);
  if (existe) {
    // console.log(existe);
    // console.log(`${data[i].NOMBRE}: ${existe} SIIIIIIIIIIIIII ${i}`);
    let mailOptions = {
      from: "No Country",
      to: data[i].email,
      subject: "Tu Diploma de Participación - No Country",
      html: mailbody,
      attachments: [{ path: imgPath }],
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
        // console.log("ERROR " + data[i].NOMBRE + " - " + error);
        console.log("ERROR " + data[i].NOMBRE);
        // console.log(error);
      } else {
        console.log(data[i].NOMBRE);
      }
    });
    for (let j = 0; j < 2000000000; j++) {}
  } else {
    console.log(`${data[i].NOMBRE}: ${existe} NO EXISTE`);
  }
}

// });
