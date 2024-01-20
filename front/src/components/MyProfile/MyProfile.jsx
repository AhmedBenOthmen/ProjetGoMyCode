// MyProfile.jsx
import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyProfile } from "./useMyProfile.js";

const MyProfile = () => {
  const { name, email, setName, setEmail, handleUpdate } = useMyProfile();

  return (
    <div className="myProfile" style={{height:"100vh",padding:"50px"}}>
      <InputGroup className="mb-3 updateName">
        <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Name"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3 updateEmail">
        <InputGroup.Text id="inputGroup-sizing">Email</InputGroup.Text>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <Button onClick={handleUpdate}>Update</Button>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
