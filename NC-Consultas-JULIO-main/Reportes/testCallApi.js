// https://nocountryback.herokuapp.com/api/

//Reporte de excel de los equipos, cohorte y seleccionado, con la info de todos los miembros
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function getTeams() {

  let token = process.env.TOKEN;

  console.log(token);

  const res = await axios.get(
    // `http://${process.env.LOCALHOST}:5000/api/teams`,
    `${process.env.BACK_URL}teams`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  const allTeams = res.data.getAllTeams;
  console.log(allTeams);


}

getTeams()