import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IData, IFormProviderProps, IUserContextType } from "./interfaces/form";
import { useNavigate } from "react-router-dom";

const FormContext = React.createContext<IUserContextType|null>(null);

const FormProvider:React.FC<IFormProviderProps> = ({ children })=>{
    const {
        item:data, 
        saveItem:saveData, 
      } = useLocalStorage('data',[], false);
    const [openModal, setOpenModal] = React.useState({open:false,text:''});
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        hasLicense: '',
        isFirstCar: '',
        drivetrain: '',
        fuelEmissionsConcern: '',
        familyCars: '',
        carMake: '',
        carModel: '',
    });
    
    const [ bonusQuestion, setBonusQuestion] = useState({age:false, completed:false, completed2:false});
    const [ errorPattern, setErrorPattern] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value  } = e.target;
        if (name ==="hasLicense" ) {
            if(value==="no"){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
    
                addData({...formData,[name]:value})
                showModal("Thanks for your interest");
            }else{
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                })); 
                setBonusQuestion({...bonusQuestion,completed:true})
            }


        }else if(name==="age"){
            if(/^(100|[1-9]?[0-9]|0)?$/.test(value)){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            }
        }else if(name==="isFirstCar"){
            if(value==="yes"){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
    
                addData({...formData,[name]:value})
                showModal("We are targeting more experienced clients, thank you for your interest");
            }else{
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                })); 
                setBonusQuestion({...bonusQuestion,completed2:true})
            }
        }else if(name==="carModel"){
            if (value.length === 0 || value===''|| formData.carMake !== "BMW") {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            } else if(/^[XxZz]$/.test(value.charAt(0))){
                validateFirstPattern(name, value, setFormData);
            }else{
                validateSecondPattern(name, value, setFormData);
            }
        }else if(name==='carMake'){
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                carModel:''
            })); 
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            })); 
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let count = /^\d+$/.test(formData.carModel.charAt(0))?2:3;
        if(formData.carMake !== "BMW" || (/^[XxZz]$/.test(formData.carModel.charAt(0)) && formData.carModel.length===2)||
           ((/^\d+$/.test(formData.carModel.charAt(0))|| /^[Mm]$/.test(formData.carModel.charAt(0)))&& formData.carModel.length>=count)){
               addData(formData);
               showModal("Thanks for answering the survey");
               setErrorPattern(false);
        }else{
            setErrorPattern(true);
        }
        
    };
    const navigate = useNavigate();

    const showModal =(text:string)=>{
        setOpenModal({open:true,text});
        setTimeout(() => {
            setOpenModal({open:false,text}); 
            navigate('/');
        }, 4000);
    }
    const addData = (text:IData) =>{
        const newData = [...data];
        newData.push(text);
        saveData(newData)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if ((name==='age' && +value < 18) ) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
              addData({...formData,[name]:value})
              showModal("Thank you for answering the survey");
        }else if(name==='age' ){
            let valueAge = +value>=18 && +value<=25;
            setBonusQuestion({...bonusQuestion,age:valueAge})
        }
    };
    return(
        <FormContext.Provider value={{
            addData,
            formData,
            handleChange,
            handleSubmit,
            handleBlur,
            bonusQuestion,
            openModal,
            errorPattern
        }}
        >
            {children}
        </FormContext.Provider>
    );
}
const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a FormProvider');
    }
    return context;
};

const validateSecondPattern = (name:string,value:string, setFormData: (value: React.SetStateAction<IData>) => void)=>{
    if(value.length === 1){
        if( /^[mM0-9]/.test(value)){
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
        }
    }else if(value.length>1 ){
        let count = /^\d+$/.test(value.charAt(0))?3:4;
        if(value.length<count){
            const firstChar = value.charAt(0);
            const rest = value.slice(1); 
            if( /^[mM0-9]/.test(firstChar) && /^\d+$/.test(rest)){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            }
        }else {
            const firstChar = value.charAt(0);
            const rest = value.slice(1, -1); 
            const lastChar = value.slice(-1);
            if( /^[mM0-9]/.test(firstChar)  && /^\d+$/.test(rest)&& /^[dDIi0-9]$/.test(lastChar)){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            }
        }
    }
}
const validateFirstPattern = (name:string,value:string, setFormData: (value: React.SetStateAction<IData>) => void)=>{
    if(value.length<3){
        if(value.length === 1){
            if( /^[XxZz]$/.test(value) || value===''){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            }
        }else if(value.length>1 && value.length<3){
            const firstChar = value.charAt(0);
            const rest = value.charAt(1); 
            if( /^[XxZz]$/.test(firstChar) && /^\d+$/.test(rest)){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
            }
        }
    }
}
export { FormContext, FormProvider, useFormContext }