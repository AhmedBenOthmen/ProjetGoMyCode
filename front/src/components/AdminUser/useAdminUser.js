import { useState, useEffect } from 'react';
import api from '../../Services/api.js';

const useAdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user/get');
        setUsers(response.data.payload);
        setLoadingUsers(false);
      } catch (error) {
        setErrorUsers(error.message);
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);


  return { users,setUsers, loadingUsers, errorUsers };
};

export default useAdminUser;