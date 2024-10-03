import { FaClipboardList,   } from 'react-icons/fa'; 
import { GiPieChart } from 'react-icons/gi';
import React from "react";
import { useHomeContext } from "../../contexts/home/context";

const Home: React.FC = ()=>{

  const {
    handleNavigate
  }=useHomeContext();
    return(
      <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex space-x-8">

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleNavigate('/survey', ['user'])}
            className="flex flex-col items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <div className="bg-green-700 rounded-full p-4 shadow-lg flex items-center justify-center mb-2 transition-transform transform hover:scale-110">
              <FaClipboardList className="text-white text-2xl" />
            </div>
            Survey
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleNavigate('/statistics', ['admin'])}
            className="flex flex-col items-center bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            <div className="bg-yellow-700 rounded-full p-4 shadow-lg flex items-center justify-center mb-2 transition-transform transform hover:scale-110">
              <GiPieChart className="text-white text-2xl" />
            </div>
            Statistics
          </button>
        </div>
      </div>
    </div>
    )
}

export {Home}