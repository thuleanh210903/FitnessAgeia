import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/category`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/category/${id}`);
  } catch (err) {
    console.error("Error deleting category:", err);
    throw new Error("Không thể xóa danh mục.");
  }
};

export const insertCategory = async (category: {
  name: string;
  image: File | string;
}) => {
  try {

    if (!(category.image instanceof File)) {
      throw new Error("Image must be a valid file.");
    }


    const formData = new FormData();

    formData.append("name", category.name);

      formData.append("file", category.image);

    const response = await axios.post(`${API_URL}/category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};


interface Category {
  name: string;
  image: string;
}

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axios.get(`${API_URL}/category/detail/${id}`);
    return response.data.data; 
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch category data.");
  }
};


export const updateCategory = async (id: string, data: FormData) => {
  try {
    const response = await axios.patch(`${API_URL}/category/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update category");
  }
};
