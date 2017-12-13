module.exports = function (context, data) {
    context.log(data);

    // get the current record
    var current_record = context.bindings.codexGroup;
    context.log(current_record);
    
    // merge request object into current record and save
    //context.bindings.codexGroup = Object.assign(current_record, data);

    context.done();
};
