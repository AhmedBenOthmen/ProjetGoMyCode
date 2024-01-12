import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../Redux/auth/authSlice';
import useJobList from '../JobList/useJobList';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export function useNavBar(handleRefresh) {
  // const { handleRefresh } = useJobList();
  const navigate = useNavigate(); // Use useNavigate from react-router-dom
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    handleRefresh({ title: query });
    // console.log(query, 'search');
    // console.log('1');
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return { searchQuery, handleSearch, onLogout };
}
