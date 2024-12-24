"use client";
import IconButton from "@/components/IconButton";
import { fetchGoal, insertGoal } from "@/services/goalService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import view from "@/assets/icons/view.png";
import deleteIcon from "@/assets/icons/delete.png";
import Search from "@/components/Search";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { GoalColumn } from "@/constants/Table/GoalColumn";
import { insertCategory } from "@/services/categoryService";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { UpdateModal } from "./[id]/page";

interface Goal {
  _id: string;
  title: string;
  image: string;
}

const Goal = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    image: null as File | null,
  });


  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [currentGoalId, setCurrentGoalId] = useState<string | null>(null);

  const openUpdateModal = (id: string) => {
    setCurrentGoalId(id)
    setUpdateModalOpen(true)
  }


  useEffect(() => {
    const loadGoals = async () => {
      try {
        const response = await fetchGoal();
        setGoals(response);
      } catch (err) {
        throw err;
      }
    };

    loadGoals();
  }, []);

  //handle add new goal
  const handleAddGoal = async () => {
    console.log(newGoal)
    if (!newGoal.title || !newGoal.image) {
      return;
    }

    try {
      const addedGoal = await insertGoal({
        title: newGoal.title,
        image: newGoal.image as File,
      });

      setGoals((prevGoals) => [...prevGoals, addedGoal]);
      setModalOpen(false);
      setNewGoal({ title: "", image: null });
    } catch (error) {
      throw error;
    }
  };

  const renderRow = (item: Goal) => {
    return (
      <tr
        key={item._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          <img
            src={item.image}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
        </td>
        <td className="table-cell">{item.title}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href="">
              <IconButton
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
                onClick={() => openUpdateModal(item._id)}
              >
                <Image src={view} alt="" width={20} height={20} />
              </IconButton>
            </Link>

            <Link href="#">
              <IconButton
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
                onClick={() => {}}
              >
                <Image src={deleteIcon} alt="" width={20} height={20} />
              </IconButton>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Categories</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <Search />
          <div className="flex items-center gap-4 self-end">
            <Button
              className="w-8 h-8 flex items-center justify-center text-white text-2xl bg-blue-400"
              onClick={() => setModalOpen(true)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      {/* TABLE */}
      <Table columns={GoalColumn} renderRow={renderRow} data={goals} />

      {/* MODAL */}
      {isModalOpen && (
        <Modal
          title="Add new goal"
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="space-y-4">
            <div>
            <Input
                type="text"
                label="Goal's title"
                name="title"
                placeholder="Goal's title"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                type="file"
                label="Image"
                name="file"
                placeholder="Image Link"
                onChange={(e) =>
                  setNewGoal((prev) => ({
                    ...prev,
                    image: e.target.files ? e.target.files[0] : null,
                  }))
                }
              />
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleAddGoal}
              >
                Insert
              </Button>
            </div>
          </div>
        </Modal>
      )}


      {/* UPDATE MODAl */}
      {isUpdateModalOpen && currentGoalId && (
        <UpdateModal
        id={currentGoalId}
        onClose={() => setUpdateModalOpen(false)}
        >

        </UpdateModal>
      )}
    </div>
  );
};

export default Goal;
