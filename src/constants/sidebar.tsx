import { FiHome } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { FaPersonRunning } from "react-icons/fa6";
export const sidebarItem = [
  {
    title: "Home",
    icon: <FiHome className="w-5 h-5" />,
    path: "#"
  },

  {
    title: "Users",
    icon: <BiUser className="w-5 h-5" />,
    path: "#"
  },

  {
    title: "Trainers",
    icon: <BiUser className="w-5 h-5" />,
    path: "#"
  },

  {
    title: "Categories",
    icon: <BiCategory className="w-5 h-5" />,
    path: "#"
  },

  {
    title: "Workouts",
    icon: <FaPersonRunning className="w-5 h-5"/>,
    path: "#"
  },
];

