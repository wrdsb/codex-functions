module.exports = function (context, message, document) {

    context.log(context);
    context.log(message);
    context.log(document);

    context.bindings.document = JSON.stringify({ 
        id: context.bindings.message.id,
        description: context.bindings.message.description,
        category: context.bindings.message.category
    });

    context.done();
};
