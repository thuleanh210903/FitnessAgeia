"use client";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import view from "@/assets/icons/view.png";
import deleteIcon from "@/assets/icons/delete.png";
import Search from "@/components/Search";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { fetchExercise } from "@/services/exerciseService";
import { ExerciseColumn } from "@/constants/Table/ExerciseColumn";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { fetchCategory } from "@/services/categoryService";
import { addExercise } from "@/services/exerciseService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UpdateModal } from "./[id]/page";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Exercise {
  _id: string;
  name: string;
  gifUrl: string;
  steps: string;
  thumbnail: string;
  isPublic: boolean;
  category: Category | null;
}


const Exercise = () => {
  const [exercise, setExercise] = useState<Exercise[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newExercise, setNewExercise] = useState({
    name: "",
    gifUrl: null as File | null,
    steps: "",
    thumbnail: null as File | null,
    isPublic: false,
    category: "",
  });
  const [email, setEmail] = useState<string | null>();

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(
    null
  );

  const openUpdateModal = (id: string) => {
    setCurrentExerciseId(id);
    setUpdateModalOpen(true);
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await fetchExercise();
        setExercise(response);
      } catch (err) {
        console.error(err);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response);
      } catch (err) {
        console.error(err);
      }
    };

    loadExercises();
    loadCategories();
  }, []);


  // Xử lý thêm bài tập mới
  const handleAddExercise = async () => {
    if (!newExercise.name || !newExercise.steps || !newExercise.category) {
      return;
    }
    console.log(newExercise)

    try {
      const addedExercsie = await addExercise({
        name: newExercise.name,
        steps: newExercise.steps,
        category: newExercise.category,
        gifUrl: newExercise.gifUrl as File,
        thumbnail: newExercise.thumbnail as File,
      });

      setExercise((prevExercises) => [...prevExercises, addedExercsie]);
      setModalOpen(false);
      setNewExercise({
        name: "",
        gifUrl: null,
        steps: "",
        thumbnail: null,
        isPublic: true,
        category: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Render hàng trong bảng
  const renderRow = (item: Exercise) => {
    return (
      <tr
        key={item._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="p-4">
          <img
            src={item.thumbnail}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </td>
        <td>{item.name}</td>
        <td>
          <img
            src={item.gifUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </td>
        <td>{item.steps}</td>
        <td>{item.isPublic ? "Yes" : "No"}</td>
        <td>{item.category?.name || "N/A"}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href="">
              <IconButton
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
                onClick={() => openUpdateModal(item._id)}
              >
                <Image src={view} alt="View" width={20} height={20} />
              </IconButton>
            </Link>

            <IconButton>
              <Image src={deleteIcon} alt="Delete" width={20} height={20} />
            </IconButton>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Exercises</h1>
        <div className="flex items-center gap-4">
          <Search />
          <Button onClick={() => setModalOpen(true)}>+ Add</Button>
        </div>
      </div>

      {/* TABLE */}
      <Table columns={ExerciseColumn} renderRow={renderRow} data={exercise} />

      {/* MODAL */}
      {isModalOpen && (
        <Modal
          title="Add New Exercise"
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="space-y-4">
            <Input
              type="text"
              label="Name"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
            />
            <Input
              type="file"
              label="Gif"
              onChange={(e) =>
                setNewExercise({
                  ...newExercise,
                  gifUrl: e.target.files ? e.target.files[0] : null,
                })
              }
            />
            <Input
              type="text"
              label="Steps"
              value={newExercise.steps}
              onChange={(e) =>
                setNewExercise({ ...newExercise, steps: e.target.value })
              }
            />
            <Input
              type="file"
              label="Thumbnail"
              onChange={(e) =>
                setNewExercise({
                  ...newExercise,
                  thumbnail: e.target.files ? e.target.files[0] : null,
                })
              }
            />
            <div>
              <label>Category</label>
              <select
                className="w-full border rounded p-2"
                value={newExercise.category}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, category: e.target.value })
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
            <Button
              className="w-full bg-blue-500 text-white"
              onClick={handleAddExercise}
            >
              Insert
            </Button>
          </div>
        </Modal>
      )}

      {/* UPDATE MODAL */}

      {isUpdateModalOpen && currentExerciseId && (
        <UpdateModal
          id={currentExerciseId}
          onClose={() => setUpdateModalOpen(false)}
        ></UpdateModal>
      )}
    </div>
  );
};

export default Exercise;
