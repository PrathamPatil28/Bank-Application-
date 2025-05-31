import { Route, Routes } from "react-router-dom";
import Header from "../Components/Home/Header";
import Navbar from "../Components/Home/Navbar";
import Home from "../Components/Home";
import Account from "../Components/Account";
import Payment from "../Components/Payment";
import Transaction from "../Components/Transaction";
import Card from "../Components/Card";
import Settings from "../Components/Settings";
import Profile from "../Components/Profile";
import Convert from "../Components/Convert";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccount } from "../Slice/AccountSlice";
import type { AppDispatch } from "../Store/Store";
import { getCard } from "../Slice/CardSlice";


const Dashboard = () => {
   const dispatch = useDispatch<AppDispatch>();
    useEffect (()=>{
      dispatch(getAccount())
      dispatch(getCard())
      // dispatch(getTransactions(0))

    })

  return (
    <main className="fontFamily-roboto flex min-h-screen bg-gradient-to-r from-gray-300 to-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:ml-60  flex-1 w-full">
        <Header />

        <section className="flex-1 z-10 relative pt-12 p-2 sm:p-6 sm:mt-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/cards" element={<Card />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/convert" element={< Convert/>} />
          </Routes>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
