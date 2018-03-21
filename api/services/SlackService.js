const {IncomingWebhook} = require('@slack/client');
const webhook = new IncomingWebhook(sails.config.slack.WEB_HOOK_URL);

exports.notify = async function (title, message) {
  try {
    return await webhook.send({
      "text": title,
      "attachments": [
        {
          "color": "good",
          "text": message
        }
      ]
    }, function(err, response){});
  } catch (err) {
    console.log('Failed to send slack message!');
    console.log(err);
  }
};
