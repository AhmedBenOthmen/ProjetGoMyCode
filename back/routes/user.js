const express = require ('express')
const router = express.Router();
const userControllers = require('../controller/user.js');
const { updateUserValidation, validate } = require('../middlewares/userValidator.js')



router.get('/get/:id', userControllers.getOneUser)
router.get('/get', userControllers.getAllUsers)
router.put('/update/:id', updateUserValidation, validate, userControllers.updateUser)
router.patch('/delete/:id', userControllers.deleteUser)






module.exports = router
