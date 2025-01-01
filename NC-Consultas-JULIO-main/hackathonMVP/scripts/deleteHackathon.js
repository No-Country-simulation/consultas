const members = [
  "chapeco2050@gmail.com",
  "antonio.lefinir@gmail.com",
  "kevinpernia30@gmail.com",
  "gustavojoaquincalizayaleon2@gmail.com",
  "miguel.lopezm.dev@gmail.com",
  "martinchrispc@hotmail.com",
  "jatrujilloch1@gmail.com",
  "gutierrezpabloraul@gmail.com",
  "juansebastian.laverdegonzalez@gmail.com",
  "guerreroaanathalia@gmail.com",
  "juangreen17@gmail.com",
  "johncotamo@hotmail.com",
  "santiaaquino4@gmail.com",
  "ghrelin00@gmail.com",
  "dcdevtk@gmail.com",
  "jjavierfonsecab@gmail.com",
  "david.dos.santos89@outlook.com",
  "nicolas2289h@gmail.com",
  "adriandelosreyes2013@gmail.com",
];

const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
console.log(members.length);
async function remove() {
  try {
    let token = process.env.TOKEN;

    for (let i = 0; i < members.length; i++) {
      const res = await axios.put(
        `${process.env.LOCALHOST}members/hackremove`,
        {
          email: members[i],
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );

      console.log(members[i] + " " + res.status);
    }
  } catch (error) {
    console.log(error);
  }
}
remove();
