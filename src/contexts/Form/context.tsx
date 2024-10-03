import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IData, ITodoProviderProps, IUserContextType } from "./interfaces/form";

const FormContext = React.createContext<IUserContextType|null>(null);

const FormProvider:React.FC<ITodoProviderProps> = ({ children })=>{
    const {
        item:todos, 
        saveItem:saveTodos, 
      } = useLocalStorage('data',[], false);

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

    const addTodo = (text:IData) =>{
        const newTodos = [...todos];
        newTodos.push(text);
        saveTodos(newTodos)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo(formData)
    };

    return(
        <FormContext.Provider value={{
            addTodo,
            formData,
            handleChange,
            handleSubmit
        }}
        >
            {children}
        </FormContext.Provider>
    );
}
const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
export { FormContext, FormProvider, useFormContext }