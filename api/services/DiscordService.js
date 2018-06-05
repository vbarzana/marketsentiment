const Discord = require('discord.js');

const client = new Discord.Client();
let channel;
let onBotReadyPromise = new Deferred();
client.on('ready', onReady);
client.login(sails.config.discord.token);

module.exports = {
  getChannel: getChannel,
  notify: async function (msg) {
    try {
      channel = await this.getChannel();
      channel.send(msg);
    } catch (err) {
      console.error(err);
    }
  }
};

async function getChannel() {
  await onBotReadyPromise.promise;
  return channel || await client.channels.get(sails.config.discord.nasdaqNewsChannelId);
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
