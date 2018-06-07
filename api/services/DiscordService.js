const Discord = require('discord.js');

const client = new Discord.Client();
let channel;
let otcChannel;
let onBotReadyPromise = new Deferred();
client.on('ready', onReady);
client.login(sails.config.discord.token);

module.exports = {
  getChannel: getChannel,
  getOtcChannel: getOtcChannel,
  notify: async function (title, msg, highlight) {
    // @todo: add the embed to personalize it
    try {
      channel = await this.getChannel();
      channel.send({
        embed: {
          title: title,
          color: highlight || 3447003,
          description: msg
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
  notifyOtc: async function (title, msg, highlight) {
    try {
      otcChannel = await this.getOtcChannel();
      otcChannel.send({
        embed: {
          title: title,
          color: highlight || 3447003,
          description: msg
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};

async function getChannel() {
  await onBotReadyPromise.promise;
  return channel || await client.channels.get(sails.config.discord.nasdaqNewsChannelId);
}

async function getOtcChannel() {
  await onBotReadyPromise.promise;
  return otcChannel || await client.channels.get(sails.config.discord.otcNewsChannelId);
}

async function onReady() {
  onBotReadyPromise.resolve('ready');
  console.info('Discord bot online: ', client.user.username + ' - (' + client.user.id + ')');
}

function Deferred() {
  var self = this;
  this.promise = new Promise(function (resolve, reject) {
    self.reject = reject
    self.resolve = resolve
  });
}
