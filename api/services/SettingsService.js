exports.getSettings = async function () {
  return await Settings.findOne({id: 1});
};

exports.getOtcSettings = async function () {
  return await Settings.findOne({id: 2});
};
