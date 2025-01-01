const axios = require("axios");
const fs = require("fs")
const dotenv = require("dotenv");
const { create } = require("domain");
dotenv.config();

async function createPass() {

    let token =process.env.TOKEN;
    const res = await axios.get("http://localhost:5000/api/members/", {headers: { token: `Bearer ${token}` },});

    const members = res.data.getAllMembers;
    console.log(members.length);
    
    user = members.find(m => m.email == "julioignaciootero@gmail.com")



    try {
    const register = await axios.post("http://localhost:5000/api/register/", 
        {
    
            username : user.email,
            email : user.email,
            password: "0182",
            admin : false
    
        });
    console.log(register);
    } catch (error) {
        console.log(error)

    }



}

createPass()