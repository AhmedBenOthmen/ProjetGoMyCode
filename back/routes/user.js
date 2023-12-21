const express = require ('express')
const router = express.Router();
const userControllers = require('../controller/user.js');



router.get('/get/:id', userControllers.getOneUser)
router.get('/get', userControllers.getAllUsers)
router.put('/update/:id', userControllers.updateUser)







module.exports = router
