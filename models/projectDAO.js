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

exports.getProjectList= function( cb){
    sql = "SELECT * From project"
    connection.query(sql,(error, results)=>{
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

exports.deleteProjectByProjectID = function(project_id, cb){
    sql = "Delete From project where project_id = ?"
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

exports.createProject = function(data, cb){
    sql = "INSERT INTO project (title,content,github_link,owner_email) values( ? , ? , ? , ? );";
    values = [data.title, data.content, data.github_link, data.owner_email]
    connection.query(sql,values,(error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            cb(results)
        }
    })
}

exports.createTechProject = function(data, cb){
    sql = "INSERT INTO project_tech (tech_id, project_id) values( ? , ? );";
    values = [data.tech_id, data.project_id]
    connection.query(sql,values,(error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            cb(results)
        }
    })
}

exports.getTechByProjectID = function(project_id, cb){
    sql = "SELECT * FROM project_tech where project_id=?";
    values = [project_id];
    connection.query(sql,values,(error, results)=>{
        if(error){
            cb(error)
        }
        else{
            cb(results)
        }
    })
}

exports.getTechByTechID = function(tech_id, cb){
    sql = "SELECT * FROM tech where tech_id= ? ";
    values = [tech_id];
    connection.query(sql,values,(error, results)=>{
        if(error){
            cb(error)
        }
        else{
            cb(results)
        }
    })
}
