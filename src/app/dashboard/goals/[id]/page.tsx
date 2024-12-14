"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { getGoalById, updateGoal } from "@/services/goalService";
import { useState, useEffect } from "react";

interface UpdateGoalProps {
  id: string;
  onClose: () => void;
}

interface Goal {
  title: string;
  file?: File;
}

export const UpdateModal: React.FC<UpdateGoalProps> = ({ id, onClose }) => {

    console.log(id)
  const [goal, setGoal] = useState<{ title: string; image: string }>({
    title: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Fetch goal data by ID
  const fetchGoalById = async () => {
    try {
      const response = await getGoalById(id); // Assumes the API returns an object with title and image
      setGoal(response);
    } catch (err) {
      setError("Failed to load goal data. Please try again.");
      console.error(err);
    }
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchGoalById();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", goal.title);
      if (fileToUpload) {
        formData.append("file", fileToUpload); // Thêm file mới nếu có
      }

      await updateGoal(id, formData); // Gửi FormData
      alert("Goal updated successfully");
      onClose();
      
    } catch (err) {
      setError("Failed to update goal. Please try again.");
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
          placeholder="Goal's title"
          name="name"
          value={goal.title}
          onChange={(e) =>
            setGoal((prev) => ({ ...prev, title: e.target.value }))
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
              setGoal((prev) => ({
                ...prev,
                image: URL.createObjectURL(file), // Preview ảnh mới
              }));
            }
          }}
          placeholder="Image"
        ></Input>

        {/* Display the current image */}
        {goal.image && (
          <div className="mt-2">
            <p className="text-gray-500">Current Image:</p>
            <img
              src={goal.image}
              alt="Goal"
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
