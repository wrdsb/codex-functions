module.exports = function (context, data) {
    var current_record;
    var merged_record;

    context.log(data);

    // TODO: Fail if data does not include ein

    // We use the Person's ein as the Cosmos DB record's id
    if (data.ein) {
        data.id = data.ein;
    }
    
    // Get the current record from Codex
    current_record = context.bindings.codexIPPSPersonIn;
    context.log(current_record);

    if (current_record) {
        // Merge request object into current record
        merged_record = Object.assign(current_record, data);
    } else {
        merged_record = data;
    }
    context.log(merged_record);

    context.bindings.codexIPPSPersonOut = merged_record;

    context.done();
};
