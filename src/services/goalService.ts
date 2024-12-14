import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export const fetchGoal = async () => {
  try {
    const response = await axios.get(`${API_URL}/goal`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const insertGoal = async (goal: {
  title: string;
  image: File | string;
}) => {
  try {
    if (!(goal.image instanceof File)) {
      throw new Error("Image must be a valid file");
    }

    const formData = new FormData();

    formData.append("title", goal.title);

    formData.append("file", goal.image);

    const response = await axios.post(`${API_URL}/goal`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

interface Goal {
  title: string;
  image: string;
}

export const getGoalById = async (id: string): Promise<Goal> => {
  try {
    const response = await axios.get(`${API_URL}/goal/detail/${id}`);
    return response.data.data; // Đảm bảo rằng API trả về đúng cấu trúc dữ liệu
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch goal data.");
  }
};


export const updateGoal = async (id: string, data: FormData) => {
  try {
    const response = await axios.patch(`${API_URL}/goal/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update goal");
  }
};
