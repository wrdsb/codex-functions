module.exports = function (context, message) {
    // context.log(context);

    // for some reason, input bindings also appear in the message
    // let's remove it just in case things get weird
    if (context.bindings.existingRecord) {
        delete message.existingRecord;
    }

    // assign message to incomingRecord after removing existingRecord (if present)
    var incomingRecord = message;

    /* We now have:
     *   An incoming record, which came in via our service bus
     *   A temp record for the same person, if one was present in people_temp, via our input binding
     */
    // context.log(incomingRecord);
    // context.log(context.bindings.existingRecord);

    // if we already have a temp record
    if (context.bindings.existingRecord) {

        // map the "in" existingRecord to the "out" updatedRecord which will be written on context.done();
        context.bindings.updatedRecord = context.bindings.existingRecord;

        // update username
        context.bindings.updatedRecord.username = incomingRecord.username;

        // update email
        context.bindings.updatedRecord.email = incomingRecord.email;

        // update name
        context.bindings.updatedRecord.name = incomingRecord.name;

        // update sortable name
        context.bindings.updatedRecord.sortable_name = incomingRecord.sortable_name;

        // update first_name
        context.bindings.updatedRecord.first_name = incomingRecord.first_name;

        // update last_name
        context.bindings.updatedRecord.last_name = incomingRecord.last_name;

        // update ipps_home_location
        context.bindings.updatedRecord.ipps_home_location = incomingRecord.ipps_home_location;

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
        context.done();

    } else {
        context.bindings.updatedRecord = incomingRecord;
        context.log('Writing new record for ID ' + context.bindings.updatedRecord.id);
        context.done();
    }
};
