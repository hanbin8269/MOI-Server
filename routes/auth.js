var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.post('/login', async (req, res) => {

    const resultUser = await prisma.user.findUnique({
        where:{
            email : req.body.email
        }
    })

    if (resultUser) {
        res.status(400).send({'error' : "doesn' exist user"});
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
        res.status(400).json({'error':"incorrect password"});
    }
    
    // cookie setting
    res.cookie("user", req.body.email, {
        expires : new Date(Date.now() + 900000),
        httpOnly:true
    })
    .status(200)
    .send({'message' : "login success"})
    .end();

})

router.post('/sign-up', async (req, res) =>{

    const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(req.body.password, process.env.SECRET_KEY, 100000, 64, 'sha512', (err, key) => {
            if (err){
                reject(err);
            }
            resolve(key.toString('base64'));
        })
    });

    await prisma.user.create({
        data : {
            email : req.body.email,
            password : hashedPassword
        },
    });

    res.status(201)
    .send({"message" : "sign up success"})
    .end();
})


module.exports = router;