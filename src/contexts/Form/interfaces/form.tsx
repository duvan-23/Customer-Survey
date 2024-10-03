import { ReactNode } from "react";

export interface ITodoProviderProps {
    children: ReactNode;
}

export interface IData {
    age: string;
    gender: string;
    hasLicense: string;
    isFirstCar: string;
    drivetrain: string;
    fuelEmissionsConcern: string;
    familyCars: string;
    carMake: string;
    carModel: string;
}

export interface IUserContextType {
    addTodo:(text:IData) => void;
    formData:IData;
    handleChange:(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent)=> void;
}

export interface Ioptions{
    label: string;
    key: string;
}