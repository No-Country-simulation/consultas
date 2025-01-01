//Envio de mail a los equipos
const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();
const sleep = require('system-sleep');

const currentSelectionName = 'S5'
const currentcohortName = 'C8'
const currentSelection = "5"
const currentcohort = "8"
let token =process.env.TOKEN; 

// let index = 109

const errores = [
    "C8-74-m-ReactNative",
"C8-75-ft-ReactNative",
"C8-76-m-ReactNative",
"C8-77-ft-ReactNative",
"C8-78-m-ReactNative",
"C8-79-ft-ReactNative",
"C8-80-m-React",
"C8-81-t-React",
"C8-82-m-React",
"C8-83-t-Mern",
"C8-84-m-React",
"C8-85-m-React",
"C8-86-t-React",
"C8-87-ft-ReactNative",
"C8-88-t-React",
"C8-89-ft-ReactNative"

]
let encontrado = false
async function SendMailToTeams() {

    try {
        


    
    const res = await axios.get("http://localhost:5000/api/teams", {headers: { token: `Bearer ${token}` },});
    const allTeams = res.data.getAllTeams;

    let actualTeams = []
    let mails = []
    let members = []
    
    allTeams.map((team) => {

        if (team.name.startsWith(currentSelectionName) || team.name.startsWith(currentcohortName)) {
            
            actualTeams.push(team)
        }   

    })
    // console.log(actualTeams.length)
    
    actualTeams.forEach(team => {
        
    encontrado = errores.find((e) => e == team.name)
    console.log(encontrado)
    if (encontrado) {
        

    // for (i = 0; i < actualTeams.length, i ++)

        mails = []
        members = []

        
            
            if (team.name.startsWith(currentSelectionName)) {
                
                team.members.forEach(m => {
                    
                    

                    m.selectionHistory.forEach(sel => {
                        
                        if (sel.selection == currentSelection) {
                            
                            mails.push(m.email)
                            members.push ({ 
                                fullname : m.fullname,
                                email : m.email,
                                phone : m.phone,
                                availability : sel.availability,
                                area : sel.area,
                                stack : sel.stack,
                                language: sel.language,
                                experience : sel.experience
                             } )


                        } 

                    });

                });

            } else if (team.name.startsWith(currentcohortName)) {
                
                team.members.forEach(m => {
                    
                    

                    m.cohortHistory.forEach(cohort => {
                        
                        if (cohort.cohort == currentcohort) {
                            
                            mails.push(m.email)
                            members.push ({ 
                                fullname : m.fullname,
                                email : m.email,
                                phone : m.phone,
                                availability : cohort.availability,
                                area : cohort.area,
                                stack : cohort.stack,
                                language: cohort.language,
                                experience : cohort.experience
                             } )


                        } 

                    });

                });
                
            }



        // console.log(team.name)
        // console.table(mails)
        // console.table(members)
        // console.log(actualTeams[index].name, mails.length, members.length)
        // console.log(actualTeams[index].name)
        if (mails.length > 0 && members.length > 0) {


            console.log("Equipo " , team.name)            
            sendMail(mails, members, team.name)

        }

    }

    });

} catch (error) {

        console.log(error)
}
    
}


async function sendMail(mails, members, teamName){
    const res = await axios.post("http://localhost:5000/api/mail/teams", {
        mails : mails ,
        members : members,
        teamName : teamName,
        // filterPassed : false,
        headers: { token: `Bearer ${token}` }
    });
}

SendMailToTeams()