"use client"
import React from "react";
import Button from "../Button";
import Link from "next/link";
import Input from "@/components/Input";

const LoginForm = () => {
  return (
    <form>
      <div>
        <div>
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
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
        <Button className="w-full">Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
