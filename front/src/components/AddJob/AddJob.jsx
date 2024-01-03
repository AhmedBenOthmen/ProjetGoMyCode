// AddJob.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAddJob } from './useAddJob.js';


const AddJob = () => {
  const { formData, loading, handleChange, handleSubmit } = useAddJob();

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

        <Button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};

export default AddJob;