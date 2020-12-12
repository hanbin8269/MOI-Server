var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
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
                model.findUserByEmail(user_email,(results)=>{
                    if (isEmpty(results)){
                        invalid_user_email.push(user_email)
                    }
                    resolve(results);
                })
            })
        })
    )

        // 존재하지 않는 User 이메일 찾아서 `Does not exist User`
    if (isEmpty(invalid_user_email)){
        res.send({"Doesn't exist email" : invalid_user_email})
        .status(400)
        .end();
    }  

    var invalid_tech_name = []

    const tech_list = await Promise.all(
        req.body.tech_names.map((tech_name) => {
            return new Promise((resolve, reject)=>{
                model.findTechByName(tech_name,(results)=>{
                    if (isEmpty(results)){
                        invalid_tech_name.push(tech_name)
                    }
                    resolve(results);
                })
            })
        })
    )

        // 존재하지 않는 Tech name 찾아서 `Does not exist tech`
    if (isEmpty(invalid_tech_name)){
        res.send({"Doesn't exist tech" : invalid_tech_name})
        .status(400)
        .end();
    }
    // techs id 배열로 Tech 배열 생성
        // 존재하지 않는 tech라면 `Does not exist Tech`

    // 시간 되면 링크 유효성 검사

    // const project_result = await prisma.Project.create({
    //     data : {
    //         title : req.body.title,
    //         content : req.body.content,
    //         github_link : req.body.github_link,
    //         //users :  // User 배열 넣고,
    //         //techs : // Tech 배열 넣음
    //     }
    // })

    res.send({"Success" : [1,2,3]})
    .status(201)
    .end();
})

router.get('/project', async(req,res)=>{
    
})

module.exports = router