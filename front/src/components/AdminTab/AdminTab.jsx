import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdminJob from '../AdminJob/AdminJob.jsx';
import useJobList from '../JobList/useJobList.js';
import AdminUser from '../AdminUser/AdminUser.jsx';
import { useState } from 'react';
import useAdminUser from '../AdminUser/useAdminUser.js';




function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  
  const [value, setValue] = useState(0);
  const { jobs, setJobs, loading, error, handleRefresh } = useJobList();
  const { users,setUsers, loadingUsers, errorUsers } = useAdminUser();


  
  const handleDelete = (deletedJobId) => {
    // Update state by filtering out the deleted job
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== deletedJobId));
  };

  const handleDeleteUser = (deletedUserId) => {
    // Update state by filtering out the deleted user
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(!jobs.length ) return <h1>NO JOBS FOUND</h1>
 if (jobs.length)return (
    <Box sx={{ width: '100%' ,height:"100vh"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Jobs" {...a11yProps(0)} />
          <Tab label="All Users" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {jobs.map(job => (
              <AdminJob key={job._id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        )}
        <button onClick={handleRefresh}>Refresh Jobs</button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : errorUsers ? (
        <p>Error fetching users: {errorUsers}</p>
      ) : (
        <div>
          {users.map(user => (
            <AdminUser key={user._id} user={user} onDelete={handleDeleteUser} />
          ))}
        </div>
      )}
    </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      {/* Add more CustomTabPanel components for additional tabs */}
    </Box>
  );
}