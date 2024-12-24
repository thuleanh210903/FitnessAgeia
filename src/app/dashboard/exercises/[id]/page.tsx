"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { fetchCategory } from "@/services/categoryService";
import { getExerciseById, updateExercise } from "@/services/exerciseService";

import { useState, useEffect } from "react";

interface UpdateExerciseProps {
  id: string;
  onClose: () => void;
}

interface Category {
    _id: string;
    name: string;
    image: string;
  }
  

interface Exercise {
  name: string;
  file?: File;
  steps: string;
  category: string;
}

export const UpdateModal: React.FC<UpdateExerciseProps> = ({ id, onClose }) => {

    console.log(id)
  const [exercise, setExercise] = useState<{
    name: string;
    gifUrl: string;
    thumbnail: string;
    steps: string;
    category: string;
  }>({
    name: "",
    gifUrl: "",
    thumbnail: "",
    steps: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchExerciseById = async () => {
    try {
      const response = await getExerciseById(id);
      setExercise(response);
    } catch (err) {
      setError("Failed to load goal data. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExerciseById();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", exercise.name);
      formData.append("steps", exercise.steps);
      formData.append("category", exercise.category);
  
      // Chỉ thêm file nếu có thay đổi
      if (fileToUpload) {
        formData.append("file", fileToUpload);
      }
  
      await updateExercise(id, formData); // Gửi FormData đến API
      alert("Exercise updated successfully");
      onClose();
    } catch (err) {
      setError("Failed to update exercise. Please try again.");
      console.error(err);
    }
  };
  


  useEffect(() => {

    const loadCategories = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);



  return (
    <Modal title="Update Category" isOpen={true} onClose={onClose}>
      <div>
        {error && <p className="text-red-500">{error}</p>}

        {/* Title Input */}
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={exercise.name}
          onChange={(e) =>
            setExercise((prev) => ({ ...prev, name: e.target.value }))
          }
        ></Input>

        <Input
          type="text"
          placeholder="Steps"
          name="name"
          value={exercise.steps}
          onChange={(e) =>
            setExercise((prev) => ({ ...prev, steps: e.target.value }))
          }
        ></Input>

        {/* Image Upload Input */}
        <Input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setFileToUpload(file); // Lưu file để upload
              setExercise((prev) => ({
                ...prev,
                gifUrl: URL.createObjectURL(file), // Preview ảnh mới
              }));
            }
          }}
          placeholder="Image"
        ></Input>

        {/* Display the current image */}
        {exercise.gifUrl && (
          <div className="mt-2">
            <p className="text-gray-500">Current Image:</p>
            <img
              src={exercise.gifUrl}
              alt="Gif"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        

        <div>
          <label>Category</label>
          <select
            className="w-full border rounded p-2"
            value={exercise.category}
            onChange={(e) =>
              setExercise((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Update Button */}
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};
