// useMyProfile.js
import { useState, useEffect } from "react";
import api from "../../Services/api.js";
import { toast } from "react-toastify";

export const useMyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const { username, email } = JSON.parse(userData);
      setName(username);
      setEmail(email);
    }
  }, []);

  const handleUpdate = () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const updateData = {
      username: name,
      email: email,
    };

    api.put(`/user/update/${userId}`, updateData)
      .then(response => {
        // console.log("Profile updated successfully:", response.data);

        // Update local storage with the new username and email
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user")),
          username: name,
          email: email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Show a toast notification for successful update
        toast.success("Profile updated successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        // You may want to handle errors in your application (e.g., show an error message)
      });
  };

  return {
    name,
    email,
    setName,
    setEmail,
    handleUpdate,
  };
};
