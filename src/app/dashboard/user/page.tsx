"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import Search from "@/components/Search";
import { CategoryColumn } from "@/constants/Table/CategoryColumn";
import Button from "@/components/Button";
import { fetchUser } from "@/services/userService";
import { UserColumn } from "@/constants/Table/UserColumn";

interface Profile {
    age: number;
    gender: string;
    weight: number;
    height: number;
  }
  
  interface User {
    _id: string;
    email: string;
    role: string;
    profile: Profile;
  }
  

const UserList = () => {
  const [user, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUser();
        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh mục");
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const renderRow = (item: User) => {
    // Kiểm tra role, chỉ render khi role là 'USER'
    if (item.role !== 'USER') {
      return null; // Không render gì nếu role không phải 'USER'
    }
  
    return (
      <tr
        key={item._id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="table-cell">{item.email}</td>
        <td className="table-cell">{item.profile?.age}</td>
        <td className="table-cell">{item.profile?.height}</td>
        <td className="table-cell">{item.profile?.weight}</td>
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
          
        </div>
      </div>
      {/* LIST */}
      <Table columns={UserColumn} renderRow={renderRow} data={user} />
    
    </div>
  );
};

export default UserList;
