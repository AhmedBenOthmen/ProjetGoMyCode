const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    userName: { 
      type: String, 
      required: true 
    },
    job:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    text: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    isActive:{
      type:Boolean,
      default:true
  }
  });
  
  module.exports=mongoose.model('Comment',commentSchema);
  