import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER;
import Cookies from 'js-cookie';
export const fetchExercise = async () => {
  try {
    const response = await axios.get(`${API_URL}/exercise`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const addExercise = async (exercise: {
  name: string;
  steps: string;
  category: string;
  gifUrl: File | string;
  thumbnail: File | string;
}) => {
  try {
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("name", exercise.name);

    formData.append("file", exercise.gifUrl);

    formData.append("thumbnail", exercise.thumbnail);

    formData.append("steps", exercise.steps);

    formData.append("category", exercise.category);

    const response = await axios.post(`${API_URL}/exercise`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

interface Exercise {
  name: string;
  gifUrl: string;
  thumbnail: string;
  steps: string;
  category: string;
}

export const getExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await axios.get(`${API_URL}/exercise/${id}`);
    return response.data.data; 
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch category data.");
  }
};

export const updateExercise = async (id: string, data: FormData) => {
  try {
    const token = Cookies.get("token"); 
    const response = await axios.patch(`${API_URL}/exercise/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update exercise");
  }
};


