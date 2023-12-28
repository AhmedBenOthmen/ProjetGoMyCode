import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const  API_URL = 'http://localhost:4000'

//Register user

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.payload))
        localStorage.setItem('token', JSON.stringify(response.data.token))
    }
    return response.data
}

//Register user

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.payload))
        localStorage.setItem('token', JSON.stringify(response.data.token))
    }
    return response.data
}

//logout user

const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

const authService = {
    register,
    logout,
    login
}

export default authService