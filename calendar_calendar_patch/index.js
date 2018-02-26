module.exports = function (context, data) {
    var current_record;
    var merged_record;

    context.log(data);

    // Get the current record from Codex
    current_record = context.bindings.codexRecordIn;
    context.log(current_record);

    if (current_record) {
        // Merge request object into current record
        merged_record = Object.assign(current_record, data);
    } else {
        merged_record = data;
    }
    context.log(merged_record);

    context.bindings.codexRecordOut = merged_record;

    context.done();
};
