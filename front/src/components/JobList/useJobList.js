import { useState, useEffect } from 'react';
import api from '../../Services/api.js';

function useJobList() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchJobs = () => {
      setLoading(true);
      setError(null);
  
      api.get('/job/get')
        .then(response => {
          console.log('Fetched jobs successfully:', response);
          setJobs(response.data.payload);
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
          const errorMessage = error.response?.data?.errors[0]?.msg || 'Failed to fetch jobs. Please try again later.';
          setError(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchJobs();
    }, []);
  
    const handleRefresh = () => {
      fetchJobs();
    };
  
    return {
      jobs,
      setJobs,
      loading,
      error,
      handleRefresh,
    };
  }
  
  export default useJobList;