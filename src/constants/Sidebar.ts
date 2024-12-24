import profile from "@/assets/icons/profile.png";
import workout from "@/assets/icons/workout.png";
import goal from "@/assets/icons/goal.png";

import walking from "@/assets/icons/walking.svg";
import categories from "@/assets/icons/categories.jpg"
export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: categories,
        label: "Categories",
        href: "/dashboard/categories",
      },
      {
        icon: walking,
        label: "Exercise",
        href: "/dashboard/exercises",
      },
      {
        icon: goal,
        label: "Goal",
        href: "/dashboard/goals",
      },
      {
        icon: workout,
        label: "Workout schedule",
        href: "/dashboard/workouts",
      },
      {
        icon: profile,
        label: "Users",
        href: "/dashboard/user",
      },
      {
        icon: profile,
        label: "Trainer",
        href: "/dashboard/trainers",
      },
    ],
  },
];
