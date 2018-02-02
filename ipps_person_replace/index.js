module.exports = function (context, data) {
    var execution_timestamp = (new Date()).toJSON();  // format: 2012-04-23T18:25:43.511Z
    var skyline_record;
    var old_codex_record;
    var new_codex_record;

    old_codex_record = context.bindings.codexIPPSPersonIn;
    new_codex_record = data;

    // TODO: Fail if data does not include ein

    // We use the Person's EIN as the Cosmos DB record's id
    if (new_codex_record.ein) {
        new_codex_record.id = new_codex_record.ein;
    }

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexIPPSPersonOut = new_codex_record;

    skyline_record = {
        service: 'codex',
        operation: 'ipps_person_replace',
        function_name: context.executionContext.functionName,
        invocation_id: context.executionContext.invocationId,
        data: {
            old_record: old_codex_record,
            new_record: new_codex_record
        },
        timestamp: execution_timestamp
    };

    context.res = {
        status: 200,
        body: skyline_record
    };

    context.done(null, JSON.stringify(skyline_record));
};
