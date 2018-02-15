module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var flynn_event;

    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record = data;

    if (!old_codex_record) { old_codex_record = {}; }

    // TODO: Fail if data does not include ein

    // We use the Person's EIN as the Cosmos DB record's id
    if (new_codex_record.ein) {
        new_codex_record.id = new_codex_record.ein;
    }

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexRecordOut = new_codex_record;

    flynn_event = {
        event_type: 'function_invocation',
        app: 'wrdsb-codex',
        operation: 'ipps_person_replace',
        function_name: context.executionContext.functionName,
        invocation_id: context.executionContext.invocationId,
        data: {
            old_record: old_codex_record,
            new_record: new_codex_record
        },
        timestamp: execution_timestamp
    };
    //context.bindings.skylineEvents = JSON.stringify(skyline_message);
    context.res = {
        status: 200,
        body: flynn_event
    };
    context.log(JSON.stringify(flynn_event));
    context.done(null, JSON.stringify(flynn_event));
};
