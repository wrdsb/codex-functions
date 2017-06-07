var azure = require('azure');

module.exports = function(context) {

serviceBusService.createTopicIfNotExists('ipps_employee_groups_inbound',function(error){
    if(!error){
        // Topic was created or exists
        console.log('ipps_employee_groups_inbound topic created or exists.');
    }
});

serviceBusService.createSubscription('ipps_employee_groups_inbound','codex-functions',function(error){
    if(!error){
        // subscription created
        console.log('codex-functions subscription created or exists.');
    }
});

serviceBusService.receiveSubscriptionMessage('ipps_employee_groups_inbound', 'codex-functions', { isPeekLock: true }, function(error, lockedMessage){
    if(!error){
        // Message received and locked
        console.log(lockedMessage);
        serviceBusService.deleteMessage(lockedMessage, function (deleteError){
            if(!deleteError){
                // Message deleted
                console.log('message has been deleted.');
            }
        }
    }
});

};
