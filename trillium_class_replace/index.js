module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var flynn_event;

    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record = data;

    if (!old_codex_record) { old_codex_record = {}; }

    // We use the Class's school_code and class_code as the Cosmos DB record's id
    new_codex_record.id = new_codex_record.school_code + '-' + new_codex_record.class_code;

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexRecordOut = new_codex_record;

    flynn_event = {
        id: 'codex-functions-' + context.executionContext.functionName +'-'+ context.executionContext.invocationId,
        eventType: 'Codex.Trillium.Class.Replace',
        eventTime: execution_timestamp,
        //subject: ,
        data: {
            event_type: 'function_invocation',
            app: 'wrdsb-codex',
            function_name: context.executionContext.functionName,
            invocation_id: context.executionContext.invocationId,
            data: {
                old_record: old_codex_record,
                new_record: new_codex_record
            },
            timestamp: execution_timestamp
        },
        dataVersion: '1'
    };
    context.bindings.flynnEventOut = JSON.stringify(flynn_event);
    context.res = {
        status: 200,
        body: flynn_event
    };
    context.log(JSON.stringify(flynn_event));
    context.done(null, JSON.stringify(flynn_event));
};
