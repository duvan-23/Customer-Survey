import { ReactNode } from "react";

export interface IFormProviderProps {
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
    addData:(text:IData) => void;
    formData:IData;
    handleChange:(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent)=> void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>)=> void;
    bonusQuestion:{age:boolean, completed:boolean, completed2:boolean};
    openModal:{open:boolean,text:string};
    errorPattern:boolean;
}

export interface Ioptions{
    label: string;
    key: string;
}