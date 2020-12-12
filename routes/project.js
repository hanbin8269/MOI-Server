var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { ContextBuilder } = require('express-validator/src/context-builder');
var model = require('../models/');

var isEmpty = function(value){ 
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true 
    }else{
         return false 
    } 
};


router.post('/', async(req, res) =>{
    // 인증된 사용자인지 검사

    var invalid_user_email = []
    
    // users id 배열로 User 배열 생성
    const user_list = await Promise.all(
        req.body.user_emails.map((user_email) => {
            return new Promise((resolve, reject)=>{
                model.userDAO.findUserByEmail(user_email,(results)=>{
                    if (isEmpty(results)){
                        invalid_user_email.push(user_email)
                    }
                    resolve(results);
                })
            })
        })
    )

        // 존재하지 않는 User 이메일 찾아서 `Does not exist User`
    if (!isEmpty(invalid_user_email)){
        res.send({"Doesn't exist email" : invalid_user_email})
        .status(400)
        .end();
        return
    }  

    var invalid_tech_name = []

    const tech_list = await Promise.all(
        req.body.tech_names.map((tech_name) => {
            return new Promise((resolve, reject)=>{
                model.projectDAO.getTechByName(tech_name,(results)=>{
                    if (isEmpty(results)){
                        invalid_tech_name.push(tech_name)
                    }
                    resolve(results);
                })
            })
        })
    )

        // 존재하지 않는 Tech name 찾아서 `Does not exist tech`
    if (!isEmpty(invalid_tech_name)){
        res.send({"Doesn't exist tech" : invalid_tech_name})
        .status(400)
        .end();
        return
    }
    data = {
        "title" : req.body.title,
        "content" : req.body.content,
        "github_link" : req.body.github_link, 
        "owner_email" : req.body.owner_email
    } 

    var project_result = await new Promise((resolve, reject)=>{
        model.projectDAO.createProject(data, (results)=>{
            // 나중에 에러 예외처리 넣어주자
            resolve(results);
        })
    }) 

    // const project_result = await prisma.Project.create({
    //     data : {
    //         title : req.body.title,
    //         content : req.body.content,
    //         github_link : req.body.github_link,
    //         //users :  // User 배열 넣고,
    //         //techs : // Tech 배열 넣음
    //     }
    // })

    res.send({"project" : data})
    .status(201)
    .end();
})

router.get('/', async(req,res)=>{ // get project
    var project_result = await new Promise((resolve, reject)=>{
        model.projectDAO.getProjectListByTitle(req.query.title, (results)=>{
            resolve(results);
        })
    })

    res.send({"project" : project_result})
    .status(200)
    .end();
})

module.exports = router