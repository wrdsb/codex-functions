module.exports = function (context, data) {
    var ipps_person = data;
    var positions = ipps_person.positions;

    var ipps_jobs = [];

    context.log(data);

    positions.forEach(function (position) {
        ipps_jobs.push(position.job_code);
    });

    context.res = {
        status: 200,
        body: ipps_jobs
    };

    context.done(ipps_jobs);
};
