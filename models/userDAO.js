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

exports.selectUser = function(email, hashedPassword, cb){
    var sql = 'SELECT * FROM user where email=?';
    var values = [email, hashedPassword];

    connection.query(sql,values, (error, results, fields)=>{
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    })
}

exports.insertUser = function(userInfo, cb){
    sql = 'INSERT INTO user (email, password) VALUES(?, ?)';
    values = [userInfo.email, userInfo.password];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    })
}