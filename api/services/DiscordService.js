const Discord = require('discord.js');
const _ = require('lodash');
const prefix = "!ms";
const TradingViewController = require('../controllers/TradingViewController');

const client = new Discord.Client();
let channel;
let otcChannel;
let onBotReadyPromise = new Deferred();

module.exports = {
  notify: async (title, msg, highlight, image, url) => doNotify(channel || await this.getChannel(), title, msg, highlight, image, url),
  notifyOtc: async (title, msg, highlight, image, url) => doNotify(await this.getOtcChannel(), title, msg, highlight, image, url),
  notifyPremarket: async (title, msg, highlight, image, url) => doNotify(await this.getPremarketChannel(), title, msg, highlight, image, url),

  getChannel: async () => {
    await onBotReadyPromise.promise;
    return channel || await client.channels.get(sails.config.discord.nasdaqNewsChannelId);
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
    let response = "Nothing found here for your command...";
    switch (content) {
      case "gainers": {
        response = _.toString((await TickerService.findBiggestGainers() || []).join('\n')).substring(0, 500);
        break;
      }
      case "premarket": {
        let premarketSettings = await SettingsService.getPremarketSettings();
        var tickers = await TradingViewController.doPullTickersFromTradingView(premarketSettings);

        tickers = _.reduce(tickers, function (collection, value) {
          collection.push(value.s);
          return collection;
        }, []);

        response = tickers.join('\n').substring(0, 500);
        break;
      }

      case "iextradingData": {
        var data = await TradingViewController.iextradingData();

        response = data;
        break;
      }
      default:
        break;
    }
    client.reply('\n' + response);
  }
};

async function doNotify(channel, title, msg, highlight, image, url) {
  try {
    channel.send({
      embed: {
        title: title,
        color: highlight || 3447003,
        image: image,
        url: url,
        description: msg
      }
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
