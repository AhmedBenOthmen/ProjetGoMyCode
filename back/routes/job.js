const express = require ('express')
const router = express.Router();
const jobControllers = require('../controller/job.js');



router.post('/add', jobControllers.createJob )
router.put('/update/:id',jobControllers.updateJob)
router.patch('/delete/:id', jobControllers.deleteJob)
router.get('/get', jobControllers.getAllJobs )










module.exports = router