# Toto Expenses Import Controller
This microservice reacts to events `expensesUploadConfirmed` and performs the following tasks:
 * Retrieves the month information (only one month can be passed in a expensesUploadConfirmed event)
 * For each expense in the month, publishes an event to `expenseToBePosted`
 * Waits for an answer to that event on `expensePosted` or `expenseNotPosted` (the latter for errors)

This microservice exposes an `/status` API to check the status of the uploaded month (by id): <br/>
`/uploads/:monthId/status`
