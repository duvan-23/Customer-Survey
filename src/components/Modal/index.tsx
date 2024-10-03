import React from "react";
import ReactDOM from 'react-dom';
import './Modal.css';
import { IFormProviderProps } from "../../contexts/Form/interfaces/form";
const Modal:React.FC<IFormProviderProps> = ({ children })=>{
    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal') as HTMLElement
    );
}

export { Modal };