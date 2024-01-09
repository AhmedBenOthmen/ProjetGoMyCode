import React from 'react'
import deleteIcon from '../../assets/icons/deleteicon.png'
import adminIcon from '../../assets/icons/admin.png'
import './AdminUser.css'
import api from '../../Services/api.js'

const AdminUser = ({user,onDelete  }) => {

    const handleDeleteClick = async () => {
        try {
          await api.patch(`/user/delete/${user._id}`);
          // Call the onDelete callback passed from the parent component
          onDelete && onDelete(user._id);
        } catch (error) {
          console.error('Error deleting user:', error);
          // Handle error as needed
        }
      };
  return (
    <div className='AdminUser'>
        <table>
        <tbody>
          <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? 'Admin' : 'Not Admin'}</td>
            <td>
            <img
                id="deleteIcon"
                src={deleteIcon}
                alt="Delete"

                onClick={handleDeleteClick}
                
              />
            
            <img
                id="adminIcon"
                src={adminIcon}
                alt="admin"
                
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminUser