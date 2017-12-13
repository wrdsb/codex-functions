module.exports = function (context, data) {
    context.log(data);

    // Fail if data does not include email

    // Get the current record from Codex
    var current_record = context.bindings.codexGroupIn;
    context.log(current_record);

    // We use the Group's email address as the Cosmos DB record's id
    // and store the 'real' id as google_id.
    // So, if we have an id, and it's not an email address,
    // move it into the google_id, and replace it with the email address
    if (data.id && data.indexOf('@') == -1) {
        data.google_id = data.id;
        data.id = data.email;
    }
    
    // Merge request object into current record
    var merged_record = Object.assign(current_record, data);
    context.log(merged_record);

    context.bindings.codexGroupOut = merged_record;

    context.done();
};
