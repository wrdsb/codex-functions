module.exports = function (context, message) {
    context.log(context);

    context.bindings.person_change = JSON.stringify(message);

    context.done();
};
