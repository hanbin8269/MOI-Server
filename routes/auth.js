var express = require('express');
var router = express.Router();
var model = require('../models/userDAO');
var crypto = require('crypto');

router.post('/login', async (req, res) => {
    var resultUser = await new Promise((resolve, reject)=>{
        model.findUserByEmail(req.body, (results)=>{
            resolve(results);
        })
    })

    if (!resultUser) {
        res.status(400).send({'error' : "doesn't exist user"});
        res.end();
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
        res.status(400).json({'error':"incorrect password"}).end();
    }
    
    res.status(200)
    .send({'message' : "login success"})
    .end();

})


module.exports = router;