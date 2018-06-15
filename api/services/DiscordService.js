const Discord = require('discord.js');
const _ = require('lodash');
const prefix = "!ms";
const TradingViewController = require('../controllers/TradingViewController');

const client = new Discord.Client();
let channel;
let otcChannel;
let onBotReadyPromise = new Deferred();

module.exports = {
  notify: async function (title, msg, highlight, image, url, fields) {
    return doNotify(channel || await this.getChannel(), title, msg, highlight, image, url, fields);
  },
  notifyOtc: async function (title, msg, highlight, image, url, fields) {
    return doNotify(await this.getOtcChannel(), title, msg, highlight, image, url, fields);
  },

  clearPremarketChannel: async function () {
    let channel = await this.getPremarketChannel();
    // Try to remove all messages in the channel
    try {
      let messages = await channel.fetchMessages();
      if (messages) {
        await channel.bulkDelete(messages);
      }
    } catch (err) {
      console.log('Could not clear messages of the premarket channel', err.message);
    }
  },

  notifyTwitter: async function (title, msg, highlight, image, url, fields, options) {
    let channel = await this.getTwitterChannel();
    return doNotify(channel, title, msg, highlight, image, url, fields, options);
  },

  notifyPremarket: async function (title, msg, highlight, image, url, fields) {
    let channel = await this.getPremarketChannel();
    return doNotify(channel, title, msg, highlight, image, url, fields)
  },

  getChannel: async () => {
    await onBotReadyPromise.promise;
    return channel || await client.channels.get(sails.config.discord.nasdaqNewsChannelId);
  },

  getTwitterChannel: async () => {
    await onBotReadyPromise.promise;
    return await client.channels.get(sails.config.discord.twitterChannelId);
  },

  getOtcChannel: async () => {
    await onBotReadyPromise.promise;
    return otcChannel || await client.channels.get(sails.config.discord.otcNewsChannelId);
  },

  getPremarketChannel: async () => {
    await onBotReadyPromise.promise;
    return otcChannel || await client.channels.get(sails.config.discord.premarketNewsChannelId);
  },

  onBotReady: async () => {
    onBotReadyPromise.resolve('ready');
    console.info('Discord bot online: ', client.user.username + ' - (' + client.user.id + ')');
  },

  onMessage: async (client) => {
    let {content} = client;
    if (_.toString(content).indexOf(prefix) < 0) {
      return;
    }
    content = _.trim(_.replace(content, prefix, ''));
    let split = _.split(content, ' ');

    let command = split.shift();

    let response = "Nothing found here for your command...";
    switch (command) {
      case "gainers": {
        response = _.toString((await TickerService.findBiggestGainers() || []).join('\n')).substring(0, 500);
        break;
      }

      case "sentiment": {
        let ticker = _.first(split);
        response = await UtilService.stockDetailsToTable(await UtilService.getMoreStockDetails(ticker));
        break;
      }

      default:
        break;
    }
    client.reply('\n' + response);
  }
};

async function doNotify(channel, title, msg, highlight, imageUrl, url, fields, options) {
  try {
    let toEmbed = {
      title: title,
      color: highlight || 3447003,
      description: msg
    };
    if (imageUrl) {
      toEmbed.image = {
        url: imageUrl
      }
    }
    if (url) {
      toEmbed.url = url;
    }
    if (fields) {
      toEmbed.fields = fields;
    }
    if (options) {
      toEmbed = _.merge(toEmbed, options);
    }

    channel.send({
      embed: toEmbed
    });
  } catch (err) {
    console.error(err);
  }
};

function Deferred() {
  var self = this;
  this.promise = new Promise(function (resolve, reject) {
    self.reject = reject
    self.resolve = resolve
  });
};

function initBot() {
  client.on('ready', module.exports.onBotReady);
  client.on('message', module.exports.onMessage);
  client.login(sails.config.discord.token);
}

initBot();
