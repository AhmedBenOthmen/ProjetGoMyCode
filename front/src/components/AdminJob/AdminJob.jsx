import React from "react";
import "./AdminJob.css";
import deleteIcon from "../../assets/icons/deleteicon.png";
import useAdminJob from "./useAdminJob.js";

const AdminJob = ({ job, onDelete  }) => {
  const {handleDeleteClick} = useAdminJob(job,onDelete);
 
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
