"use client";
import React, { useState } from "react";
import Button from "../Button";
import Link from "next/link";
import Input from "@/components/Input";

const LoginForm = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: {preventDefault: () => void}) => {
    // ngăn chặn việc tải lại trang
    event.preventDefault();
    console.log(value.email);
    console.log(value.password)
  }

 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <div className="mb-6 flex items-center justify-between gap-2 py-2">
            <label className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-black">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="border-black mr-1"
              />
              Remember me
            </label>

            <Link
              href="/auth/forgot-password"
              className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button type = "submit" className="w-full">Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
