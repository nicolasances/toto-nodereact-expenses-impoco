var Controller = require('toto-api-controller');
var TotoEventConsumer = require('toto-event-consumer');
var totoEventPublisher = require('toto-event-publisher');
var logger = require('toto-logger');

var uploadConfirmedEHandler = require('./handlers/UploadConfirmedEHandler');

var apiName = 'expenses-impoco';

// EVENT OUT : Expenses that are to be posted
totoEventPublisher.registerTopic({topicName: 'expenseToBePosted', microservice: apiName}).then(() => {}, (err) => {console.log(err);});

// EVENT IN : When an upload is confirmed
var eventConsumer = new TotoEventConsumer(apiName, 'expensesUploadConfirmed', uploadConfirmedEHandler.do);

var api = new Controller(apiName, totoEventPublisher, eventConsumer);

api.listen();
