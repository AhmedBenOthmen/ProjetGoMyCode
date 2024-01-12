import axios from "axios";

const  API_URL = 'http://localhost:4000'

//Register user

const getAllJobs = async (searchQuery) => {
    if (searchQuery === null) {

        const response = await axios.get(`${API_URL}/auth/register`)
    } else {
        searchQuery.length > 0
        const response = await axios.get(`${API_URL}/auth/register`, searchQuery)
        

    }

    return response.data
}

//Register user

const addJobs = async (userData) => {
   
};


const authService = {
    getAllJobs,
    addJobs,
}

export default JobsService