const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");

let members = [];
let number = 0;
let token = process.env.TOKEN;

async function setNumber() {
  try {
    const res = await axios.get("http://localhost:5000/api/members", {
      headers: { token: `Bearer ${token}` },
    });
    members = res.data.getAllMembers;

    for (const member of members) {
      number = 0;
      number = member.selectionHistory.length + member.cohortHistory.length;
      console.log(member.email + " " + number);
    }
  } catch (error) {
    console.log(error);
  }
}

setNumber();
