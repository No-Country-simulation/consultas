const nodemailer = require("nodemailer");

// Configura el transporte SMTP con tu servicio de correo
let transporter = nodemailer.createTransport({
  service: "smtp-relay.brevo.com", // puedes usar otros servicios como Outlook, Yahoo, etc.
  //   service: "gmail", // puedes usar otros servicios como Outlook, Yahoo, etc.
  port: 587,
  secure: true,
  auth: {
    user: "7d9583001@smtp-brevo.com", // tu email
    // user: "7d9583001@smtp-brevo.com", // tu email
    pass: "CVZ3fWQFTXhSvYLy",
  },
});

// Opciones del correo electrónico

// Envía el correo
