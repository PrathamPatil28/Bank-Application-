import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Slice/UserSlice";
import { openNavbar, toggleNavbar } from "../../Slice/PageSlice";
import { Button } from "@mantine/core";
import { FaBars, FaExchangeAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoIosSettings, IoMdNotifications } from "react-icons/io";

const Header = () => {
  const user = useSelector(fetchUser);
  const navbar = useSelector(openNavbar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    dispatch(toggleNavbar());
  };

  const initials =
    user?.firstName && user?.lastName
      ? user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
      : "U";

  return (
    <header className="fixed top-0 left-0 lg:left-[235px] right-0 bg-gray-100 shadow-md z-20 flex justify-between items-center px-6 py-5">
      {/* Left Section: Welcome Text */}
      <div className="flex items-center gap-4">
        <h1 className="text-black text-xl font-semibold whitespace-nowrap">
          Welcome, {user.username} 😊
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Buttons shown only on large screens */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="transparent"
            leftSection={<FaExchangeAlt />}
            size="sm"
            className="bg-blue-500 hover:!bg-blue-500 hover:!text-white !transition duration-200"
            onClick={() => navigate("/dashboard/convert")}
          >
            Convert
          </Button>

          <Button
            variant="transparent"
            onClick={() => navigate("/dashboard/settings")}
            className="!w-10 !h-10 !p-0 flex items-center justify-center bg-gray-200 hover:!bg-gray-300 !rounded-full"
          >
            <IoIosSettings size={33} className="text-gray-600" />
          </Button>

          <Button
            variant="light"
              onClick={() => navigate("/dashboard/profile")}
            className="!w-10 !h-10 !p-0 flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-md !rounded-full"
          >
            {initials}
          </Button>

          <Button
            variant="transparent"
            className="!w-10 !h-10 !p-0 flex items-center justify-center  hover:bg-gray-300 !rounded-full"
          >
            <IoMdNotifications size={30} />
          </Button>
        </div>

        {/* Navbar Toggle (Mobile Only) */}
        <div className="lg:hidden">
          <Button
            variant="default"
            size="xs"
            onClick={toggleNav}
            className="p-2 rounded-full"
          >
            {!navbar ? <FaBars size={18} /> : <FaX size={18} />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
