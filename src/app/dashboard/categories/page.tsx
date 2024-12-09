"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";
import view from "@/assets/icons/view.png";
import deleteIcon from "@/assets/icons/delete.png";
import Search from "@/components/Search";
import { CategoryColumn } from "@/constants/Table/CategoryColumn";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import {
  fetchCategory,
  deleteCategory,
  insertCategory,
} from "@/services/categoryService";
import IconButton from "@/components/IconButton";
import { UpdateModal } from "./[id]/page";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null as File | null,
  });

  const openUpdateModal = (id: string) => {
    console.log(id)
    setCurrentCategoryId(id)
    setUpdateModalOpen(true)
  }


  // fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh mục");
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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
            <Link href="">
              <IconButton className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky" onClick={() => openUpdateModal(item._id)}>
                <Image src={view} alt="" width={20} height={20} />
              </IconButton>
            </Link>

            <Link href="#">
              <IconButton
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
                onClick={() => handleDelete(item._id)}
              >
                <Image src={deleteIcon} alt="" width={20} height={20} />
              </IconButton>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  // handle adding new category
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.image) {
      setError("Vui long nhap ten va hinh anh");
      return;
    }

    try {
      const addedCategory = await insertCategory({
        name: newCategory.name,
        image: newCategory.image as File,
      });

      setCategories((prevCategories) => [...prevCategories, addedCategory]);
      setModalOpen(false);
      setNewCategory({ name: "", image: null });
    } catch (error) {
      console.error("Không thể thêm danh mục:", error);
      setError("Không thể thêm danh mục");
    }
  };

  // delete category
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (confirmDelete) {
      try {
        await deleteCategory(id);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      } catch (error) {
        console.error(error);
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
            <Button
              className="w-8 h-8 flex items-center justify-center text-white text-2xl bg-blue-400"
              onClick={() => setModalOpen(true)}
            >
              {/* <Image src={plus} alt="" width={30} height={30} /> */}+
            </Button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={CategoryColumn} renderRow={renderRow} data={categories} />
      {/* PAGINATION */}

      {/* MODAL */}
      {isModalOpen && (
        <Modal
          title="Add new category"
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                label="Tên danh mục"
                name="name"
                placeholder="Nhập tên danh mục"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                type="file"
                label="Hình ảnh"
                name="file"
                placeholder="Nhập đường dẫn hình ảnh"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    image: e.target.files ? e.target.files[0] : null,
                  }))
                }
              />
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleAddCategory}
              >
                Insert
              </Button>
            </div>
          </div>
        </Modal>
      )}


      {/* UPDATE MODAL   */}

      {isUpdateModalOpen && currentCategoryId && (
        <UpdateModal
        id={currentCategoryId}
        onClose = {() => setUpdateModalOpen(false)}
        >

        </UpdateModal>
      )}
    </div>
  );
};

export default CategoryList;
