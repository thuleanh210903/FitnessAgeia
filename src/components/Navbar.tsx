"use client";
import React from "react";
import Image from "next/image";
import message from "@/assets/icons/message.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.svg";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
interface JwtPayload {
  email: string;
}

const Navbar = () => {
  const [email, setEmail] = useState<string | null>();

  const router = useRouter()
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setEmail(decoded.email);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);


  const handleLogout = () => {
    Cookies.remove("token"); // Xóa token trong cookie
    setEmail(null); // Xóa email khỏi state
    router.push("/auth/login"); // Chuyển hướng người dùng về trang login
  }; 

  return (
    <div className="flex items-center justify-between p-4">
      {/* Search  */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src={search} alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* icon and user */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src={message} alt="" width={20} height={20} />
        </div>

        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">{email}</span>
        </div>
        <Image
          src={profile}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />

        {/* Nút Log Out */}
        {email && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Log Out
          </button>
        )}

      </div>



    </div>
  );
};

export default Navbar;
