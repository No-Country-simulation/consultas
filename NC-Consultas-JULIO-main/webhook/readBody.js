const fs = require("fs");

data = JSON.parse(
  fs.readFileSync("C:/NC/NC-Consultas-JULIO/webhook/body.json")
);

let member = {};
data.data.fields.forEach((field) => {
  // console.log(field.label);
  // if (field.label == "teamLeader") {
  //   console.log(readSingleValue(field.value, field.options));
  // }

  // if (field.label == "nocodestack") {
  //   console.log("asdasd");
  //   console.log(readMultipleValue(field.value, field.options));
  // }

  switch (field.label) {
    case "Nombre":
      member.firstName = field.value;
      break;
    case "Apellido":
      member.lastName = field.value;
      break;
    case "Email":
      member.email = field.value;
      break;
    case "phone":
      member.phone = field.value;
      break;
    case "pais":
      member.country = field.value;
      break;
    case "github":
      member.github = field.value;
      break;
    case "Linkedin":
      member.linkedin = field.value;
      break;
    case "Edad":
      member.age = readSingleValue(field.value, field.options);
      break;
    case "experiencia":
      member.experience = readSingleValue(field.value, field.options);
      break;
    case "vertical":
      member.vertical = readSingleValue(field.value, field.options);
      break;
    case "nocoderol":
      member.area = readSingleValue(field.value, field.options);
      break;
    case "nocodestack":
      member.stack = readMultipleValue(field.value, field.options);
      break;
    case "lenguajedata":
      member.language = readSingleValue(field.value, field.options);
      break;
    default:
      break;
  }
});

console.log(member);

function readSingleValue(value, options) {
  const val = options.find((opt) => opt.id == value);
  if (val) return val.text || "asd";
}

function readMultipleValue(value, options) {
  let values = [];

  value.forEach((val) => {
    const option = options.find((opt) => opt.id == val);

    if (option) {
      values.push(option.text);
    }
  });
  return values.join(" ");
}
