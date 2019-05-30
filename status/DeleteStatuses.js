var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

/**
 * Deletes all statuses for the given month
 */
exports.do = function(req) {

  return new Promise(function(success, failure) {

    let monthId = req.params.monthId;

    if (!monthId) {failure({code: 400, message: 'The monthId is required in the path: DELETE /uploads/{monthId}/status'}); return;}

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.statuses).deleteMany({monthId: monthId}, function(err, docs) {

        db.close();

        success({deleted: true});

      });

    });

  });

}
