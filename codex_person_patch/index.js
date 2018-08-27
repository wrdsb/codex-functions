module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var flynn_event;

    var old_codex_record;
    var new_codex_record_values;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record_values = data;

    // TODO: Fail if data does not include ein

    // We use the Person's ein as the Cosmos DB record's id
    if (!new_codex_record_values.id) {
        if (new_codex_record_values.ein) {
            new_codex_record_values.id = new_codex_record_values.ein;
        } else {
            context.done('No ID or EIN provided.');
        }
    }

    if (old_codex_record) {
        // Merge request object into current record
        new_codex_record = Object.assign(old_codex_record, new_codex_record_values);
    } else {
        old_codex_record = {};
        new_codex_record = new_codex_record_values;
    }

    context.bindings.codexRecordOut = new_codex_record;

    event = {
        event_type: 'function_invocation',
        app: 'wrdsb-codex',
        operation: 'codex_person_patch',
        function_name: context.executionContext.functionName,
        invocation_id: context.executionContext.invocationId,
        data: {
            old_record: old_codex_record,
            new_record: new_codex_record
        },
        timestamp: execution_timestamp
    };
    //context.bindings.flynnGrid = JSON.stringify(flynn_event);
    context.res = {
        status: 200,
        body: event
    };
    context.log(JSON.stringify(event));
    context.done(null, JSON.stringify(event));
};
