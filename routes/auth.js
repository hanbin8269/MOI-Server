var express = require('express');
var router = express.Router();
var model = require('../models/userDAO');
var crypto = require('crypto');


router.post('/sign-up', async (req, res) =>{

    const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(req.body.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
            if (err){
                reject(err);
            }
            resolve(key.toString('base64'));
        })
    });

    var userInfo = {
        "email" : req.body.email,
        "password" : hashedPassword
    }

    model.insertUser(userInfo, (results)=>{
        console.log(results);
    })
    res.render('index', {
        title : 'hello',
        name : hashedPassword,
        length: 1
    });
})


module.exports = router;