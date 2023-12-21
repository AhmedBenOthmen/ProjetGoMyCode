const express = require("express");
const router = express.Router();
const authControllers = require('../controller/auth.js')
const {registerValidation, loginValidation , validate} = require('../middlewares/authValidator.js')

router.post('/register', registerValidation, validate, authControllers.register)
router.post('/login', loginValidation, validate, authControllers.login)
router.post('/logout', authControllers.logout)

module.exports = router