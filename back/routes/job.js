const express = require ('express')
const router = express.Router();
const jobControllers = require('../controller/job.js');
const { addJobValidator,updateJobValidation, validate } = require('../middlewares/jobValidator.js');
const isAdmin = require ('../middlewares/isAdmin.js')
const isAuth = require('../middlewares/isAuth.js')



router.post('/add',addJobValidator,validate, jobControllers.createJob )
router.put('/update/:id',updateJobValidation, validate, jobControllers.updateJob)
router.patch('/delete/:id', jobControllers.deleteJob)
router.get('/get',isAuth, jobControllers.getAllJobs )
router.get('/get/:id', jobControllers.getOneJob)










module.exports = router