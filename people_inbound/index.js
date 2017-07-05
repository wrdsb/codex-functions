module.exports = function (context, message) {
    // context.log(context);

    // for some reason, input bindings also appear in the message
    // let's remove it just in case things get weird
    if (context.bindings.existingRecord) {
        delete message.existingRecord;
    }

    // assign message to incomingRecord after removing existingRecord (if present)
    var incomingRecord = message;

    // did we get a change worth noting?
    var person_changed = false;

    // keep a tally of changes we find
    var people_changes = [];

    /* We now have:
     *   An incoming record, which came in via our service bus
     *   A temp record for the same person, if one was present in people_temp, via our input binding
     *   An array to hold a record of any changes we make
     */
    // context.log(incomingRecord);
    // context.log(context.bindings.existingRecord);

    // if we already have a temp record
    if (context.bindings.existingRecord) {

        // map the "in" existingRecord to the "out" updatedRecord which will be written on context.done();
        context.bindings.updatedRecord = context.bindings.existingRecord;

        // update username
        if (context.bindings.updatedRecord.username != incomingRecord.username) {
            context.bindings.updatedRecord.username = incomingRecord.username;
            people_changes.push({
                username: {
                    from: context.bindings.updatedRecord.username,
                    to: incomingRecord.username
                }
            });
            person_changed = true;
        }

        // update email
        if (context.bindings.updatedRecord.email != incomingRecord.email) {
            context.bindings.updatedRecord.email = incomingRecord.email;
            people_changes.push({
                email: {
                    from: context.bindings.updatedRecord.email,
                    to: incomingRecord.email
                }
            });
            person_changed = true;
        }

        // update name
        if (context.bindings.updatedRecord.name != incomingRecord.name) {
            context.bindings.updatedRecord.name = incomingRecord.name;
            people_changes.push({
                name: {
                    from: context.bindings.updatedRecord.name,
                    to: incomingRecord.name
                }
            });
            person_changed = true;
        }

        // update sortable name
        if (context.bindings.updatedRecord.sortable_name != incomingRecord.sortable_name) {
            context.bindings.updatedRecord.sortable_name = incomingRecord.sortable_name;
            people_changes.push({
                sortable_name: {
                    from: context.bindings.updatedRecord.sortable_name,
                    to: incomingRecord.sortable_name
                }
            });
            person_changed = true;
        }

        // update first_name
        if (context.bindings.updatedRecord.first_name != incomingRecord.first_name) {
            context.bindings.updatedRecord.first_name = incomingRecord.first_name;
            people_changes.push({
                first_name: {
                    from: context.bindings.updatedRecord.first_name,
                    to: incomingRecord.first_name
                }
            });
            person_changed = true;
        }

        // update last_name
        if (context.bindings.updatedRecord.last_name != incomingRecord.last_name) {
            context.bindings.updatedRecord.last_name = incomingRecord.last_name;
            people_changes.push({
                last_name: {
                    from: context.bindings.updatedRecord.last_name,
                    to: incomingRecord.last_name
                }
            });
            person_changed = true;
        }

        // update ipps_home_location
        if (context.bindings.updatedRecord.ipps_home_location != incomingRecord.ipps_home_location) {
            context.bindings.updatedRecord.ipps_home_location = incomingRecord.ipps_home_location;
            people_changes.push({
                ipps_home_location: {
                    from: context.bindings.updatedRecord.ipps_home_location,
                    to: incomingRecord.ipps_home_location
                }
            });
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
        
        // update assignments
        context.bindings.updatedRecord.assignments = incomingRecord.assignments;

        // TODO: compare the two assignments arrays,
        // pull out lists of any new ones, any changed ones, and any deleted ones

        //  compare new assigment with those already on file
        // var oldAssignments = updatedRecord.assignments;
        // var newAssignments = incomingRecord.assignments;
        // var createdAssignments;
        // var deletedAssignments;
        // var updatedAssignments;

        // loop through all new assignments, looking for matches amongst all old assignments
        // incomingRecord.assignments.forEach( function (incomingAssignment) {
            // context.bindings.updatedRecord.assignments.forEach( function (oldAssignment) {

                // if we find a match, update exiting record and remove assignment from incoming assignments
                // if (oldAssignment.ipps_job_code            == incomingAssignment.ipps_job_code &&
                    // oldAssignment.ipps_location_code       == incomingAssignment.ipps_location_code &&
                    // oldAssignment.ipps_employee_group_code == incomingAssignment.ipps_employee_group_code
                    // ) {
                        // oldAssignment.ipps_job_code                   = incomingAssignment.ipps_job_code;
                        // oldAssignment.ipps_job_description            = incomingAssignment.ipps_job_description;
                        // oldAssignment.ipps_location_code              = incomingAssignment.ipps_location_code;
                        // oldAssignment.ipps_location_description       = incomingAssignment.ipps_location_description;
                        // oldAssignment.ipps_employee_group_code        = incomingAssignment.ipps_employee_group_code;
                        // oldAssignment.ipps_employee_group_category    = incomingAssignment.ipps_employee_group_category;
                        // oldAssignment.ipps_employee_group_description = incomingAssignment.ipps_employee_group_description;
                        // oldAssignment.ipps_school_code                = incomingAssignment.ipps_school_code;
                        // oldAssignment.ipps_school_type                = incomingAssignment.ipps_school_type;
                        // oldAssignment.ipps_panel                      = incomingAssignment.ipps_panel;
                        // oldAssignment.ipps_phone_no                   = incomingAssignment.ipps_phone_no;
                        // oldAssignment.ipps_extension                  = incomingAssignment.ipps_extension;
                        // oldAssignment.ipps_home_location_indicator    = incomingAssignment.ipps_home_location_indicator;
                        // oldAssignment.ipps_activity_code              = incomingAssignment.ipps_activity_code;

                        // incomingRecord.assignments
                // } else {
                    
                // }
            // });
        // });

        context.log('Writing updated record for ID ' + context.bindings.updatedRecord.id);
        if (person_changed) {
            people_changes = {id: incomingRecord.id, update: people_changes};
            context.bindings.peopleChangesTopic = people_changes;
        }
        context.done();

    } else {
        context.bindings.updatedRecord = incomingRecord;
        context.log('Writing new record for ID ' + context.bindings.updatedRecord.id);
        if (person_changed) {
            people_changes = {id: incomingRecord.id, create: incomingRecord};
            context.bindings.peopleChangesTopic = people_changes;
        }
        context.done();
    }
};
