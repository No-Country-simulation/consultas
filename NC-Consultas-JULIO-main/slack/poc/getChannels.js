const { WebClient } = require("@slack/web-api");
const dotenv = require("dotenv");
dotenv.config();
// Your OAuth token
const token = process.env.TOKEN_NC_SLACK;
const web = new WebClient(token);
const fs = require("fs");
async function listPrivateChannels() {
  try {
    const result = await web.conversations.list({
      types: "private_channel",
      limit: 1000,
    });

    const privateChannels = result.channels;

    let output = [];
    privateChannels.forEach((chanel) => {
      output.push(`${chanel.name};${chanel.id}`);
    });

    console.log(output.length);

    if (output.length > 0) {
      let fullnamesWithSpace = output.join("\n");
      fs.writeFileSync("listchannels.txt", fullnamesWithSpace);
    }
  } catch (error) {
    console.error(error);
  }
}

listPrivateChannels();
