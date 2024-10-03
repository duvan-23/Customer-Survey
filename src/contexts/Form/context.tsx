import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IData, IFormProviderProps, IUserContextType } from "./interfaces/form";
import { useNavigate } from "react-router-dom";
import { validateFirstPattern, validateSecondPattern } from "./validators";

const FormContext = React.createContext<IUserContextType|null>(null);

const FormProvider:React.FC<IFormProviderProps> = ({ children })=>{

    const {item:data, saveItem:saveData} = useLocalStorage('data',[], false);
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

        const updateFormData = (additionalData?: object) => {
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
              ...(additionalData || {}),
            }));
          };
        
        const handleLicenseChange = () => {
            if (value === "no") {
              updateFormData();
              addData({ ...formData, [name]: value });
              showModal("Thanks for your interest");
            } else {
              updateFormData();
              setBonusQuestion((prev) => ({ ...prev, completed: true }));
            }
        };
        
        const handleAgeChange = () => {
            if (/^(100|[1-9]?[0-9]|0)?$/.test(value)) {
              updateFormData();
            }
        };
        
        const handleFirstCarChange = () => {
            if (value === "yes") {
              updateFormData();
              addData({ ...formData, [name]: value });
              showModal("We are targeting more experienced clients, thank you for your interest");
            } else {
              updateFormData();
              setBonusQuestion((prev) => ({ ...prev, completed2: true }));
            }
        };
        
        const handleCarModelChange = () => {
            if (value.length === 0 || formData.carMake !== "BMW") {
              updateFormData();
            } else if (/^[XxZz]$/.test(value.charAt(0))) {
              validateFirstPattern(name, value, setFormData);
            } else {
              validateSecondPattern(name, value, setFormData);
            }
        };
        
        const handleCarMakeChange = () => {
            updateFormData({ carModel: '' });
        };
        
        const defaultUpdate = () => {
            updateFormData();
        };
        
        const handlers: Record<string, () => void> = {
            hasLicense: handleLicenseChange,
            age: handleAgeChange,
            isFirstCar: handleFirstCarChange,
            carModel: handleCarModelChange,
            carMake: handleCarMakeChange,
        };
        
        (handlers[name] || defaultUpdate)();

    };

    const isFirstCharacterDigit = (char: string): boolean => {
        return /^\d+$/.test(char);
      };

    const isFirstCharacterValid = (char: string): boolean => {
        return isFirstCharacterDigit(char) || /^[Mm]$/.test(char);
    };
      
    const isValidCarModel = (carModel: string, carMake: string): boolean => {
        const firstChar = carModel.charAt(0);
        const length = carModel.length;
        const count = isFirstCharacterDigit(firstChar) ? 2 : 3;
        return (
            carMake !== "BMW" ||
            (/^[XxZz]$/.test(firstChar) && length === 2) ||
            (isFirstCharacterValid(firstChar) && length >= count)
        );
    };
      
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isValidCarModel(formData.carModel, formData.carMake)) {
            addData(formData);
            showModal("Thanks for answering the survey");
            setErrorPattern(false);
        } else {
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
        if (name==='age'&& value !== '') {
            if ( +value < 18 ) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
                  addData({...formData,[name]:value})
                  showModal("Thank you for answering the survey");
            }else {
                let valueAge = +value>=18 && +value<=25;
                setBonusQuestion({...bonusQuestion,age:valueAge})
            }
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

export { FormContext, FormProvider, useFormContext }