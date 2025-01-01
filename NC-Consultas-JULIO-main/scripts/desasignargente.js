const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const token = process.env.TOKEN;

const emails = ["josefrancoprogramacion@gmail.com"];

async function getMembers() {
  const res = await axios.get(`${process.env.LOCALHOST}members/actual`, {
    headers: { token: `Bearer ${token}` },
  });
  members = res.data.getActualMembers;
}

async function desasignar() {
  try {
    await getMembers();
    for (const email of emails) {
      await axios.put(
        `${process.env.LOCALHOST}member/desasignar`, // (putMemberTeam)
        { email },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
