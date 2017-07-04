module.exports = function (context, message) {
    context.log(context);

    // for some reason, input bindings also appear in the message
    // let's remove it just in case things get weird
    if (context.bindings.existingRecord) {
        delete message.existingRecord;
    }

    // assign message to incomingRecord after removing oldRecord (if present)
    var incomingRecord = message;

    // variable to hold assignment from message
    var incomingAssignment = {};

    // add fields to new assignment, and delete them from new record main body
    incomingAssignment.ipps_activity_code              = incomingRecord.ipps_activity_code;
    incomingAssignment.ipps_employee_group_category    = incomingRecord.ipps_employee_group_category;
    incomingAssignment.ipps_employee_group_code        = incomingRecord.ipps_employee_group_code;
    incomingAssignment.ipps_employee_group_description = incomingRecord.ipps_employee_group_description;
    incomingAssignment.ipps_extension                  = incomingRecord.ipps_extension;
    incomingAssignment.ipps_job_code                   = incomingRecord.ipps_job_code;
    incomingAssignment.ipps_job_description            = incomingRecord.ipps_job_description;
    incomingAssignment.ipps_location_code              = incomingRecord.ipps_location_code;
    incomingAssignment.ipps_location_description       = incomingRecord.ipps_location_description;
    incomingAssignment.ipps_panel                      = incomingRecord.ipps_panel;
    incomingAssignment.ipps_phone_no                   = incomingRecord.ipps_phone_no;
    incomingAssignment.ipps_school_code                = incomingRecord.ipps_school_code;
    incomingAssignment.ipps_school_type                = incomingRecord.ipps_school_type;
    incomingAssignment.ipps_home_location_indicator    = incomingRecord.ipps_home_location_indicator;

    delete incomingRecord.ipps_activity_code;
    delete incomingRecord.ipps_employee_group_category;
    delete incomingRecord.ipps_employee_group_code;
    delete incomingRecord.ipps_employee_group_description;
    delete incomingRecord.ipps_extension;
    delete incomingRecord.ipps_job_code;
    delete incomingRecord.ipps_job_description;
    delete incomingRecord.ipps_location_code;
    delete incomingRecord.ipps_location_description;
    delete incomingRecord.ipps_panel;
    delete incomingRecord.ipps_phone_no;
    delete incomingRecord.ipps_school_code;
    delete incomingRecord.ipps_school_type;
    delete incomingRecord.ipps_home_location_indicator;

    if (incomingAssignment.ipps_home_location_indicator === 'Y') {incomingRecord.ipps_home_location = incomingAssignment.ipps_location_code;}
    
    /* We now have:
     *   An incoming record, which came in via our service bus
     *   An incoming assignment, which was pulled out of the new record
     *   A temp record for the same person, if one was present in people_temp, via our input binding
     */
    context.log(incomingRecord);
    context.log(incomingAssignment);
    context.log(context.bindings.existingRecord);

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
        if (incomingRecord.ipps_home_location) {
            context.bindings.updatedRecord.ipps_home_location = incomingRecord.ipps_home_location;
        }

        //  compare new assigment with those already on file
        var was_assignment_modified = false;

        context.bindings.updatedRecord.assignments.forEach( function (assignment) {
            if (assignment.ipps_job_code            == incomingAssignment.ipps_job_code &&
                assignment.ipps_location_code       == incomingAssignment.ipps_location_code &&
                assignment.ipps_employee_group_code == incomingAssignment.ipps_employee_group_code
                ) {
                    assignment.ipps_job_code                   = incomingAssignment.ipps_job_code;
                    assignment.ipps_job_description            = incomingAssignment.ipps_job_description;
                    assignment.ipps_location_code              = incomingAssignment.ipps_location_code;
                    assignment.ipps_location_description       = incomingAssignment.ipps_location_description;
                    assignment.ipps_employee_group_code        = incomingAssignment.ipps_employee_group_code;
                    assignment.ipps_employee_group_category    = incomingAssignment.ipps_employee_group_category;
                    assignment.ipps_employee_group_description = incomingAssignment.ipps_employee_group_description;
                    assignment.ipps_school_code                = incomingAssignment.ipps_school_code;
                    assignment.ipps_school_type                = incomingAssignment.ipps_school_type;
                    assignment.ipps_panel                      = incomingAssignment.ipps_panel;
                    assignment.ipps_phone_no                   = incomingAssignment.ipps_phone_no;
                    assignment.ipps_extension                  = incomingAssignment.ipps_extension;
                    assignment.ipps_home_location_indicator    = incomingAssignment.ipps_home_location_indicator;
                    assignment.ipps_activity_code              = incomingAssignment.ipps_activity_code;

                    was_assignment_modified = true;
            }
        });

        // if we didn't find an assignment to modify, append our new assignment to the assignments array        
        if (!was_assignment_modified) {
            context.bindings.updatedRecord.assignments.push(incomingAssignment);
        }
        context.log(context.bindings.updatedRecord);
        context.done();

    } else {
        var newRecord = incomingRecord;
        newRecord.assignments = [incomingAssignment];
        context.bindings.updatedRecord = newRecord;
        context.done();
    }
};
