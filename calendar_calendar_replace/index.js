module.exports = function (context, data) {
    context.log(data);

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexRecordOut = data;

    context.done();
};
