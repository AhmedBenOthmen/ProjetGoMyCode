import React from 'react';
import Card from 'react-bootstrap/Card';

const Comment = ({ name, text, createdAt }) => {
  // Convert createdAt to a Date object
  const createdAtDate = new Date(createdAt);

  // Format createdAtDate to a readable string
  const formattedCreatedAt = createdAtDate.toLocaleString();

  return (
    <div className='comment'>
      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Card.Subtitle className='text-muted'>Posted At: {formattedCreatedAt}</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Comment;
