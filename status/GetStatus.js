var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

/**
 * Updates the status
 */
exports.do = function(req) {

  return new Promise(function(success, failure) {

    let monthId = req.params.monthId;

    if (!monthId) {failure({code: 400, message: 'The monthId is required in the path: /uploads/{monthId}/status'}); return;}

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.statuses).find({monthId: monthId}).toArray(function(err, docs) {

        db.close();

        if (docs == null) {success({monthId: monthId, status: []}); return;}

        let result = [];
        for (var i = 0; i < docs.length; i++) {
          result.push({
            monthId: docs[i].monthId,
            time: docs[i].time,
            status: docs[i].status,
            expense: docs[i].expense
          })
        }

        success({monthId: monthId, status: result});

      });

    });

  });

}
