import { ReactNode } from "react";

export interface IStatisticsProviderProps {
    children: ReactNode;
}
export interface IStatisticsContextType {
    chartData:IDataChart;
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

export interface IDataChart {
    age:IoptionsChart;
    hasLicense:IoptionsChart;
    isFirstCar:IoptionsChart;
    fuelEmissionsConcern:IoptionsChart;
    drivetrain:IoptionsChart;
    carFeatures:IoptionsChart;
    tagertCustomers:IoptionsChart;
    groupPercentage:IoptionsChart;
    familyCars:IoptionsChart;
}

export interface IChartData {
    label: string;
    data: number[]; 
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    hoverOffset: number;
  }
  
export interface IoptionsChart {
    labels: string[]; 
    datasets: IChartData[]; 
  }
  