var connection = require('./db')

exports.findUserByEmail = function(body, cb){
    sql = "SELECT * FROM drama where email=?";
    values = [body.email];
    connection.query(sql,values, function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}

exports.createUser = function(body, cb){
    sql = 'INSERT INTO user (email, password) VALUES(?, ?)';
    values = [body.title, body.actor];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    })
}