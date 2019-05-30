var Controller = require('toto-api-controller');
var TotoEventConsumer = require('toto-event-consumer');
var totoEventPublisher = require('toto-event-publisher');
var logger = require('toto-logger');

var getStatus = require('./status/GetStatus');
var deleteStatuses = require('./status/DeleteStatuses');

var uploadConfirmedEHandler = require('./handlers/UploadConfirmedEHandler');
var postedExpenseOkHandler = require('./handlers/PostedExpenseOkHandler');
var postedExpenseFailedHandler = require('./handlers/PostedExpenseFailedHandler');

var apiName = 'expenses-impoco';

// EVENT OUT : Expenses that are to be posted
totoEventPublisher.registerTopic({topicName: 'expenseToBePosted', microservice: apiName}).then(() => {}, (err) => {console.log(err);});

// EVENT IN : When an upload is confirmed
var eventConsumer = new TotoEventConsumer(apiName, ['expensesUploadConfirmed', 'postedExpensesOk', 'postedExpensesFailed'], [uploadConfirmedEHandler.do, postedExpenseOkHandler.do, postedExpenseFailedHandler.do]);

var api = new Controller(apiName, totoEventPublisher, eventConsumer);

api.path('GET', '/uploads/:monthId/status', getStatus);
api.path('DELETE', '/uploads/:monthId/status', deleteStatuses);

api.listen();
