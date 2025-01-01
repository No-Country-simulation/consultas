const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();

async function getFullNames()  {
    let memberNormalized = [];
    let token =process.env.TOKEN;

    const res = await axios.get("http://localhost:5000/api/members", {headers: { token: `Bearer ${token}` },});
    const members = res.data.getAllMembers;

    if (members.length > 0) {
        memberNormalized.push("Fullname;Email;Filtro;Cohorte;Turno;Len;Area;Stack;Experience;TL")
    }

    console.log(members.length);
    members.forEach(m => {
        

            if (m.filterPassed == true) {
                m.selectionHistory.forEach(s => {
                    if (s.selection == 3) {
                    // memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `S${s.selection}` + ";" + s.language + ";" + s.area + ";" + s.stack + ";" + s.experience) 
                    memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + `S${s.selection}` + ";" + s.availability + ";" + s.language + ";" + s.area + ";" + s.stack + ";" + s.experience + ";" + s.teamLeader) 
                    }
                });   
            }
            // m.cohortHistory.forEach(c => {
            //     if (c.cohort == 6) {
                    
            //                 //  memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + m.country + ";" + m.phone + ";" + m.github + ";" + m.linkedin + ";" + `C${c.cohort}` + ";" + c.language + ";" + c.area + ";" + c.stack + ";" + c.experience) 
            //                  memberNormalized.push(m.fullname + ";" + m.email + ";" + m.filterPassed + ";" + `C${c.cohort}` + ";" + c.availability  + ";" +  c.language + ";" + c.area + ";" + c.stack + ";" + c.experience + ";" + c.teamLeader) 
            //     }
            // });
    

            




    });
    


    if (memberNormalized.length > 0) {
        let fullnamesWithSpace = memberNormalized.join('\n')
        fs.writeFileSync('S3 Aprobados.txt', fullnamesWithSpace, 'utf8');
        console.log(fullnamesWithSpace);
    }

}

getFullNames();
