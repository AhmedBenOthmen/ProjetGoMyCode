const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true 
    },
    
    description: { 
      type: String, 
      required: true 
    },
    company: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    postedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default:null 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date
    },
    isActive:{
      type:Boolean,
      default:true
  }
  });
  
  module.exports=mongoose.model('Job',jobSchema);
  