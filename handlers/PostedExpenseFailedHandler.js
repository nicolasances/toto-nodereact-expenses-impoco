var totoEventPublisher = require('toto-event-publisher');
var http = require('toto-request');
var logger = require('toto-logger');
var putStatus = require('../status/PutStatus');
var status = require('../status/Status');
var moment = require('moment-timezone');

exports.do = (event) => {

  // Update the status of the expense to 'ERROR'
  putStatus.do(event.statusId, status.ERROR);

}
