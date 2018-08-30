module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var event;

    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;

    if (!old_codex_record) {
        var error = "Trillium Class record not found.";
        context.res = {
            status: 404,
            body: error
        };
        context.log(JSON.stringify(error));
        context.done(error);
    }

    new_codex_record = old_codex_record;
    new_codex_record.deleted_at = execution_timestamp;
    new_codex_record.deleted = true;

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexRecordOut = new_codex_record;

    event = {
        id: 'codex-functions-' + context.executionContext.functionName +'-'+ context.executionContext.invocationId,
        eventType: 'Codex.Trillium.Class.Delete',
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
    //context.bindings.flynnEventOut = JSON.stringify(flynn_event);
    context.res = {
        status: 200,
        body: event
    };
    context.log(JSON.stringify(event));
    context.done(null, JSON.stringify(event));
};
