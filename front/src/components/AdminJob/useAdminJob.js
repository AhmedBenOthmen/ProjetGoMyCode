import { useState } from "react";
import api from "../../Services/api.js";

const useAdminJob = (job, onDelete) => {
  const [error, setError] = useState(null);

  const handleDeleteClick = async () => {
    try {
      const response = await api.patch(`/job/delete/${job._id}`);

      if (response.status === 200) {
        console.log('Job deleted successfully');
        onDelete(job._id);
      } else {
        console.error('Error deleting job');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred while deleting the job');
    }
  };

  return {
    handleDeleteClick,
    error,
  };
};

export default useAdminJob;
