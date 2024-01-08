const Job = require('../models/job.js')
const mongoose = require('mongoose');


exports.getAllJobs = async (req, res) => {
    try {
        let query = { isActive: true };

        if (req.query.title) {
            const titleRegex = new RegExp(req.query.title, 'i');
            query.title = titleRegex;
        }

        if (req.query.location) {
            const locationRegex = new RegExp(req.query.location, 'i');
            query.location = locationRegex;
        }

        if (req.query.company) {
            const companyRegex = new RegExp(req.query.company, 'i');
            query.company = companyRegex;
        }

        const jobs = await Job.find(query);

        let data =  jobs ;

        return res.status(200).json({
            payload: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error in getAllJobs"
        });
    }
};


exports.createJob = async (req, res) => {
    const { title, description, company, location, postedBy } = req.body;
  
    try {
      if (!title || !description || !company || !location || !postedBy) {
        return res.status(400).json({
          payload: 'Missing required fields',
        });
      }
  
      // Convert the postedBy to ObjectId
      const validObjectId = mongoose.Types.ObjectId.isValid(postedBy);
      if (!validObjectId) {
        return res.status(400).json({
          payload: 'Invalid user ID',
        });
      }
  
      const newJob = new Job({
        title,
        description,
        company,
        location,
        postedBy: mongoose.Types.ObjectId.createFromHexString(postedBy),
      });
  
      await newJob.save();
  
      return res.status(201).json({
        payload: newJob,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        payload: 'Error adding a Job',
        error: error.message,
      });
    }
  };

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        let data;
        if (job) {
            data = job;
        } else {
            data = "No Data Found";
        }

        return res.status(200).json({
            payload: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error in Updating Job",
        });
    }
};

exports.deleteJob = async (req,res)=>{
    try {
        const job = await Job.findOneAndUpdate({ _id: req.params.id }, { isActive: false })
        let data
        if (job) {
            data = "Job  Deleted"
        } else {
            data = "No Data Found"
        }

        return res.status(200).json({
            payload: data
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in deleting Job"
        })
    }
}

exports.getOneJob = async(req,res)=>{
    try {
        const job = await Job.findOne({_id:req.params.id , isActive:true})
        let data
        if (job) {
            data = job
        }else {
            data = "No job found"
        }
    
        return res.status(200).json({
            payload:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error IN getOneJob"
        })
    }
    }



