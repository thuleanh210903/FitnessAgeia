import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login-trainer`, {email,password})
        return response.data;

    }
    catch (error) {
        throw error
    }
}