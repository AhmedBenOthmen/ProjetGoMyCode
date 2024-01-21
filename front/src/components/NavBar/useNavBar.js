import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function useNavBar(handleRefresh) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    handleRefresh({ title: query });
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return { searchQuery, handleSearch, onLogout };
}
