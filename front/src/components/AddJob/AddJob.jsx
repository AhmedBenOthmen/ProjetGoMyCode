import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import api from '../../Services/api.js';
import {toast} from 'react-toastify'



const AddJob = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      company: '',
      location: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Retrieve user information from local storage
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
  
        if (!user) {
          // Handle not authenticated
          console.error('User not authenticated');
          toast.error('User not authenticated. Please log in.');
          // You can redirect to the login page or show an error message
          return;
        }
  
        // Assuming user information contains the user's ID
        const { _id: postedBy } = user;
  
        // Make an HTTP POST request to the backend
        const response = await api.post('/job/add', { ...formData, postedBy });
  
        // Handle the response if needed
        console.log('Job posted successfully:', response.data);
  
        // Show a success toast
        toast.success('Job posted successfully');
  
        // You can add additional logic here, such as showing a success message or redirecting the user
      } catch (error) {
        // Handle errors
        console.error('Error posting job:', error.message);
  
        // Show an error toast
        toast.error('Error posting job. Please try again.');
  
        // You can show an error message to the user or handle the error in another way
      }
    };
  
    return (
      <div className="AddJob">
        <h3>Post the job you want to be done</h3>
  
        <form onSubmit={handleSubmit}>
          <FloatingLabel controlId="title" label="Job Title" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FloatingLabel>
  
          <FloatingLabel controlId="description" label="Job Description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Job Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FloatingLabel>
  
          <FloatingLabel controlId="company" label="Company Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </FloatingLabel>
  
          <FloatingLabel controlId="location" label="Company Location" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Company Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FloatingLabel>
  
          <Button type="submit">Post Job</Button>
        </form>
      </div>
    );
  };
  
  export default AddJob;