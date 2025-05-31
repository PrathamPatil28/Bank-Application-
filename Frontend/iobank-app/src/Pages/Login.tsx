import { useForm } from "@mantine/form";
import { FaChevronRight, FaPiggyBank } from "react-icons/fa";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useEffect } from "react";
import type { AppDispatch } from "../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStatus, loginUser, resetStatus } from "../Slice/UserSlice";
import { closeLoader, openLoader, showLoader } from "../Slice/PageSlice";
import { useNavigate } from "react-router-dom";
import Loaders from "../Components/Loaders";

const Login = () => {
 
  const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(fetchUserStatus);
   const isLoading = useSelector(showLoader);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: any) => (!value ? "Password is required" : null),
    },
  });

  const enableButton = form.values.username.length > 0 && form.values.password.length > 0;
  const disabledStyle = !enableButton ? "bg-blue-300 hover:bg-blue-200" : "hover:bg-opacity-90";

  const login = () => {
    console.log("Login Values:", form.values);
        dispatch(openLoader());
        dispatch(loginUser(form.values));
  };

    useEffect (()=>{
         if (status === 'SUCCESS') {
           setTimeout(() => {
             dispatch(resetStatus());
             dispatch(closeLoader()); 
             navigate("/dashboard");
           }, 3000);
         }
  
          if (status === 'FAILED') {
             setTimeout(() => {
            alert("Invalid credentials");
            dispatch(resetStatus());
            dispatch(closeLoader());
           }, 300);
          }
          
    },[dispatch, status,navigate])


  return (
    <main className="fontFamily-roboto flex flex-col w-screen sm:w-full 
       lg:w-screen md:w-screen h-screen justify-center items-center bg-gradient-to-r from-gray-400 to-white relative">

      {isLoading  && <Loaders/>}

      <section className="flex flex-col justify-center p-4 gap-8 items-center 
        w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5 bg-white rounded-md">

        <h1 className="text-2xl  font-bold flex flex-col items-center">
          <FaPiggyBank size={40} />
          IO-Bank
        </h1>

        <form
          className="flex flex-col gap-4 w-full p-5 -mt-5"
          onSubmit={form.onSubmit(() => login())}
        >
          <h2 className="text-lg">Login to your account</h2>

          <div className="flex flex-col gap-1 flex-1 w-full mt-2">
            <TextInput
              label="username"
              placeholder="Enter your username"
              {...form.getInputProps("username")}
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 w-full mt-2">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />
          </div>

          <Button
            fullWidth
            disabled={!enableButton}
            type="submit"
            className={`${disabledStyle} flex items-center justify-center text-white mt-4 p-3 rounded-md transition-all duration-200 ease-in-out cursor-pointer`}
          >
            LOGIN
          </Button>

          <a className="underline text-blue-500 flex items-center" href="/">
            Forget Password <FaChevronRight className="ml-1" />
          </a>
        </form>
      </section>
    </main>
  );
};

export default Login;
