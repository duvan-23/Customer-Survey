import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {  IData, IDataChart, IStatisticsContextType, IStatisticsProviderProps } from "./interfaces/statistics";


const StatisticsContext = React.createContext<IStatisticsContextType|null>(null);

const StatisticsProvider:React.FC<IStatisticsProviderProps> = ({ children })=>{
    const {
        item
    } = useLocalStorage('dataSurvey',[], false);

    const [chartData, setChartData] = useState<IDataChart>({
        age: { labels: [], datasets: [] },
        hasLicense: { labels: [], datasets: [] },
        isFirstCar: { labels: [], datasets: [] },
        tagertCustomers: { labels: [], datasets: [] },
        fuelEmissionsConcern: { labels: [], datasets: [] },
        drivetrain: { labels: [], datasets: [] },
        carFeatures: { labels: [], datasets: [] },
        groupPercentage: { labels: [], datasets: [] },
        familyCars: { labels: [], datasets: [] },
    });

    const Age =()=>{
        return {adolescents: item.filter((user:IData) => +user.age < 18).length,adults:item.filter((user:IData) => +user.age >= 18).length };
    }

    const hasLicense =()=>{
        return {unlicensed:item.filter((user:IData) => user.hasLicense ==='no').length,licensed:item.filter((user:IData) => user.hasLicense === 'yes').length};
    }

    const firstTimers =()=>{
        return {isFirstCar:item.filter((user:IData) => (user.isFirstCar ==='yes' &&(+user.age >= 18 && +user.age <= 25))).length,manyCar:item.filter((user:IData) => (user.isFirstCar ==='no' &&(+user.age >= 18 && +user.age <= 25))).length};
    }

    const tagertCustomers =()=>{
        let validationLength = item.filter((user:IData) => (user.isFirstCar ==='no' &&(+user.age >= 18 && +user.age <= 25))).length;
        return {target:validationLength,other:item.length - validationLength};
    }

    const fuelEmissions =()=>{
        return {
            care:item.filter((user:IData) => (user.fuelEmissionsConcern ==='yes'&&(+user.age >= 18 && +user.age <= 25))).length,
            noCare:item.filter((user:IData) => (user.fuelEmissionsConcern ==='no'&&(+user.age >= 18 && +user.age <= 25))).length,
            count:item.filter((user:IData) => (user.fuelEmissionsConcern !=='' &&(+user.age >= 18 && +user.age <= 25))).length
        };
    }

    const drivetrain =()=>{
        return {
            powertrain:item.filter((user:IData) => ((user.drivetrain ==='idk'||user.drivetrain === 'fwd')&&(+user.age >= 18 && +user.age <= 25))).length,
            other:item.filter((user:IData) => ((user.drivetrain !=='idk' && user.drivetrain !=='fwd'&&user.drivetrain !=='')&&(+user.age >= 18 && +user.age <= 25))).length,
            count:item.filter((user:IData) => ((user.drivetrain !=='') &&(+user.age >= 18 && +user.age <= 25))).length
        };
    }

    const familyCars =()=>{
        const data = item.filter((user:IData) => ((user.familyCars !=='' &&+user.familyCars>0)&&(+user.age >= 18 && +user.age <= 25)));
        return {
            cars:data.reduce((a:number, b:IData) => a + (+b.familyCars), 0),
            count:data.length
        };
    }

    const carFeatures =()=>{
        let data = item.filter((user:IData) => ((user.carMake !=='' && user.carModel !=='' )&&(+user.age >= 18 && +user.age <= 25)));
        let filter:{ [key: string]: { count: number } } =  data.reduce((acc:{ [key: string]:{count:number}}, curr:IData) => {
            const key = `${curr.carMake} - ${curr.carModel.toUpperCase()}`; 
        
            if (!acc[key]) {
              acc[key] = {  count: 0 }; 
            }
            acc[key].count += 1; 
        
            return acc;
        }, {} as Record<string, { count: number }>)
        return filter;
    }
    
    const createChartData =(data:number[],backgroundColor:string[],labels:string[])=>{
        return {
            labels,
            datasets: [
              {
                label:'',
                data,
                backgroundColor,
                borderColor: ['rgba(75,192,192,1)'],
                borderWidth: 1,
                hoverOffset: 4
              },
            ],
        };
    }

    const colorDefault = ['rgb(255, 99, 132)','rgb(54, 162, 235)'];

    const dataAge =()=>{
        let {adolescents, adults} = Age();
        return createChartData([adolescents,adults],colorDefault,['Adolescents', 'Adults']);
    }

    const datahasLicense =()=>{
        let {unlicensed, licensed} = hasLicense();
        return createChartData([unlicensed,licensed],colorDefault,['Unlicensed','Licensed']);
    }

    const dataFirstTimers =()=>{
        let {isFirstCar, manyCar} = firstTimers();
        return createChartData([isFirstCar,manyCar],colorDefault,['Firts car','Already with a car']);
    }

    const dataTagertCustomers =()=>{
        let {target, other} = tagertCustomers();
        return createChartData([target,other],colorDefault,['Target','Others']);
    }

    const percentage=(num:number,length:number)=>{
        return +num>0?+((num*100)/length).toFixed(2):0;
    }

    const fuelEmissionsPercentage  = ()=>{
        let {care, noCare, count} = fuelEmissions();
        return createChartData([percentage(care, count),percentage(noCare, count)],colorDefault,['Care',"Do not care"]);
    }

    const groupPercentage  = ()=>{
        let {adolescents} = Age();
        let {unlicensed} = hasLicense();
        let {isFirstCar} = firstTimers();
        let {target} = tagertCustomers();

        return createChartData(
            [
                percentage(adolescents,item.length),
                percentage(unlicensed,item.length),
                percentage(isFirstCar,item.length),
                percentage(target,item.length)
            ],
            ['rgb(255, 99, 132)','rgb(75, 192, 192)','rgb(255, 205, 86)','rgb(201, 203, 207)'],
            ['Adolescents','Unlicensed','Firts car','Target']);
    }

    const dataDrivetrain  = ()=>{
        let {powertrain, other, count} = drivetrain();
        return createChartData([percentage(powertrain, count),percentage(other, count)],colorDefault,['FWD or “I don’t know”','Other']);
    }
    const dataFamilyCars  = ()=>{
        let {cars, count} = familyCars();
        return createChartData([+(cars/count).toFixed(2)],['rgb(255, 99, 132)'],['Cars']);
    }
    const dataCarFeatures  = ()=>{
        let data= carFeatures();
        let keys =Object.keys(data);
        let values:number[] = [];
        keys.forEach((entry) => {
            values.push(data[entry].count)
        });
        return createChartData(values,colorDefault,keys);
    }
    React.useEffect(()=>{
        setChartData(() => ({
            age:dataAge(),
            hasLicense:datahasLicense(),
            isFirstCar:dataFirstTimers(),
            tagertCustomers:dataTagertCustomers(),
            groupPercentage:groupPercentage(),
            fuelEmissionsConcern:fuelEmissionsPercentage(),
            drivetrain:dataDrivetrain(),
            familyCars:dataFamilyCars(),
            carFeatures:dataCarFeatures()
          }));
    },[item]);

    return(
        <StatisticsContext.Provider value={{
            chartData
        }}
        >
            {children}
        </StatisticsContext.Provider>
    );
}
const useStatisticsContext = () => {
    const context = React.useContext(StatisticsContext);
    if (!context) {
        throw new Error('useStatisticsContext must be used within a StatisticsProvider');
    }
    return context;
};
export { StatisticsContext, StatisticsProvider, useStatisticsContext }