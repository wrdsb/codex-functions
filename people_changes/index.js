module.exports = function (context, message) {
    context.log(context);

    var mail = {
        "personalizations": [ { "to": [ { "email": "james_schumann@googleapps.wrdsb.ca" } ] } ],
        from: "codex@wrdsb.ca",
        subject: "Codex person change",
        content: [{
            type: 'text/plain',
            value: message
        }]
    };

    context.done(null, mail);
};