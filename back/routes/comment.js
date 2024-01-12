const express = require("express");
const router = express.Router();
const commentcontrollers = require('../controller/comments.js')

router.post('/add/:id', commentcontrollers.createComment)
router.put('/update/:id', commentcontrollers.updateComment)
router.patch('/delete/:id', commentcontrollers.deleteComment)
router.get('/get/:id', commentcontrollers.getOneComment)
router.get('/get', commentcontrollers.getAllComments )



module.exports = router