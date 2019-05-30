var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

/**
 * Updates the status
 */
exports.do = function(id, newStatus) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.statuses).updateOne({_id: new mongo.ObjectId(id)}, {$set: {status: newStatus}}, function(err, res) {

        db.close();

        success({});

      });

    });

  });

}
