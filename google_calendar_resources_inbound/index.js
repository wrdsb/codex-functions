module.exports = function (context, message) {
    context.log(context);

    context.bindings.document = context.bindings.message;

    context.done();
};
