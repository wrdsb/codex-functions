module.exports = function (context) {
    // give our bindings more human-readable names
    var groups_all = context.bindings.groupsAll;
    var groups_to_read = [];

    Object.getOwnPropertyNames(groups_all).forEach(function (group) {
        context.log('Requesting refresh of ' + group);
        groups_to_read.push(group);
    });
    context.bindings.groupsToRead = [];
    context.done();
};