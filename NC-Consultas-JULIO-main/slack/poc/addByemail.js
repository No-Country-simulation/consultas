const { WebClient } = require('@slack/web-api');
const dotenv = require("dotenv");
dotenv.config();
// Create a new instance of the WebClient with your token
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);


async function inviteUserByEmail(channelId, email) {
    try {
      // Use the users.admin.invite method to invite a user by email
      const result = await web.admin.users.invite({
        channel_ids: channelId,
        email: email
      });
      console.log(`Invitation sent to ${email} for channel ${channelId}`);
    } catch (error) {
      console.error(`Error inviting user: ${error}`);
    }
  }
  
  // Replace 'CHANNEL_ID' and 'USER_EMAIL' with actual values
  inviteUserByEmail("C07MAFWHBGU", "julioignaciootero@hotmail.com");
  