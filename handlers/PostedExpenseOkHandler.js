var totoEventPublisher = require('toto-event-publisher');
var http = require('toto-request');
var logger = require('toto-logger');
var putStatus = require('../status/PutStatus');
var status = require('../status/Status');
var moment = require('moment-timezone');

exports.do = (event) => {

  console.log('Got an OK! Status: ' + event.statusId);

}