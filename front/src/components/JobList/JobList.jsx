import React, { useState, useEffect } from 'react';
import Job from '../Job/Job.jsx';
import useJobList from './useJobList.js';
import './JobList.css';
import api from '../../Services/api.js';

function JobList({ jobs: propJobs, handleRefresh, error, loading }) {
  const { jobs, setJobs, loading: jobsLoading, error: jobsError, handleRefresh: jobsHandleRefresh } = useJobList();
 

  if (loading) {
    return <p>Loading...</p>; // Consider a more visually appealing loading indicator
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={handleRefresh}>Retry</button>
      </div>
    );
  }

  if (!jobs.length) return <h1>NO JOBS FOUND</h1>;

  return (
    <div className='JobList'>
    {propJobs.map((job) => (
      
        <Job job={job} key={job._id} />
      
    ))}
  </div>
);
}

export default JobList;
