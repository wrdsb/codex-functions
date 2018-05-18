module.exports = function (context) {
    var people_sets = context.bindings.codexRecordsIn;
    context.log(people_sets);   
    context.bindings.codexBlobOutArray = people_sets;
    context.done();
};