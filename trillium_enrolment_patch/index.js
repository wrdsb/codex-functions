module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var event;

    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexRecordIn;
    new_codex_record = data;

    if (old_codex_record) {
        // Merge request object into current record
        new_codex_record = Object.assign(old_codex_record, data);
    } else {
        new_codex_record = data;
        new_codex_record.created_at = execution_timestamp;
    }
    
    new_codex_record.updated_at = execution_timestamp;
    new_codex_record.deleted_at = null;
    new_codex_record.deleted = false;

    // We use the Enrolment's school_code, class_code, and student_number as the Cosmos DB record's id
    new_codex_record.id = new_codex_record.school_code + '-' + new_codex_record.class_code + '-' + new_codex_record.student_number;

    // Simply write data to database, regardless of what might already be there
    context.bindings.codexRecordOut = new_codex_record;

    event = {
        id: 'codex-functions-' + context.executionContext.functionName +'-'+ context.executionContext.invocationId,
        eventType: 'Codex.Trillium.Enrolment.Patch',
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
