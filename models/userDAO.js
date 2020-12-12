var connection = require('./db')

exports.findUserByEmail = function(email, cb){
    sql = "SELECT * FROM user where email=?";
    values = [email];
    var resultUser = connection.query(sql,values, (error, results)=> {
        if(error){
            console.log(error);
        }else{
            cb(results[0])
        }
    });
}

exports.createUser = function(data, cb){
    sql = 'INSERT INTO user (email, password) VALUES(?, ?)';
    values = [data.email, data.password];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    })
}