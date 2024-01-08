import React, { useState, useEffect } from 'react';
import Job from '../Job/Job.jsx';
import useJobList from './useJobList.js';
import './JobList.css'

function JobList() {
  const { jobs, loading, error, handleRefresh } = useJobList();

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
if(!jobs.length ) return <h1>NO JOBS FOUND</h1>

 if(jobs.length) return (
    <div className='JobList'>
      {jobs.map(job => (
        <Job key={job._id} job={job} />
      ))}
    </div>
  );
}

export default JobList;