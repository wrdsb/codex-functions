module.exports = function (context, data) {
    var people_raw = context.bindings.peopleRaw;
    var peopleRecords = {};

    people_raw.forEach(function(row) {
        var personRecord = {
            username:       row.username.toLowerCase(),
            name:           row.first_name + ' ' + row.last_name,
            sortable_name:  row.last_name + ', ' + row.first_name,
            first_name:     row.first_name,
            last_name:      row.last_name,
            email:          row.email
        };

        var personPosition = {
            ipps_ein:                         row.ipps_ein,
            ipps_activity_code:               row.ipps_activity_code,
            ipps_employee_group_category:     row.ipps_employee_group_category,
            ipps_employee_group_code:         row.ipps_employee_group_code,
            ipps_employee_group_description:  row.ipps_employee_group_description,
            ipps_extension:                   row.ipps_extension,
            ipps_job_code:                    row.ipps_job_code,
            ipps_job_description:             row.ipps_job_description,
            ipps_location_code:               row.ipps_location_code,
            ipps_location_description:        row.ipps_location_description,
            ipps_panel:                       row.ipps_panel,
            ipps_phone_no:                    row.ipps_phone_no,
            ipps_school_code:                 row.ipps_school_code,
            ipps_school_type:                 row.ipps_school_type,
            ipps_home_location_indicator:     row.ipps_home_location_indicator,
            ipps_position_id:                 row.ipps_position_id,
            ipps_position_start_date:         row.ipps_position_start_date,
            ipps_position_end_date:           row.ipps_position_end_date
        };

        var ein = row.ipps_ein;
        var position_id = row.ipps_position_id;

        if (peopleRecords[ein]) {
            if (personPosition.ipps_home_location_indicator === 'Y') {peopleRecords[ein].ipps_home_location = personPosition.ipps_location_code;}
            peopleRecords[ein].positions[position_id] = personPosition;
        } else {
            if (personPosition.ipps_home_location_indicator === 'Y') {personRecord.ipps_home_location = personPosition.ipps_location_code;}
            personRecord.positions = {};
            personRecord.positions[position_id] = personPosition;
            peopleRecords[ein] = personRecord;
        }
    });

    context.bindings.peopleNow = peopleRecords;
    context.done();
};
