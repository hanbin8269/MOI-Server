var express = require('express');
var router = express.Router();
var model = require('../models/userDAO');
var crypto = require('crypto');

router.post('/login', async (req, res) => {
    var resultUser = await new Promise((resolve, reject)=>{
        model.findUserByEmail(req.body.email, (results)=>{
            resolve(results);
        })
    })

    if (!resultUser) {
        res.status(400).send({'error' : "doesn't exist user"});
        res.end();
        return
    }

    // password 해싱
    const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(req.body.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
            if (err){
                reject(err);
            }
            resolve(key.toString('base64'));
        })
    });

    // password 일치 확인
    if (resultUser.password != hashedPassword){
        res.status(400)
        .send({'error':"incorrect password"})
        .end();
        return
    }
    
    res.status(200)
    .send({'message' : "login success"})
    .end();

})

router.post('/sign-up', async (req, res) =>{
    
    // password hashing
    const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(req.body.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
            if (err){
                reject(err);
            }
            resolve(key.toString('base64'));
        })
    });

    // 유저 생성할 때 데이터
    var data = {
        "email" : req.body.email,
        "password" : hashedPassword
    }

    // 유저 생성 Promise
    // 시간 남으면 exists user 예외처리도 만들자
    var createdUser = await new Promise((resolve, reject)=>{
        model.createUser(data, (results)=>{
            resolve(results);
        }
        )
    });

    console.log(createdUser)

    res.status(201)
    .send({"message" : "sign up success"})
    .end();
})


module.exports = router;