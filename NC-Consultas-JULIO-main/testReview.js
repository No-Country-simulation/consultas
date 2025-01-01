const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


async function sendMail()  {
    
    const currentCohort = 5
    let token =process.env.TOKEN;

    try {
        const res = await axios.get("http://localhost:5000/api/memberid/teams", {
             headers: { token: `Bearer ${token}` }
        });
        const allTeams = res.data.memberTeams;
        console.log(allTeams);
        



    } catch (error) {
        console.log(error);
    }


}

sendMail()