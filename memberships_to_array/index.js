module.exports = function (context, data) {
    var data_in = {};
    var data_out = [];

    data_in = data;

    Object.getOwnPropertyNames(data_in).forEach(function (membership) {
        data_out.push(data_in[membership]);
    });
    
    context.res = {
        status: 200,
        body: JSON.stringify(data_out)
    };

    context.done(null, JSON.stringify(data_out));
};
