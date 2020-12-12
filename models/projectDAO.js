var connection = require('./db')

exports.getTechByName = function(tech_name, cb){
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

exports.getProjectListByTitle = function(title, cb){
    sql = "SELECT * From project where title = ?"
    values = [title]
    connection.query(sql,values,(error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            cb(results)
        }
    })
}

exports.getProjectByProjectID = function(project_id, cb){
    sql = "SELECT * From project where project_id = ?"
    values = [project_id]
    connection.query(sql,values,(error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            cb(results)
        }
    })
}