var connection = require('./db')

exports.selectAllUser = function(cb){
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
