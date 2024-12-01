"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";
import view from "@/assets/icons/view.png";
import deleteIcon from "@/assets/icons/delete.png";
import Search from "@/components/Search";
import { CategoryColumn } from "@/constants/Table/CategoryColumn";
import plus from "@/assets/icons/plus.svg";
interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:40001/category");
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh mục");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderRow = (item: Category) => {

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
        <td className="table-cell">{item.name}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item._id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src={view} alt="" width={20} height={20} />
              </button>
            </Link>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
              onClick={() => handleDelete(item._id)}
            >
              <Image src={deleteIcon} alt="" width={20} height={20} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );


    if (confirmDelete) {
      try {
        // Gửi yêu cầu xóa đến API
        await axios.delete(`http://localhost:40001/category/${id}`);
        console.log(id)
        // Cập nhật lại danh sách categories sau khi xóa
        setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        setError("Không thể xóa danh mục");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Categories</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <Search />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={plus} alt="" width={30} height={30} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={CategoryColumn} renderRow={renderRow} data={categories} />
      {/* PAGINATION */}
    </div>
  );
};

export default CategoryList;
