const dotenv = require("dotenv");
dotenv.config();
//Slack auth
// Your OAuth token
const { WebClient } = require('@slack/web-api');
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);

//configuraciones generales
const axios = require("axios");
const fs = require("fs");

const { channel } = require("diagnostics_channel");

let token = process.env.TOKEN;


//const member = "U03FBQMBSJG" //julioignaciootero
const member = "U055W8NBQ2F" //No Country Support

async function getTeams() {

    try {   

        console.log(token)
        const res = await axios.get(`${process.env.BACK_URL}teams`, {
            headers: { token: `Bearer ${token}` },
          });

          const allTeams = res.data.getAllTeams;
          
          for (const team of allTeams) {
            
            if ((team.name.startsWith("123") || team.name.startsWith("123")) && team.channelId) {

                for (const iterator of object) {
                    
                }

            }

          }


    } catch (error) {
        console.log(error)
    }


}

async function createChannel(channelName) {
    try {
      const result = await web.conversations.create({
        name: channelName,
        is_private: true
      });

      console.log(`Channel created: ${result.channel.id}`);
      return result.channel.id
  
    } catch (error) {
      console.error(error);
    }
  }

  async function addMemberToChannel(channelId, userId) {
    try {
      // Use the conversations.invite method to add a user to the channel
      const result = await web.conversations.invite({
        channel: channelId,
        users: userId
      });
      console.log(`User ${userId} added to channel ${channelId}`);
    } catch (error) {
      console.error(`Error adding user to channel: ${error}`);
    }
  }

getTeams();


