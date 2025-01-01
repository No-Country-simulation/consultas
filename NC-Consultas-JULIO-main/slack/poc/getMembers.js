const { WebClient } = require('@slack/web-api');
const dotenv = require("dotenv");
dotenv.config();
// Your OAuth token
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const member = "U03FBQMBSJG" //julioignaciootero


async function listWorkspaceMembers() {
  try {
    const result = await web.users.list();
    const members = result.members;

    members.forEach(member => {
        console.log(member)
      console.log(`ID: ${member.id}, Name: ${member.name} Email: ${member.profile.email}`);
    });
  } catch (error) {
    console.error(error);
  }
}



listWorkspaceMembers();
