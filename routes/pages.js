const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

router.get('/', (req, res, next) => {
    res.render('index', {title: "My application"});
})

router.get('/home', (req, res, next) => {
    res.send('Página Principal');
});


router.post('/login', (req, res, next) => {
    
    user.login(req.body.username, req.body.password, function(user) {
        if(user) {
            res.send('Logged in as: '+ user.username);
        } else {
            res.send('Username/Password incorrect!');
        }
    })
});


router.post('/register', (req, res, next) => {

    let userInput = {
        username: req.body.username,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if(lastId) {
            res.send('Welcome '+ userInput.username);
        } else {
            console.log('Error creating a new user...');
        }
    });
});


module.exports = router;