module.exports = function (context) {
    var people_sets = context.bindings.codexRecordsIn;
    context.log(people_sets);
    //context.bindings.codexBlobOut = context.bindings.codexRecordIn;
    context.done();
};