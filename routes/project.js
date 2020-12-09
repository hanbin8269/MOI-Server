var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient()

router.post('/project',async(req, res) =>{
    // 인증된 사용자인지 검사

    // users id 배열로 User 배열 생성
        // 존재하지 않는 User라면 `Does not exist User`
    // techs id 배열로 Tech 배열 생성
        // 존재하지 않는 tech라면 `Does not exist Tech`

    // 시간 되면 링크 유효성 검사

    project_result = await prisma.Project.create({
        data : {
            title : req.body.title,
            content : req.body.content,
            github_link : req.body.github_link,
            //users :  // User 배열 넣고,
            //techs : // Tech 배열 넣음
        }
    })

    res.send(result)
    .status(201)
    .end();
);
