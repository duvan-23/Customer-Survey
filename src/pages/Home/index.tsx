import { FaClipboardList, FaUserAlt,   } from 'react-icons/fa'; 
import React from "react";
import { useHomeContext } from "../../contexts/home/context";
import logo from '../../logo.svg';
import backgroundImage from '../../assets/background.webp';
const Home: React.FC = ()=>{

  const {
    handleNavigate
  }=useHomeContext();

  return(
    <div 
      className="h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mb-10 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-32 w-auto" />
      </div>

      <div className="flex md:space-x-12 space-x-0 space-y-12 md:space-y-0 flex-col md:flex-row">
        <div 
          onClick={() => handleNavigate('/survey', ['user'])}
          className="cursor-pointer flex flex-col items-center bg-gradient-to-br 
          from-green-400 via-teal-400 to-blue-500 text-white rounded-2xl p-12 
          shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform w-80 h-96"
        >
          <div className="flex items-center justify-center bg-gradient-to-br from-teal-500 
            to-blue-600 p-10 rounded-full mb-8">
            <FaClipboardList className="text-6xl" />
          </div>
          <span className="text-3xl font-semibold">Customer</span>
        </div>

        <div 
          onClick={() => handleNavigate('/statistics', ['admin'])}
          className="cursor-pointer flex flex-col items-center bg-gradient-to-br 
            from-purple-400 via-blue-400 to-indigo-600 text-white rounded-2xl p-12 
            shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform w-80 h-96"
        >
          <div className="flex items-center justify-center bg-gradient-to-br 
            from-purple-500 to-blue-600 p-10 rounded-full mb-8">
            <FaUserAlt className="text-6xl" />
          </div>
          <span className="text-3xl font-semibold">User</span>
        </div>

      </div>
    </div>
  );
}

export {Home}