import React, { useState, useEffect } from 'react';
import Job from '../Job/Job.jsx';
import api from '../../Services/api.js';
import './JobList.css'

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/job/get')
      .then(response => {
        console.log('Fetched jobs successfully:', response.data);
        setJobs(response.data.payload);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='JobList'>
      {jobs.map(job => (
        <Job key={job._id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
