module.exports = function (context) {   
    context.bindings.codexBlobOut = context.bindings.codexRecordIn;
    context.done();
};