module.exports = function (context, message) {

    console.log(context);
    console.log(message);
    //context.bindings.employeeDocument = JSON.stringify({ 
        //id: context.bindings.myQueueItem.name + "-" + context.bindings.myQueueItem.employeeId,
        //name: context.bindings.myQueueItem.name,
        //employeeId: context.bindings.myQueueItem.employeeId,
        //address: context.bindings.myQueueItem.address
    //});

    context.done();
};
