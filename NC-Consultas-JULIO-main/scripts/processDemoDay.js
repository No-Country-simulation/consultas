const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();

const reader = require("xlsx");
const path = "C:/Users/julio/Downloads/Demo Day C6.xlsx"
const file = reader.readFile(path)
const sheets = file.SheetNames

const currentCohort = 'C6'
const currentSelection = 'S3'



let teams = []
let selection = []
let cohort = []
let selMembers = []
let cohortMembers = []
let output = []
output.push("Nombre;Instancia;Email;Status;Mensaje")

for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
   
    switch (i) {
        case 0:
            teams.push(res)
            break;
        case 1:
            selection.push(res)
            break;
        case 2:
            cohort.push(res)
            break;
    }

    
   })
    
}


teams.forEach(team => {

    //Si es del Cohorte y el equipo aprobo, agrego a los miembros a Cohortmembers para procesar. 
    //Si es del cohorte y no aprobaron, no tengo que hacer nada
    if (team.instancia == currentCohort && team.approved == true) {

        cohort.forEach(c => {
            if (c.team == team.team && c.active == true && c.qualify == true) {  //Si activo y califico
                cohortMembers.push(c)
            }
        });
        // console.log(cohortMembers)

    } else if (team.instancia == currentSelection && team.approved == false ) {  //Si es del seleccionado y el equipo no aprobo. tengo que sacarle el flag

        selection.forEach(s => {
            if (s.team == team.team) {
                selMembers.push(s)
            }
        });
        // console.log(selMembers)
    } else if (team.instancia == currentSelection && team.approved == true ) {    //Si es del seleccionado y el equipo aprobo, verifico que este activo y calificado

        selection.forEach(s => {
            if (s.team == team.team && (s.active == false || s.qualify == false)) {
                selMembers.push(s)
            }
        });
    }
        // console.log(selMembers)


});

console.table(teams)

console.table(cohort)
console.table(selection)
console.log("Seleccionado : PONER EN FALSE ", selMembers.length)
console.table(selMembers)
console.log("Cohorte : PONER EN TRUE " , cohortMembers.length)
console.table(cohortMembers)


async function processDemoDay() {

//Si hay miembros del seleccionado que no aprobaron, debemos bajarlos /filtertofalse
    if (selMembers.length > 0) {
        
        for (let i = 0; i < selMembers.length; i++) {
            
            try {
                
                //Llamamos a bajar del seleccionado
                let res = await axios.put("http://localhost:5000/api/selection/filterpassed/", 
                {
            
                    email : selMembers[i].email,
                    filter : false
            
                });
            
            //Agrego a salida
            console.log("Procesado OK: " + selMembers[i].fullname + ";" + currentSelection + ";" + selMembers[i].email)
            output.push(selMembers[i].fullname + ";" + currentSelection + ";" +  selMembers[i].email + ";" + "OK" + ";" + "Descendio del seleccionado" )

            } catch (error) {
                console.log("No se pudo procesar: " + selMembers[i].fullname + ";" + currentSelection + ";" + selMembers[i].email)
                output.push(selMembers[i].fullname + ";" + currentSelection + ";" + selMembers[i].email + ";" + "ERROR" + ";" + "No se pudo BAJAR del seleccionado" )
            }
            
        }


    }

//Si hay miembros del cohorte que aprobaron, debemos subirlos Filtro true
if (cohortMembers.length > 0) {
        
    for (let i = 0; i < cohortMembers.length; i++) {
        
        try {
            
            //Llamamos a bajar del seleccionado
            let res = await axios.put("http://localhost:5000/api/selection/filterpassed/", 
            {
        
                email : cohortMembers[i].email,
                filter : true
        
            });
            console.log("Procesado OK: " +  cohortMembers[i].fullname + ";" + currentCohort + ";" + cohortMembers[i].email)
            output.push(cohortMembers[i].fullname + ";" + currentCohort + ";" + cohortMembers[i].email + ";" + "OK" + ";" + "Ascendio al seleccionado" )

        } catch (error) {
            
            console.log("No se pudo procesar: "  +  cohortMembers[i].fullname + ";" + currentCohort + ";" + cohortMembers[i].email)
            output.push(cohortMembers[i].fullname + ";" + currentSelection + ";" + cohortMembers[i].email + ";" + "ERROR" + ";" + "Error al ascender al seleccionado" )
        }
        
    }


} 

if (output.length > 1) {
    
    const d = new Date()
    const time = '' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
    let fullnamesWithSpace = output.join('\n')    
    fs.writeFileSync(`C:/NC/NC-Consultas/output/LogDemoDay${time}.csv`, fullnamesWithSpace);

}

}

processDemoDay()
