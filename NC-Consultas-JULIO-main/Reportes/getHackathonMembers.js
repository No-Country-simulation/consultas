//Reporte de Excel de todos los miembros del cohorte 6 y seleccionado 3. Para catalogo
const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();

async function getFullNames()  {
    let memberNormalized = [];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI2YzBiYmE4M2YzYTU5MWVmYmZiYiIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjM5Mzg0MjAsImV4cCI6MTY2NDE5NzYyMH0.zI80knVVWuZC_hs10LlvuHTJKBR5XF6z6VNAsR-Iszw"
    // let token =process.env.TOKEN;
    const res = await axios.get("http://localhost:5000/api/members", {headers: { token: `Bearer ${token}` },});
    const members = res.data.getAllMembers;

    if (members.length > 0) {
        memberNormalized.push("Fullname;Email;Filtro;Telefono;Git;Linkedin;City;State")
    }

    console.log(members.length);
    members.forEach(m => {
        
        // if (m.selectionHistory.length > 0) {

            m.hackathonHistory.forEach(c => {
                console.log(m.email)
                memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + m.city + ";" + m.state)    
            });
    

            
        // }



    });
    


    if (memberNormalized.length > 0) {
        let fullnamesWithSpace = memberNormalized.join('\n')
        fs.writeFileSync('Hackathonnuevo.txt', fullnamesWithSpace);
    }

}

getFullNames();
