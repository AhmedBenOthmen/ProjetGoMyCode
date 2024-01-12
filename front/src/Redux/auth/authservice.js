
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
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);

        if (response.data) {
            const { payload, token } = response.data;

            // Stockez le token dans localStorage pour une utilisation ultérieure
            localStorage.setItem('user', JSON.stringify(payload));
            localStorage.setItem('token', JSON.stringify(token));
            // console.log("token",token)

            // Configurez l'en-tête "Authorization" pour les requêtes ultérieures
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response.data;
    } catch (error) {
        // Gérer les erreurs de requête ici
        console.error(error);
        throw error;
    }
};

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