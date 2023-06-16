const express = require('express');
const { registerUser } = require('../controller/registerController');
const { userLogin } = require('../controller/loginController');


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

module.exports = router;