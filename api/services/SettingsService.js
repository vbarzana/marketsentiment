module.exports = {
  getSettings: async function () {
    return await Settings.findOne({id: 1});
  },
  getOtcSettings: async function () {
    return await Settings.findOne({id: 2});
  }
}
