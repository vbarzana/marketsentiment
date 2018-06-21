module.exports = {
  id: __filename.replace('.js', ''),
  up: function (done) {
    this.db.collection('settings').drop();
    // use this.db for MongoDB communication, and this.log() for logging
    done();
  }
};
