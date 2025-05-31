import { FaCreditCard, FaFileInvoiceDollar, FaMoneyBill } from "react-icons/fa"
import SectionContainer from "../Section/SectionContainer"



const Payments = () => {
  return (
    <SectionContainer>
      <p className="font-bold text-gray-600">Quick Payments</p>
      <div className="flex flex-col sm:flex-row gap-6 sm:flex-wrap"> 
        <div className="bg-gray-100 flex flex-1 gap-4 p-6 border border-gray-200 rounded-lg  flex-col hover:border-blue-300 hover:cursor-pointer text-gray-600 transform transition duration-500 ease-in-out hover:translate-x-2 hover:shadow-lg ">
          <FaMoneyBill color="blue" size={50} />
          <p className="font-semibold">Bills Payment</p>
          <div className="flex flex-1 w-full justify-between text-sm">
           <p className="font-serif font-light text-base ">Pay all your bills, subscription , utility bills and more</p>
           </div>
        </div>

        <div className="bg-gray-100 flex flex-1 gap-4 p-6 border border-gray-200 rounded-lg   flex-col hover:border-blue-300 hover:cursor-pointer text-gray-600 transform transition duration-500 ease-in-out hover:translate-x-2 hover:shadow-lg">
          <FaFileInvoiceDollar color="blue" size={50} />
          <p className="font-semibold">Invoice</p>
          <div className="flex flex-1 w-full justify-between text-sm">
           <p className="font-serif font-light text-base">Pay all your bills, subscription , utility bills and more</p>
           </div>
        </div>

        <div className="bg-gray-100 flex flex-1 gap-4 p-6 border border-gray-200 rounded-lg   flex-col hover:border-blue-300 hover:cursor-pointer text-gray-600 transform transition duration-500 ease-in-out hover:translate-x-2 hover:shadow-lg">
          <FaCreditCard color="blue" size={50} />
          <p className="font-semibold">Card</p>
          <div className="flex flex-1 w-full justify-between text-sm">
          <p className="font-serif font-light text-base">Pay with your credit or debit card securely</p>
          </div>
        </div>


      </div>
    </SectionContainer>
  )
}

export default Payments 