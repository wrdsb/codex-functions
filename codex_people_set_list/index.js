module.exports = function (context) {
    var people_sets = context.bindings.codexRecordsIn;

    var people_sets_array = [];
    var people_sets_object = {};
    
    people_sets.forEach(function (set) {
        people_sets_array.push(set);
        people_sets_object[set.id] = set;
    });

    context.bindings.codexBlobOutArray = JSON.stringify(people_sets_array);
    context.bindings.codexBlobOutObject = JSON.stringify(people_sets_object);
    context.done();
};