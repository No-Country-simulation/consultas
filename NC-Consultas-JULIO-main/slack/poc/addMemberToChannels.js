
const { WebClient } = require('@slack/web-api');
const dotenv = require("dotenv");
dotenv.config();
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);

const member = "U03FBQMBSJG"
const canal = "C07MALEK3EY"


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
  
  // Replace 'CHANNEL_ID' and 'USER_ID' with actual values
  addMemberToChannel( canal , member);
  