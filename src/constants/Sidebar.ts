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
        href: "/categories",
      },
      {
        icon: walking,
        label: "Exercise",
        href: "/exercises",
      },
      {
        icon: goal,
        label: "Goal",
        href: "/goals",
      },
      {
        icon: workout,
        label: "Workout schedule",
        href: "/workouts",
      },
      {
        icon: profile,
        label: "Users",
        href: "/users",
      },
      {
        icon: profile,
        label: "Trainer",
        href: "/trainers",
      },
    ],
  },
];
