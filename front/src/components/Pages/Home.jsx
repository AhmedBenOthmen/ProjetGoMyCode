import React from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import JobList from '../JobList/JobList.jsx'
import Footer from '../Footer/Footer.jsx'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <JobList/>
        <Footer/>
    </div>
  )
}

export default Home