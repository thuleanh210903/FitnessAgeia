import LoginForm from "../LoginForm";
export default function Signin() {
  return (
    <>
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
    </>
  );
}
