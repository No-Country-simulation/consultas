const { WebClient } = require('@slack/web-api');
const dotenv = require("dotenv");
dotenv.config();

//Canal creado : C07MAFWHBGU

// Your OAuth token
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

async function createChannel(channelName) {
  try {
    const result = await web.conversations.create({
      name: channelName,
      is_private: true
    });
    console.log(`Channel created: ${result.channel.id}`);
   

    getChannelInfo(result.channel.id)

  } catch (error) {
    console.error(error);
  }
}

async function getChannelInfo(channelId) {
    try {
      const result = await web.conversations.info({
        channel: channelId
      });
      console.log(result.channel);
    } catch (error) {
      console.error(error);
    }
  }

createChannel('my-private-channel');
