var connection = require('./db')

exports.findTechByName = function(tech_name, cb){
    sql = "SELECT * FROM tech where name=?";
    values = [tech_name];
    connection.query(sql,values,(error, results)=>{
        if(error){
            cb(error)
        }
        else{
            cb(results)
        }
    })
}