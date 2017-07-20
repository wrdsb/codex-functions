module.exports = function (context, message) {
    // context.log(context);

    // for some reason, input bindings also appear in the message
    // let's remove it just in case things get weird
    delete message.existingRecord;

    // assign message to incomingRecord after removing existingRecord (if present)
    var incomingRecord = message;

    // did we get a change worth noting?
    var person_changed = false;

    // keep a tally of changes we find
    var people_changes = [];

    /* We now have:
     *   incomingRecord: An incoming record, which came in via 'message' from our service bus trigger
     *   existingRecord: An existing record for the same person, if one was present in Codex, which came in via our input binding
     *   person_changed: A boolean to track whether or not there is at least one difference between incomingRecord and existingRecord
     *   people_changes: An array to hold a record of the precise differences between incomingRecord and existingRecord
     *   updatedRecord: The record which will be written out to Codex, provided by our output binding
     */
    // context.log(incomingRecord);
    // context.log(context.bindings.existingRecord);

    // if we already have a record for this person in Codex
    if (context.bindings.existingRecord) {

        // Copy the existingRecord to the updatedRecord which will be written on context.done();
        // At the very least we'll be storing what we already had on file
        // This will update the Person's timestamp, so we know they're still around
        context.bindings.updatedRecord = context.bindings.existingRecord;

        // update username
        if (context.bindings.updatedRecord.username != incomingRecord.username) {
            people_changes.push({
                username: {
                    from: context.bindings.updatedRecord.username,
                    to: incomingRecord.username
                }
            });
            context.bindings.updatedRecord.username = incomingRecord.username;
            person_changed = true;
        }

        // update email
        if (context.bindings.updatedRecord.email != incomingRecord.email) {
            people_changes.push({
                email: {
                    from: context.bindings.updatedRecord.email,
                    to: incomingRecord.email
                }
            });
            context.bindings.updatedRecord.email = incomingRecord.email;
            person_changed = true;
        }

        // update name
        if (context.bindings.updatedRecord.name != incomingRecord.name) {
            people_changes.push({
                name: {
                    from: context.bindings.updatedRecord.name,
                    to: incomingRecord.name
                }
            });
            context.bindings.updatedRecord.name = incomingRecord.name;
            person_changed = true;
        }

        // update sortable name
        if (context.bindings.updatedRecord.sortable_name != incomingRecord.sortable_name) {
            people_changes.push({
                sortable_name: {
                    from: context.bindings.updatedRecord.sortable_name,
                    to: incomingRecord.sortable_name
                }
            });
            context.bindings.updatedRecord.sortable_name = incomingRecord.sortable_name;
            person_changed = true;
        }

        // update first_name
        if (context.bindings.updatedRecord.first_name != incomingRecord.first_name) {
            people_changes.push({
                first_name: {
                    from: context.bindings.updatedRecord.first_name,
                    to: incomingRecord.first_name
                }
            });
            context.bindings.updatedRecord.first_name = incomingRecord.first_name;
            person_changed = true;
        }

        // update last_name
        if (context.bindings.updatedRecord.last_name != incomingRecord.last_name) {
            people_changes.push({
                last_name: {
                    from: context.bindings.updatedRecord.last_name,
                    to: incomingRecord.last_name
                }
            });
            context.bindings.updatedRecord.last_name = incomingRecord.last_name;
            person_changed = true;
        }

        // update ipps_home_location
        if (context.bindings.updatedRecord.ipps_home_location != incomingRecord.ipps_home_location) {
            people_changes.push({
                ipps_home_location: {
                    from: context.bindings.updatedRecord.ipps_home_location,
                    to: incomingRecord.ipps_home_location
                }
            });
            context.bindings.updatedRecord.ipps_home_location = incomingRecord.ipps_home_location;
            person_changed = true;
        }

        // remove old fields we no longer use
        delete context.bindings.updatedRecord.ipps_ein;
        delete context.bindings.updatedRecord.ipps_activity_code;
        delete context.bindings.updatedRecord.ipps_employee_group_category;
        delete context.bindings.updatedRecord.ipps_employee_group_code;
        delete context.bindings.updatedRecord.ipps_employee_group_description;
        delete context.bindings.updatedRecord.ipps_extension;
        delete context.bindings.updatedRecord.ipps_job_code;
        delete context.bindings.updatedRecord.ipps_job_description;
        delete context.bindings.updatedRecord.ipps_location_code;
        delete context.bindings.updatedRecord.ipps_location_description;
        delete context.bindings.updatedRecord.ipps_panel;
        delete context.bindings.updatedRecord.ipps_phone_no;
        delete context.bindings.updatedRecord.ipps_school_code;
        delete context.bindings.updatedRecord.ipps_school_type;
        
        // compare the two assignments arrays,
        // pull out lists of any new ones, any changed ones, and any deleted ones
        var newAssignments = incomingRecord.assignments;
        var oldAssignments = context.bindings.existingRecord.assignments;

        var createdAssignments = [];
        var updatedAssignments = [];
        var deletedAssignments = [];

        createdAssignments = newAssignments.filter(function(newAssignment) {
            var matchFound = oldAssignments.some(function(oldAssignment) {
                if (oldAssignment.ipps_job_code            != newAssignment.ipps_job_code &&
                    oldAssignment.ipps_location_code       != newAssignment.ipps_location_code &&
                    oldAssignment.ipps_employee_group_code != newAssignment.ipps_employee_group_code
                ) return true;
            });
            return matchFound;
        });

        updatedAssignments = newAssignments.filter(function(newAssignment) {
            var matchFound = oldAssignments.some(function(oldAssignment) {
                if (oldAssignment.ipps_job_code            == newAssignment.ipps_job_code &&
                    oldAssignment.ipps_location_code       == newAssignment.ipps_location_code &&
                    oldAssignment.ipps_employee_group_code == newAssignment.ipps_employee_group_code &&

                    oldAssignment.ipps_job_description            != newAssignment.ipps_job_description &&
                    oldAssignment.ipps_location_code              != newAssignment.ipps_location_code &&
                    oldAssignment.ipps_location_description       != newAssignment.ipps_location_description &&
                    oldAssignment.ipps_employee_group_code        != newAssignment.ipps_employee_group_code &&
                    oldAssignment.ipps_employee_group_category    != newAssignment.ipps_employee_group_category &&
                    oldAssignment.ipps_employee_group_description != newAssignment.ipps_employee_group_description &&
                    oldAssignment.ipps_school_code                != newAssignment.ipps_school_code &&
                    oldAssignment.ipps_school_type                != newAssignment.ipps_school_type &&
                    oldAssignment.ipps_panel                      != newAssignment.ipps_panel &&
                    oldAssignment.ipps_phone_no                   != newAssignment.ipps_phone_no &&
                    oldAssignment.ipps_extension                  != newAssignment.ipps_extension &&
                    oldAssignment.ipps_home_location_indicator    != newAssignment.ipps_home_location_indicator &&
                    oldAssignment.ipps_activity_code              != newAssignment.ipps_activity_code
                ) return true;
            });
            return matchFound;
        });

        deletedAssignments = oldAssignments.filter(function(oldAssignment) {
            var matchFound = newAssignments.some(function(newAssignment) {
                if (newAssignment.ipps_job_code            != oldAssignment.ipps_job_code &&
                    newAssignment.ipps_location_code       != oldAssignment.ipps_location_code &&
                    newAssignment.ipps_employee_group_code != oldAssignment.ipps_employee_group_code
                ) return true;
            });
            return matchFound;
        });

        if (createdAssignments.length > 0) {
            person_changed = true;
            people_changes.push({
                created_assignments: createdAssignments
            });
        }

        if (updatedAssignments.length > 0) {
            person_changed = true;
            people_changes.push({
                updated_assignments: updatedAssignments
            });
        }

        if (deletedAssignments.length > 0) {
            person_changed = true;
            people_changes.push({
                deleted_assignments: deletedAssignments
            });
        }

        // update assignments - just replace the array of old assignments with the array of new ones
        context.bindings.updatedRecord.assignments = incomingRecord.assignments;

        if (person_changed) {
            context.log('Writing updated record for ID ' + context.bindings.updatedRecord.id);
            people_changes = {id: incomingRecord.id, update: people_changes};
            context.log(JSON.stringify(people_changes));
            context.bindings.peopleChangesTopic = JSON.stringify(people_changes);
        } else {
            context.log('No changes for ID ' + context.bindings.updatedRecord.id);
        }
        context.done();

    } else {
        context.bindings.updatedRecord = incomingRecord;
        context.log('Writing new record for ID ' + context.bindings.updatedRecord.id);

        people_changes = {id: incomingRecord.id, create: incomingRecord};
        context.log(JSON.stringify(people_changes));
        context.bindings.peopleChangesTopic = JSON.stringify(people_changes);

        context.done();
    }
};
