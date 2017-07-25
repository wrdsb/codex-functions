module.exports = function (context, message) {
    context.log(context);

    context.bindings.change = message;

    context.done();
};
