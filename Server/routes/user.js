const express = require('express');
const { registerUser, loginUser, checkLoginStatus } = require('../controller/user');
const router = express.Router();


router.post('/signup', registerUser);


router.post('/login', loginUser);


router.get('/check', checkLoginStatus);

module.exports = router;
