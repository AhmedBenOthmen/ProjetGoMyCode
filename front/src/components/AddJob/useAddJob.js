// useAddJob.js
import { useState } from 'react';
import api from '../../Services/api.js';
import { toast } from 'react-toastify';

export const useAddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Retrieve user information from local storage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;

      if (!user) {
        // Handle not authenticated
        console.error('User not authenticated');
        toast.error('User not authenticated. Please log in.');
        // You can redirect to the login page or show an error message
        return;
      }

      // Assuming user information contains the user's ID
      const { _id: postedBy } = user;

      // Make an HTTP POST request to the backend
      const response = await api.post('/job/add', { ...formData, postedBy });

      // Handle the response if needed
      // console.log('Job posted successfully:', response.data);

      // Show a success toast
      toast.success('Job posted successfully');

      // Clear the form or perform other actions upon success
      setFormData({
        title: '',
        description: '',
        company: '',
        location: ''
      });
    } catch (error) {
      // Handle errors
      console.error('Error posting job:', error.message);

      // Show an error toast
      toast.error('Error posting job. Please try again.');

      // You can show an error message to the user or handle the error in another way
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
};
