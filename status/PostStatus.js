var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

/**
 * Saves the status to DB
 */
exports.do = function(status) {

  return new Promise(function(success, failure) {

    let stat = {
      monthId: status.monthId,
      time: status.time,
      status: status.status,
      event: status.event
    }

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.statuses).insert(stat, function(err, res) {

        db.close();

        success({...status, ids: res.insertedIds});

      });

    });

  });

}
