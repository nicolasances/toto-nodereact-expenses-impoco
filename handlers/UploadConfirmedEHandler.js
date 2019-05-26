var totoEventPublisher = require('toto-event-publisher');
var http = require('toto-request');
var logger = require('toto-logger');

exports.do = (event) => {

  // Extract the month id and other data
  let monthId = event.monthId;
  let correlationId = event.correlationId;

  // Retrieve the month data
  http({
    correlationId: correlationId,
    microservice: 'toto-nodems-expenses-import',
    method: 'GET',
    resource: '/uploads/' + monthId
  }).then((data) => {

    if (data == null || data.expenses == null) {
      logger.compute(correlationId, 'No expenses in month ' + monthId, 'info');
      return;
    }

    // Post the expenses
    for (var i = 0; i < data.expenses.length; i++) {

      let exp = data.expenses[i];

      // Skip positive amounts
      if (exp.amount > 0) continue;

      // Create the post expense event
      expEvent = {
        date: exp.date,
        amount: Math.abs(exp.amount),
        currency: exp.currency ? exp.currency : 'EUR',
        description: exp.description,
        category: 'VARIE',
        yearMonth: data.yearMonth,
        user: data.user
      }

      // Post each expense on an event
      totoEventPublisher.publishEvent('expenseToBePosted', expEvent);

    }
  })

}
