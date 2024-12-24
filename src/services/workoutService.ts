import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER;
import Cookies from "js-cookie";

export const fetchWorkout = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_URL}/workout`, {
      params: { page, limit } // Truyền các tham số phân trang
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};


export const addWorkout = async (workout: {
  title: string;
  image: File | string;
  difficulty: string;
  description: string;
  daysPerWeek: number;
  bmi: number;
  goal: string;
  totalDayOfPlan: number;
}) => {
  try {
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("title", workout.title);

    formData.append("file", workout.image);

    formData.append("difficulty", workout.difficulty);

    formData.append("description", workout.description);

    formData.append("goal", workout.goal);

    formData.append("daysPerWeek", workout.daysPerWeek.toString());

    formData.append("bmi", workout.bmi.toString());

    formData.append("totalDayOfPlan", workout.totalDayOfPlan.toString());

    const response = await axios.post(`${API_URL}/workout`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

