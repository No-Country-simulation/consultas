const mongoose = require("mongoose");
const Member = require("C:/NC/NC-Backend/models/Member.js");



const db = "mongodb+srv://nocountryadmin:Mongo2021@cluster0.chuia.mongodb.net/Demo"




//conexion a la base de datos
async function dbConection(){
try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("BD Conexion exitosa");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar BD");
  }
};





async function setVertical(){



    try {
        console.log("holis")
        const members = await Member.find()
        console.log("2")
        console.log(members)
    } catch (error) {
        console.log(error)
    }


}


dbConection()



