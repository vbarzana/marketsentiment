/**
 * Connections
 * (sails.config.stocktwits)
 *
 */
  // @todo: move all this configuration out of here to a secure location
const redirectUrl = 'http://market-sentiment.herokuapp.com/connect/stocktwits/callback';
const apiUrl = 'https://api.stocktwits.com/api/2';
const clientId = '3dfaa132db4373c2';
const clientSecret = '40cb179f04ecff94add54e0248309c8f5b42c99d';
const code = 'a10fcb4632057a76bfc6130151162ee247d473e5';
const scope = 'read,watch_lists,publish_messages,publish_watch_lists,direct_messages,follow_users,follow_stocks';
const accessToken = 'd3e3e94ac0b9b33aa2f5a9de87f4e286dd5d7672';

module.exports.stocktwits = {
  apiUrl: apiUrl,
  oauthUrl: `${apiUrl}/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=${scope}`,
  getTokenUrl: `${apiUrl}/oauth/token`,
  clientId: clientId,
  secretCode: code,
  accessToken: accessToken,
  clientSecret: clientSecret,
  redirectUrl: redirectUrl
};
