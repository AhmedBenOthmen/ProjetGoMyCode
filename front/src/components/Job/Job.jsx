import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Job({ job }) {
  const { title, description, company, location, postedBy, createdAt } = job;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{company}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>Posted By: {postedBy}</Card.Text>
        <Card.Text>Created At: {createdAt}</Card.Text>
        <Button variant="primary">Apply</Button>
      </Card.Body>
    </Card>
  );
}

export default Job;
