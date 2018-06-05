exports.getSettings = async function () {
  return await Settings.findOne({id: 1});
};
