const Discord = require('discord.js');

require('dotenv').config()

class Bot {
  constructor() {
    const self        = this;
    self.client       = new Discord.Client();
    self.connection   = null;
    self.songDispatch = null;

    self.client.on('ready', () => {
      console.log(`logged in as ${self.client.user.tag}!`);
      console.log()
    });

    self.client.on('message', msg => {
      if (msg.content.substring(0, 1) == "!") {
        const message = msg.content.substring(1).toLowerCase();

        switch (message) {
          case "hi":
          case "hello":
          case "whatsup":
            msg.reply(helloResponse(msg.author));
            break;
          case "good night":
          case "gnight":
          case "night":
            msg.reply(`good night young ${msg.author}`);
            break;
          case "test":
            msg.channel.guild.members.forEach((member) => {
              msg.channel.send(`<@${member.user.id}>`);
            });
          case "pubg":
            break;
          case "seige":
            break;
          case "ea":
          case "echo arena":
            break;
          case "avatar":
            msg.reply(msg.author.avatarURL);
            break;
          // music decisions
          case "join":
            if (!msg.guild) {
              console.log("can't join -_-");
              break;
            }
            // join the current voice channel
            if (msg.member.voiceChannel) {
              msg.member.voiceChannel
                .join()
                .then(connection => {
                  self.connection = connection;
                  msg.reply(`Kami is here, what can I do for you?`);
                })
                .catch((err) => {console.log(err); msg.reply(`sorry, something went wrong...`) });
            } else {
              msg.reply(`you must not be in a voice channel -_-`);
            }
            break;
          case "leave":
          case "bye":
          case "goodbye":
            if (self.connection)
              self.connection.disconnect();
            break;
          case "rick-roll":
          case "rickroll":
            if (self.connection)
              self.songDispatch = self.connection.playFile('./music/rick-roll.mp3');
            break;
          case "music":
            break;
          case "play":
          case "resume":
            if (self.songDispatch)
              self.songDispatch.resume();
            break;
          case "pause":
            if (self.songDispatch)
              self.songDispatch.pause();
            break;
          case "stop":
            if (self.songDispatch)
              self.songDispatch.end();
            break;
        }
      }
    });

    self.client.on('guildMemberAdd', member => {
      const channel = member.guild.channels.find('name', 'general');
      if (!channel) return;
      channel.send(memberAddMessage(member));
    });

    self.client.login(process.env.LOGIN);
  }
} // Bot


// response variables

function helloResponse(member) {
  let responses = [
    `Hello, ${member} nice to hear from you.`,
    `What's up buddy?`,
    `long time no see...`,
    `playing pubg?`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

function memberAddMessage(member) {
  let responses = [
    `Oh shiiiiiiiiiiit, ${member} is here! Everyone duck and cover`,
    `It's ${member}!!!!!`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

const bot = new Bot();
