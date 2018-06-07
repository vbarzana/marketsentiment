module.exports = {
  getSettings: async function () {
    return await Settings.findOne({id: 1});
  },
  getOtcSettings: async function () {
    return await Settings.findOne({id: 2});
  },
  getPremarketSettings: async function () {
    return await Settings.findOne({id: 3});
  }
}
