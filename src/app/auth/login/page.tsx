import Signin from "@/components/auth/Signin";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-500">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <Signin />
        </div>
        
      </div>
    </div>
  );
};

export default SignIn;
