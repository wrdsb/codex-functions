module.exports = function (context) {
    var moment = require('moment');
    var offset = 0;
    var scheduledTime;

    // give our bindings more human-readable names
    var groups_all = context.bindings.groupsAll;
    var groups_to_read = [];

    Object.getOwnPropertyNames(groups_all).forEach(function (group) {
        var messageBody = {
            groupKey: group
        };

        scheduledTime = moment().utc().add(offset, 'minute').format('M/D/YYYY H:mm:ss A');
        
        var message = {
            body: JSON.stringify(messageBody),
            brokerProperties: {
                ScheduledEnqueueTimeUtc: scheduledTime
            }
        };

        context.log('Requesting refresh of '+ group +' at '+ scheduledTime +' UTC.');
        groups_to_read.push(message);

        offset = offset + 0.1;
    });
    context.bindings.groupsToRead = groups_to_read;
    context.done();
};