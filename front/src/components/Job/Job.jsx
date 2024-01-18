import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../Services/api";
import Comment from "../Comment/Comment.jsx";
import './Job.css'

function Job({ job }) {
  const { _id, title, description, company, location, postedBy, createdAt } =
    job;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);

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
    <div className="job-container">
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Title : {title}</Card.Title>
        <Card.Text>Description : {description}</Card.Text>
        <Card.Text>Company : {company}</Card.Text>
        <Card.Text>Location : {location}</Card.Text>
        {/* <Card.Text>Posted By: {postedBy}</Card.Text> */}
        <Card.Text>
          Created At: {new Date(createdAt).toLocaleString()}
        </Card.Text>
        {/*<Button variant="primary">Apply</Button>*/}
      </Card.Body>

      {/* Comments mapping */}

      {comments.length > 0 && (
        <div className="job-comments">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              name={comment.userName}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      )}

      {/* Add Comment button */}
      <Button variant="primary" onClick={handleShow}>
        Add Comment
      </Button>

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
    </Card>
    </div>
  );
}

export default Job;
