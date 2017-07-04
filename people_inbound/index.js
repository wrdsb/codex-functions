module.exports = function (context, message) {
    // context.log(context);

    // variable to hold the record we'll write to Codex
    var mergedRecord;

    // if we already have a temp record for this EIN,
    // assign it to tempRecord, and remove it from 'message'
    if (context.bindings.tempRecord) {
        var tempRecord = context.bindings.tempRecord;
        // context.log(tempRecord);
        delete message.tempRecord;
    }

    // assign message to newRecord after removing oldRecord (if present)
    var newRecord = message;

    // variable to hold assignment from message
    var newAssignment = {};

    // add fields to new assignment, and delete them from new record main body
    newAssignment.ipps_activity_code              = newRecord.ipps_activity_code;
    newAssignment.ipps_employee_group_category    = newRecord.ipps_employee_group_category;
    newAssignment.ipps_employee_group_code        = newRecord.ipps_employee_group_code;
    newAssignment.ipps_employee_group_description = newRecord.ipps_employee_group_description;
    newAssignment.ipps_extension                  = newRecord.ipps_extension;
    newAssignment.ipps_job_code                   = newRecord.ipps_job_code;
    newAssignment.ipps_job_description            = newRecord.ipps_job_description;
    newAssignment.ipps_location_code              = newRecord.ipps_location_code;
    newAssignment.ipps_location_description       = newRecord.ipps_location_description;
    newAssignment.ipps_panel                      = newRecord.ipps_panel;
    newAssignment.ipps_phone_no                   = newRecord.ipps_phone_no;
    newAssignment.ipps_school_code                = newRecord.ipps_school_code;
    newAssignment.ipps_school_type                = newRecord.ipps_school_type;
    newAssignment.ipps_home_location_indicator    = newRecord.ipps_home_location_indicator;

    delete newRecord.ipps_activity_code;
    delete newRecord.ipps_employee_group_category;
    delete newRecord.ipps_employee_group_code;
    delete newRecord.ipps_employee_group_description;
    delete newRecord.ipps_extension;
    delete newRecord.ipps_job_code;
    delete newRecord.ipps_job_description;
    delete newRecord.ipps_location_code;
    delete newRecord.ipps_location_description;
    delete newRecord.ipps_panel;
    delete newRecord.ipps_phone_no;
    delete newRecord.ipps_school_code;
    delete newRecord.ipps_school_type;
    delete newRecord.ipps_home_location_indicator;

    if (newAssignment.ipps_home_location_indicator === 'Y') {newRecord.ipps_home_location = newAssignment.ipps_location_code;}
    
    /* We now have:
     *   A new record, which came in via our service bus
     *   A new assignment, which was pulled out of the new record
     *   An temp record for the same person, if one was present in people_temp
     *   An empty record, ready to become the merged record we'll write to people_temp
     */


    // if we have an old record, assign it to mergedRecord, then overwrite values as needed
    if (tempRecord) {
        mergedRecord = tempRecord;

        // update username
        mergedRecord.username = newRecord.username;

        // update email
        mergedRecord.email = newRecord.email;

        // update name
        mergedRecord.name = newRecord.name;

        // update sortable name
        mergedRecord.sortable_name = newRecord.sortable_name;

        // update first_name
        mergedRecord.first_name = newRecord.first_name;

        // update last_name
        mergedRecord.last_name = newRecord.last_name;

        // update ipps_home_location
        if (newRecord.ipps_home_location) {
            mergedRecord.ipps_home_location = newRecord.ipps_home_location;
        }

        //  compare new assigment with those already on file
        var was_assignment_modified = false;

        mergedRecord.assignments.forEach( function (assignment) {
            if (assignment.ipps_job_code            == newAssignment.ipps_job_code &&
                assignment.ipps_location_code       == newAssignment.ipps_location_code &&
                assignment.ipps_employee_group_code == newAssignment.ipps_employee_group_code
                ) {
                    assignment.ipps_job_code                   = newAssignment.ipps_job_code;
                    assignment.ipps_job_description            = newAssignment.ipps_job_description;
                    assignment.ipps_location_code              = newAssignment.ipps_location_code;
                    assignment.ipps_location_description       = newAssignment.ipps_location_description;
                    assignment.ipps_employee_group_code        = newAssignment.ipps_employee_group_code;
                    assignment.ipps_employee_group_category    = newAssignment.ipps_employee_group_category;
                    assignment.ipps_employee_group_description = newAssignment.ipps_employee_group_description;
                    assignment.ipps_school_code                = newAssignment.ipps_school_code;
                    assignment.ipps_school_type                = newAssignment.ipps_school_type;
                    assignment.ipps_panel                      = newAssignment.ipps_panel;
                    assignment.ipps_phone_no                   = newAssignment.ipps_phone_no;
                    assignment.ipps_extension                  = newAssignment.ipps_extension;
                    assignment.ipps_home_location_indicator    = newAssignment.ipps_home_location_indicator;
                    assignment.ipps_activity_code              = newAssignment.ipps_activity_code;

                    was_assignment_modified = true;
            }
        });

        // if we didn't find an assignment to modify, append our new assignment to the assignments array        
        if (!was_assignment_modified) {
            mergedRecord.assignments.push(newAssignment);
        }

    } else {
        mergedRecord = newRecord;
        mergedRecord.assignments = [newAssignment];
    }

    // write the merged record
    context.bindings.tempRecordOut = JSON.stringify(mergedRecord);

    context.done();
};
