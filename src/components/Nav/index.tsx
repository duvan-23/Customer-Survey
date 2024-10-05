import { FaHome } from "react-icons/fa";
import logo from '../../logo.svg';
import { useNavigate } from "react-router-dom";

const Nav = ()=>{
    const navigate = useNavigate();
    return(
        <nav className=" p-4 flex justify-between items-center w-full px-20 ">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <button 
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
                onClick={()=>{navigate('/')}}
            >
                <FaHome className="text-2xl" />
            </button>
        </nav>
    );

}

export { Nav };