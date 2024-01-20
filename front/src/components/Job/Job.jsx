import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../Services/api";
import Comment from "../Comment/Comment.jsx";
import "./Job.css";

function Job({ job }) {
  const { _id, title, description, company, location, postedBy, createdAt } =
    job;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [showComments, setShowComments] = useState("");

  const handleShowComments = () => setShowComments(_id);

  useEffect(() => {
    // Fetch comments when the component mounts
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comment/getCommentsByJob/${_id}`);
        setComments(response.data.payload);
      } catch (error) {
        console.error("Error fetching comments:", error);
        // Handle errors, e.g., show a notification to the user
      }
    };

    fetchComments();
  }, [_id]);

  const handleClose = () => {
    setShow(false);
    setCommentText(""); // Clear the comment text when closing the modal
  };

  const handleShow = () => setShow(true);

  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

  const handleComment = async () => {
    try {
      const response = await api.post(`/comment/add/${_id}`, {
        text: commentText,
        user: userObject._id,
        userName: userObject.username,
        job: _id,
      });
      handleClose();
      // Refresh comments after adding a new comment
      const updatedComments = await api.get(`/comment/getCommentsByJob/${_id}`);
      console.log(updatedComments, "updatedComments");
      setComments(updatedComments.data.payload);
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle errors, e.g., show a notification to the user
    }
  };

  return (
    <div className="jobCard">
     
        <div className="job-container">
          <span style={{textAlign:"center",fontWeight:"bold",textDecoration:"16px",padding:"5px"}} >Title : {title}</span>
          <span className="text-comment">Description : {description}</span>
          <span className="text-comment">Company : {company}</span>
          <span className="text-comment">Location : {location}</span>
          {/* <Card.Text>Posted By: {postedBy}</Card.Text> */}
          <span className="text-date">
            Created At: {new Date(createdAt).toLocaleString()}
          </span>
          {/*<Button variant="primary">Apply</Button>*/}
        </div>

        {/* Comments mapping */}

        {(showComments )  && (
          <div className="job-comments" style={{zIndex:'10', backgroundColor:'#00000049', backdropFilter: 'blur(10px)', width:'100%', height:'100%', position:'fixed', top:"0",left:"0",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{backgroundColor:"white", padding:"20px",width:"30%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"12px",flexDirection:"column"}}>
          <button style={{alignSelf:"end",borderRadius:"100%",width:"30px",height:"30px",border:"1px",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setShowComments("")}> x</button>
            {comments.map((comment) => (
              <Comment 
                key={comment._id}
                name={comment.userName}
                text={comment.text}
                createdAt={comment.createdAt}
              />
            ))}
            </div>
          </div>
        )}
      <div className="button-container">
        {/* show Comment button */}
        {comments.length > 0  && (
          <Button variant="primary" onClick={handleShowComments}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </Button>
        )}
        {/* Add Comment button */}
        <Button variant="primary" onClick={handleShow}>
          Add Comment
        </Button>
        </div>
        {/* Comment Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Type your comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleComment(job._id)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
  
    </div>
  );
}

export default Job;
