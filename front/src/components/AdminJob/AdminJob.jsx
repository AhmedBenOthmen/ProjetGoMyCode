import React from "react";
import "./AdminJob.css";
import deleteIcon from "../../assets/icons/deleteicon.png";
import api from "../../Services/api.js";

const AdminJob = ({ job, onDelete  }) => {
  const handleDeleteClick = async () => {
    try {
      // Make an API request to delete the job
      const response = await api.patch(`/job/delete/${job._id}`);

      if (response.status === 200) {
        // Handle success, e.g., notify the user
        console.log('Job deleted successfully');

        // Call the onDelete function passed from the parent component
        onDelete(job._id);
      } else {
        // Handle error, e.g., show an error message
        console.error('Error deleting job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="AdminJob">
      <table>
        <tbody>
          <tr>
            <td>{job.title}</td>
            <td>{job.description}</td>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td>{job.postedBy}</td>
            <td>{job.createdAt}</td>
            <td>
            <img
                id="deleteIcon"
                src={deleteIcon}
                alt="Delete"
                onClick={handleDeleteClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminJob;
