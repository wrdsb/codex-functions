module.exports = function (context, data) {
    var current_record;

    context.log(data);

    // TODO: Fail if data does not include email

    // Get the current record from Codex
    current_record = context.bindings.codexRecordIn;
    context.log(current_record);

    if (current_record) {
        context.log(current_record);
        context.res = {
            status: 200,
            body: current_record
        };
        context.done(null, JSON.stringify(current_record));
        return;
    } else {
        context.res = {
            status: 404,
            body: "Not found."
        };
        context.done('404', 'Not found.');
        return;
    }
};
