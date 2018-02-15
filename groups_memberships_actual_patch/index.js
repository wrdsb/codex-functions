module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var flynn_event;

    var old_codex_record;
    var new_codex_record_values;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record_values = data;

    // TODO: Fail if data does not include group email address

    // We use the Group's email address as the Cosmos DB record's id
    if (new_codex_record_values.group) {
        new_codex_record_values.id = new_codex_record_values.group;
    }

    if (old_codex_record) {
        // Merge request object into current record
        new_codex_record = Object.assign(old_codex_record, new_codex_record_values);
    } else {
        old_codex_record = {};
        new_codex_record = new_codex_record_values;
    }

    context.bindings.codexRecordOut = new_codex_record;

    flynn_event = {
        event_type: 'function_invocation',
        app: 'wrdsb-codex',
        operation: 'groups_memberships_actual_patch',
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
