module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var flynn_event;

    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record = data;

    if (!old_codex_record) { old_codex_record = {}; }

    // TODO: Fail if data does not include email

    // We use the Group's email address as the Cosmos DB record's id
    if (data.group) {
        data.id = data.group;
    }
    
    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexRecordOut = new_codex_record;

    flynn_event = {
        event_type: 'function_invocation',
        app: 'wrdsb-codex',
        operation: 'groups_memberships_supplemental_replace',
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
        body: flynn_event
    };
    context.log(JSON.stringify(flynn_event));
    context.done(null, JSON.stringify(flynn_event));
};
