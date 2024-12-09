"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { getCategoryById } from "@/services/categoryService";
import React, { useState } from "react";

interface UpdateCategoryProps {
  id: string;
  onClose: () => void;
}

export const UpdateModal: React.FC<UpdateCategoryProps> = ({ id, onClose }) => {
  const [category, setCategory] = useState<{ name: string; image: string }>({
    name: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);

  const fetchCategoryById = async() => {
    try {
        const category = await getCategoryById(id)
        console.log(category)

    }catch(err) {
        throw err
    }
  }

  const handleUpdate = () => {};

  return (
    <Modal title="Update Category" isOpen={true} onClose={onClose}>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="text"
          placeholder="Category's name"
          name="name"
          value={category.name}
          onChange={(e) =>
            setCategory((prev) => ({ ...prev, name: e.target.value }))
          }
        ></Input>

        <Input
          type="file"
          name="file"
          onChange={(e) =>
            setCategory((prev) => ({
              ...prev,
              image: e.target.files
                ? URL.createObjectURL(e.target.files[0])
                : "",
            }))
          }
          placeholder="Image"
        ></Input>

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
