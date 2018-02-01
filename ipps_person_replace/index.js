module.exports = function (context, data) {
    context.log(data);

    // Fail if data does not include ein

    // We use the Person's EIN as the Cosmos DB record's id
    if (data.ein) {
        data.id = data.ein;
    }

    // Simply write data to database, regardless of what might already be there    
    context.bindings.codexIPPSPersonOut = data;

    context.done();
};
