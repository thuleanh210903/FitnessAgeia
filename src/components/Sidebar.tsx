"use client";
import React, { useState } from "react";
import Image from "next/image";
import control from "@/assets/images/sidebar/control.png";
import { sidebarItem } from "@/constants/sidebar";
import Link from "next/link";

const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  return (
    <aside className={`h-screen transition-all ${expand ? "w-80" : "w-12"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center relative">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expand ? "w-40" : "w-0"
            }`}
            alt=""
          />
          <Image
            alt="control"
            src={control}
            className={`absolute cursor-pointer -right-3 rounded-full top-9 w-7 border-2 border-black ${
              !expand && "rotate-180"
            }`}
            onClick={() => setExpand(!expand)}
          />
        </div>

        <ul className="pt-6 space-y-4 px-4">
          {sidebarItem.map((item, index) => (
            <li key={index} className="transition-all">
              <Link
                href={item.path ? `/${item.path}` : "#"}
                className="flex items-center gap-4 p-3 cursor-pointer hover:bg-blue-400 hover:rounded-md transition-all"
              >
                {item.icon}
                <span
                  className={`transition-all ${expand ? "block" : "hidden"}`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
