const mongoose = require("mongoose");
const Member = require("C:/NC/NC-Backend/models/Team.js");
const readXlsxFile = require("read-excel-file/node");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");
const path = "C:/Users/julio/Downloads/videos.xlsx";

const file = reader.readFile(path);
const sheets = file.SheetNames;
let data = [];
// let members = []
for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    if (res.link) {
      data.push(res);
    }
  });
}
