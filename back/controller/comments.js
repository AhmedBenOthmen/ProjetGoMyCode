const mongoose = require('mongoose');
const Comment = require("../models/comments");


exports.createComment = async (req, res) => {
  const { text, user, userName} = req.body;
  const { id } = req.params;
  
  try {
    const newComment = new Comment({
      text,
      job: new mongoose.Types.ObjectId(id),
      user: new mongoose.Types.ObjectId(user),
      userName
    });
    
    await newComment.save();

    return res.status(201).json({
      payload: newComment,
    });
  } catch (error) {
    console.error("error",error);
    return res.status(500).json({
      payload: "Error adding a Comment",
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    let data;
    if (comment) {
      data = comment;
    } else {
      data = "No Comment Found";
    }

    return res.status(200).json({
      payload: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in Updating Comment",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { isActive: false }
    );
    let data;
    if (comment) {
      data = "Comment  Deleted";
    } else {
      data = "No Comment Found";
    }

    return res.status(200).json({
      payload: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in deleting Comment",
    });
  }
};

exports.getOneComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      isActive: true,
    });
    let data;
    if (comment) {
      data = comment;
    } else {
      data = "No Comment found";
    }

    return res.status(200).json({
      payload: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error IN getOneComment",
    });
  }
};

exports.getAllComments = async (req, res) => {


  try {
    const comments = await Comment.find({job:req.params.id}); // Adjust the query based on your data model
    return res.status(200).json({
      success: true,
      payload: comments,
    });
  } catch (error) {
    console.error('Error retrieving comments:', error);
    return res.status(500).json({
      success: false,
      errors: ['Internal Server Error'],
    });
  }
};

