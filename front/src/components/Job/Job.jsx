import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../Services/api";

function Job({ job }) {
  const { _id, title, description, company, location, postedBy, createdAt } = job;
  const [commentText, setCommentText] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCommentText(""); // Clear the comment text when closing the modal
  };

  const handleShow = () => setShow(true);

  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

  const handleComment = async (jobId) => {
    try {
      const response = await api.post(`/comment/add/${jobId}`, {
        text: commentText,
        user: userObject._id,
        userName: userObject.username,
      });
      handleClose();
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle errors, e.g., show a notification to the user
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{company}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>Posted By: {postedBy}</Card.Text>
        <Card.Text>Created At: {createdAt}</Card.Text>
        {/*<Button variant="primary">Apply</Button>*/}
      </Card.Body>

      {/* Comment Modal */}
      <Button variant="primary" onClick={handleShow}>
        Add Comment
      </Button>

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
  );
}

export default Job;
