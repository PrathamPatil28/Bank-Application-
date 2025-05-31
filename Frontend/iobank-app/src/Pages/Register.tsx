import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Select,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FaChevronRight, FaPiggyBank } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStatus, registerUser, resetStatus } from "../Slice/UserSlice";
import type { AppDispatch } from "../Store/Store";
import Loaders from "../Components/Loaders";
import { closeLoader, openLoader, showLoader } from "../Slice/PageSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

   const dispatch = useDispatch<AppDispatch>();
   const status = useSelector(fetchUserStatus);
   const isLoading = useSelector(showLoader);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phone: '',
      gender: '',
      dob: null,
      password: '',
      confirmPassword: '',
    },

    validate: {
      firstName: (value) => (!value ? "First name is required" : null),
      lastName: (value) => (!value ? "Last name is required" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => (value.length >= 3 ? null : "Username must be at least 3 characters"),
      phone: (value) => (/^\d{10}$/.test(value) ? null : "Enter 10-digit phone number"),
      gender: (value) => (!value ? "Gender is required" : null), 
      dob: (value) => (!value ? "Date of birth is required" : null),
      password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const enableButton = Object.values(form.values).every((val) => val);

  const register = () => {
    
    console.log("Registration Values:", form.values);
     dispatch(openLoader());
   dispatch(registerUser(form.values)); // ✅
    
    
    
    // alert("Registration successful");

  
  };

  useEffect (()=>{
       if (status === 'SUCCESS') {
         setTimeout(() => {
           dispatch(resetStatus());
           dispatch(closeLoader()); 
           navigate("/successful");
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
    <main className="fontFamily-roboto w-full flex flex-col  h-full justify-center items-center bg-gradient-to-r from-gray-400 to-white relative">
     
        {isLoading  && <Loaders/>}
      <section className="flex flex-col justify-center px-6 py-3 gap-6 items-center 
        w-full sm:w-4/5 md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white rounded-md shadow-lg">
        
        <h1 className="text-xl font-bold flex flex-col items-center">
          <FaPiggyBank size={40} />
          IO-Bank
        </h1>

        <form
          className="flex flex-col gap-3.5  w-full"
          onSubmit={form.onSubmit(() => register())}
        >
          <h2 className="text-lg font-semibold">Create your account</h2>

          <div className="flex gap-4">
            <TextInput
            withAsterisk
              label="First Name"
              placeholder="First Name"
              className="w-1/2"
              {...form.getInputProps("firstName")}
            />
            <TextInput
            withAsterisk
              label="Last Name"
              placeholder="Last Name"
              className="w-1/2"
              {...form.getInputProps("lastName")}
            />
          </div>

          

          <TextInput
          withAsterisk
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />

           <TextInput
          withAsterisk
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps("username")}
          />

          <NumberInput
          withAsterisk
            label="Phone"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            hideControls
            {...form.getInputProps("phone")}
          />

          <Select
          withAsterisk
            label="Gender"
            placeholder="Select gender"
            data={["Male", "Female", "Other"]}
            {...form.getInputProps("gender")}
          />

          <DateInput
          withAsterisk
            label="Date of Birth"
            placeholder="Select date"
            {...form.getInputProps("dob")}
          />
         
         <div className="flex w-full gap-4">
          <PasswordInput
          withAsterisk
            label="Password"
            placeholder="Enter password"
             className="w-1/2"
            {...form.getInputProps("password")}
          />

          <PasswordInput
          withAsterisk
            label="Confirm Password"
            placeholder="Re-enter password"
            className="w-1/2"
            {...form.getInputProps("confirmPassword")}
          />
          </div>

          <Button
            fullWidth
            disabled={!enableButton}
            type="submit"
            className={`${
              !enableButton ? "bg-blue-300 hover:bg-blue-200" : "hover:bg-opacity-90"
            } text-white mt-2 p-3 rounded-md transition-all duration-200 ease-in-out cursor-pointer`}
          >
            REGISTER
          </Button>

          <a className="underline text-blue-500 flex items-center justify-center mt-1" href="/login">
            Already have an account? <FaChevronRight className="ml-1" />
          </a>
        </form>
      </section>
    </main>
  );
};

export default Register;
