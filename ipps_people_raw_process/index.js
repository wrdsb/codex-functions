module.exports = function (context, data) {
    var people_raw = context.bindings.peopleRaw;
    var peopleObject = {};
    var peopleArray = [];

    var series = require('async/series');

    series([
        function processPeopleRaw(people_raw, processPeopleRawCallback) {
            people_raw.forEach(function(row) {
                var personRecord = {
                    id:             row.ipps_ein,
                    ein:            row.ipps_ein,
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
        
                if (peopleObject[ein]) {
                    if (personPosition.ipps_home_location_indicator === 'Y') {peopleObject[ein].ipps_home_location = personPosition.ipps_location_code;}
                    peopleObject[ein].positions[position_id] = personPosition;
                } else {
                    if (personPosition.ipps_home_location_indicator === 'Y') {personRecord.ipps_home_location = personPosition.ipps_location_code;}
                    personRecord.positions = {};
                    personRecord.positions[position_id] = personPosition;
                    peopleObject[ein] = personRecord;
                }
            });
            processPeopleRawCallback(null, peopleObject);
        },
        function createPeopleArray(peopleObject, createPeopleArrayCallback) {
            Object.getOwnPropertyNames(peopleObject).forEach(function (person) {
                peopleArray.push(person);
            });
            createPeopleArrayCallback(null, peopleArray);
        }
    ],
    function(err, results) {
        if (err) {
            context.res = {
                status: 500,
                body: err
            };
            context.done(err);
            return;
        } else {
            context.bindings.peopleNow = results[1];
            context.res = {
                status: 200,
                body: {}
            };
            context.done();
        }
    });
};
