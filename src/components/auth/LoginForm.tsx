"use client";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Button from "../Button";
import Link from "next/link";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if(!email.trim()|| !password.trim()) {
        alert("Vui long nhap day du thong tin");
      }
      const response = await login(email, password);
      const accessToken = response.data.accessToken
      Cookies.set('token', accessToken, {expires: 7})
      router.push('/dashboard')
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
