"use client";
import LoginForm from "@/components/auth/LoginForm";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-500">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="w-full p-8">
          <div className="my-6 flex items-center justify-center">
            <span className="block h-px w-full bg-slate-500"></span>
            <div className="block w-full min-w-fit bg-white px-3 text-center font-semibold text-4xl">
              LOGIN
            </div>
            <span className="block h-px w-full bg-slate-500"></span>
          </div>

          <div className="mb-4 mt-2">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
