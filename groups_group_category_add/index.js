module.exports = function (context, data) {
    var current_record;
    var current_categories;
    var updated_categories;
    var updated_record;

    context.log(data);

    // TODO: Fail if data does not include id

    // Get the current record from Codex
    current_record = context.bindings.codexGroupIn;

    if (current_record) {
        context.log(current_record);

        // Get current record's categories
        current_categories = current_record.categories;

        if (current_categories && Array.isArray(current_categories)) {
            if (current_categories.indexOf(data.category) === -1) {
                updated_categories = current_categories.push(data.category);
            } else {
                updated_categories = current_categories;
            }
        } else {
            updated_categories = [data.category];
        }
        
        // Merge categories array back into current record
        current_record.categories = updated_categories;

        // Merge request object into current record
        updated_record = Object.assign(current_record);
        context.bindings.codexGroupOut = updated_record;

        context.log(updated_record);
        context.done();
        return;

    } else {
        context.done("Group does not exist");
        return;
    }
};