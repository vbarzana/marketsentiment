module.exports = {
  getSettings: async function () {
    return await Settings.findOne({id: 1}) || {};
  },
  getPremarketSettings: async function () {
    return await Settings.findOne({id: 2}) || {};
  }
};
