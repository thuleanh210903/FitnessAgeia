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
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Cookies from "js-cookie";
import { addWorkout, fetchWorkout } from "@/services/workoutService";
import { fetchGoal } from "@/services/goalService";
import { WorkoutColumn } from "@/constants/Table/WorkoutColumn";

interface Goal {
  _id: string;
  title: string;
  image: string;
}

interface Workout {
  _id: string;
  title: string;
  image: string;
  difficulty: string;
  daysPerWeek: number;
  bmi: string;
  description: string;
  cycle: number;
  totalDayOfPlan: number;
  goal: Goal | null;
}

const Workout = () => {
  const [workout, setWorkout] = useState<Workout[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newWorkout, setNewWorkout] = useState({
    title: "",
    image: null as File | null,
    difficulty: "",
    description: "",
    daysPerWeek: 1,
    bmi: 1,
    goal: "",
    totalDayOfPlan: 1,
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
    const loadGoals = async () => {
      try {
        const response = await fetchGoal();
        setGoals(response);
      } catch (err) {
        console.error(err);
      }
    };

    const loadWorkouts = async () => {
      try {
        const response = await fetchWorkout(page, limit);
        setWorkout(response);
      } catch (err) {
        console.error(err);
      }
    };
    loadGoals();
    loadWorkouts();
  }, [page,limit]);
  const token = Cookies.get("token");
  const handleAddWorkout = async () => {
    try {
      const response = await fetch("http://206.189.158.70:40001/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Đảm bảo tiêu đề Content-Type
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newWorkout.title,
          difficulty: newWorkout.difficulty,
          description: newWorkout.description,
          daysPerWeek: newWorkout.daysPerWeek,
          bmi: newWorkout.bmi,
          goal: newWorkout.goal,
          totalDayOfPlan: newWorkout.totalDayOfPlan,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Error response:", data); 
        throw new Error(`Failed to add workout: ${data.message || 'Unknown error'}`);
      }
  
      if(response.ok) {
        alert("Thak")
      }
      setWorkout((prevWorkouts) => [...prevWorkouts, data]);
      setModalOpen(false);
      setNewWorkout({
        title: "",
        image: null,
        difficulty: "",
        description: "",
        daysPerWeek: 1,
        bmi: 1,
        goal: "",
        totalDayOfPlan: 1,
      });
    } catch (err) {
      console.error("Error adding workout:", err);
    }
  };
  
  

  // Render hàng trong bảng
  const renderRow = (item: Workout) => {
    return (
      <tr
        key={item._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="p-4">
          <img
            src={item.image}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </td>
        <td>{item.title}</td>
        <td>{item.daysPerWeek}</td>
        <td>{item.difficulty}</td>
        <td>{item.totalDayOfPlan}</td>
        <td>{item.bmi}</td>
        <td>{item.cycle}</td>
        <td>{item.goal?.title || "N/A"}</td>
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
      <Table columns={WorkoutColumn} renderRow={renderRow} data={workout} />


      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
  <Modal
    title="Add New Workout"
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
  >
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="Title"
          value={newWorkout.title}
          onChange={(e) => {
            setNewWorkout({ ...newWorkout, title: e.target.value });
          }}
        />
      
        <Input
          type="text"
          label="Description"
          value={newWorkout.description}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, description: e.target.value })
          }
        />
        {/* Difficulty Select */}
        <div>
          <label>Difficulty</label>
          <select
            className="w-full border rounded p-2"
            value={newWorkout.difficulty}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, difficulty: e.target.value })
            }
          >
            <option value="BEGINNER">BEGINNER</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
            <option value="NONE">NONE</option>
          </select>
        </div>

        {/* Days Per Week */}
        <Input
          type="number"
          label="Day Per Week"
          value={newWorkout.daysPerWeek}
          onChange={(e) => {
            setNewWorkout({
              ...newWorkout,
              daysPerWeek: Number(e.target.value),
            });
          }}
        />
        
        {/* BMI Select */}
        <div>
          <label>BMI</label>
          <select
            className="w-full border rounded p-2"
            value={newWorkout.bmi}
            onChange={(e) =>
              setNewWorkout({
                ...newWorkout,
                bmi: Number(e.target.value),
              })
            }
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((bmiValue) => (
              <option key={bmiValue} value={bmiValue}>
                {bmiValue}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="number"
          label="Total Day of Plan"
          value={newWorkout.totalDayOfPlan}
          onChange={(e) =>
            setNewWorkout({
              ...newWorkout,
              totalDayOfPlan: Number(e.target.value),
            })
          }
        />
        
        <div>
          <label>Goal</label>
          <select
            className="w-full border rounded p-2"
            value={newWorkout.goal}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, goal: e.target.value })
            }
          >
            <option value="">Select goal</option>
            {goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <Button
        type="button"
        className="w-full bg-blue-500 text-white"
        onClick={handleAddWorkout}
      >
        Insert
      </Button>
    </div>
  </Modal>
)}


   
    </div>
  );
};

export default Workout;
