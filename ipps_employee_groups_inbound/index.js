var azure = require('azure');

module.exports = function(context, message) {
    context.log('Node.js ServiceBus queue trigger function processed message', message);
    context.done();
};
