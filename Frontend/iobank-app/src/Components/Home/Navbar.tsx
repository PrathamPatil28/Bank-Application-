import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { openNavbar } from "../../Slice/PageSlice";
import { useEffect, useState } from "react";
import {
    FaApplePay,
    FaCreditCard,
    FaLandmark,
    FaPiggyBank,
    FaUser,
    FaWallet,
} from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navbar = useSelector(openNavbar);

    const [currentPage, setCurrentPage] = useState(
        location.pathname.split("/")[2] || "home"
    );

    useEffect(() => {
        setCurrentPage(location.pathname.split("/")[2] || "home");
    }, [location]);

    const handleClick = (path: string) => {
        const page = path.endsWith("/dashboard") ? "home" : path.split("/")[2];
        setCurrentPage(page);
        navigate(path);
    };

    const pages = [
        { path: "/", icon: <FaLandmark />, label: "Home" },
        { path: "/dashboard/accounts", icon: <FaWallet />, label: "Accounts" },
        { path: "/dashboard/payments", icon: <FaApplePay />, label: "Payments" },
        { path: "/dashboard/transactions", icon: <FaFileInvoiceDollar />, label: "Transactions" },
        { path: "/dashboard/cards", icon: <FaCreditCard />, label: "Cards" },
        { path: "/dashboard/settings", icon: <IoMdSettings />, label: "Settings" },
        { path: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    ];

    return (
        <nav
            className={`${!navbar ? "hidden lg:flex flex-col" : "block"
                } fixed top-0 left-0 bottom-0 z-50 bg-gray-100 shadow-md w-60`}
        >
            <h1 className="text-xl font-bold w-full flex gap-2 items-center px-6 py-[25.2px] border-b border-gray-300 shadow-sm">
                <FaPiggyBank size={30} />
                IO-BANK
            </h1>

            <ul className="w-full text-gray-600 px-6 py-6">

                {pages.map((page, id) => {
                    const isActive =
                        currentPage === (page.path.split("/")[2] || "home");
                    return (
                        <li key={id} className="mb-2">
                            <button
                                onClick={() => handleClick(page.path)}
                                className={`w-full flex items-center gap-3 cursor-pointer p-3 rounded-md transition duration-200 
                                    ${isActive ? "bg-blue-500 text-white" : "bg-transparent"} 
                               hover:bg-blue-200 hover:text-black `}
                            >
                                {page.icon}
                                <span className="text-base font-medium">{page.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
