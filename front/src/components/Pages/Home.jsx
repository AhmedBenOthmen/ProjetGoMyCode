import React from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import JobList from '../JobList/JobList.jsx'
import useJobList from '../JobList/useJobList.js'

const Home = () => {
  const { jobs, loading, error, handleRefresh } = useJobList();

  return (
    <div>
        <NavBar handleRefresh={handleRefresh}/>
        <JobList jobs = {jobs} loading = {loading} error ={error} handleRefresh={handleRefresh}/>
      
    </div>
  )
}

export default Home