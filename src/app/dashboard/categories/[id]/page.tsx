"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import { useState, useEffect } from "react";

interface UpdateCategoryProps {
  id: string;
  onClose: () => void;
}

interface Category {
  name: string;
  file?: File;
}

export const UpdateModal: React.FC<UpdateCategoryProps> = ({ id, onClose }) => {
  const [category, setCategory] = useState<{ name: string; image: string }>({
    name: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Fetch  data by ID
  const fetchCategoryById = async () => {
    try {
      const response = await getCategoryById(id);
      setCategory(response);
    } catch (err) {
      setError("Failed to load category data. Please try again.");
      console.error(err);
    }
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchCategoryById();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      if (fileToUpload) {
        formData.append("file", fileToUpload); // Thêm file mới nếu có
      }

      await updateCategory(id, formData); // Gửi FormData
      alert("Category updated successfully");
      onClose();
    } catch (err) {
      setError("Failed to update category. Please try again.");
      console.error(err);
    }
  };

  return (
    <Modal title="Update Category" isOpen={true} onClose={onClose}>
      <div>
        {error && <p className="text-red-500">{error}</p>}

        {/* Title Input */}
        <Input
          type="text"
          placeholder="Category's title"
          name="name"
          value={category.name}
          onChange={(e) =>
            setCategory((prev) => ({ ...prev, name: e.target.value }))
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
              setCategory((prev) => ({
                ...prev,
                image: URL.createObjectURL(file), // Preview ảnh mới
              }));
            }
          }}
          placeholder="Image"
        ></Input>

        {/* Display the current image */}
        {category.image && (
          <div className="mt-2">
            <p className="text-gray-500">Current Image:</p>
            <img
              src={category.image}
              alt="Image"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

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
