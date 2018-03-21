/**
 * @class NewsNotificationStatus
 */
module.exports = {

  attributes: {
    s: {
      type: 'string',
      required: true
    },

    link: {
      type: 'string',
      unique: true
    }
  }
};
