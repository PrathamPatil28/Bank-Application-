import { useNavigate } from "react-router-dom";


const RegistrationSuccessful = () => {
    const navigate = useNavigate();
  return (
       <section className="fontFamily-roboto w-screen flex flex-col  h-screen justify-center items-center bg-gradient-to-r from-gray-400 to-white relative">
        
        <div className="flex gap-2 flex-col">
            <h2 className="text-4xl font-bold">Registration Successful ✅ </h2>
            <p className="text-gray-600 font-bold text-center text-xl">Thank you for registering with IO-Bank!</p>
            <p className="text-gray-600 font-semibold text-center">You can now log in to your account. <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer">Login</span> </p>

        </div>

        </section>
  )
}

export default RegistrationSuccessful
