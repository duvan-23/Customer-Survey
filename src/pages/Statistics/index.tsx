import React from "react";
import { useStatisticsContext } from "../../contexts/Statistics/context";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, PolarAreaController, RadialLinearScale } from 'chart.js';
import { Bar, Pie, PolarArea } from 'react-chartjs-2';
import backgroundImage from '../../assets/background.webp';
import { optionsBar, optionsPie, optionsPolarArea } from "../../contexts/Statistics/options";
import { Nav } from "../../components/Nav";

Chart.register(CategoryScale, LinearScale, BarElement,ArcElement, Tooltip, Legend,PolarAreaController, RadialLinearScale);

const Statistics: React.FC = ()=>{
      const {
          chartData
        }=useStatisticsContext();
         
    return(
        <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        >
            <Nav />
            <div className="inset-0 bg-black opacity-30 min-h-full"></div>
            <div className="relative bg-transparent rounded-lg shadow-xl px-8 pt-2 pb-8 w-[95%] md:w-[91%] lg:w-[91%] mx-auto mt-0 z-10">
                <h2 className="text-5xl font-semibold text-gray-800 text-center mb-10 italic shadow-sm">Statistics Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md lg:h-[200px] h-[330px]">
                        <h3 className="font-semibold mb-2 text-center">Ages</h3>
                        <div className="h-[92%] sm:flex sm:flex-col sm:items-center sm:justify-center ">
                            <Bar data={chartData.age} options={optionsBar('People', '')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md lg:h-[200px] h-[330px]">
                        <h3 className="font-semibold mb-2 text-center">License</h3>
                        <div className="h-[92%] sm:flex sm:flex-col sm:items-center sm:justify-center">
                            <Bar data={chartData.hasLicense} options={optionsBar('People', '')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-2 shadow-md col-span-1 row-span-1 md:col-span-2 md:row-span-2 h-[330px] lg:h-[430px] flex flex-col justify-center items-center">
                        <h3 className="font-semibold mb-1 text-center">Group representation</h3>
                        <div className="py-1 ">
                            <PolarArea data={chartData.groupPercentage} options={optionsPolarArea} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md lg:h-[200px] h-[330px]">
                        <h3 className="font-semibold mb-2 text-center">First car owners (18-25 years old)</h3>
                        <div className="h-[92%] sm:flex sm:flex-col sm:items-center sm:justify-center">
                            <Bar data={chartData.isFirstCar} options={optionsBar('People', '')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md lg:h-[200px] h-[330px]">
                        <h3 className="font-semibold mb-2 text-center">Customers target</h3>
                        <div className="h-[92%] sm:flex sm:flex-col sm:items-center sm:justify-center">
                            <Bar data={chartData.tagertCustomers} options={optionsBar('People','')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md h-[330px] flex flex-col justify-start items-center">
                        <h3 className="font-semibold mb-11 text-center ">The percentage of targetables that care about fuel emissions</h3>
                        <div className="h-[64%] py-1">
                            <Pie data={chartData.fuelEmissionsConcern} options={optionsPie('%')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md h-[330px] flex flex-col justify-start items-center">
                        <h3 className="font-semibold mb-5 text-center ">The percentage of targetables that picked FWD or “I don’t know” for drivetrain</h3>
                        <div className="h-[71%] py-1">
                            <Pie data={chartData.drivetrain} options={optionsPie('%')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md  h-[330px]">
                        <h3 className="font-semibold mb-2 text-center">The average amount of cars in a family</h3>
                        <div className="h-[75%] flex flex-col items-center justify-center">
                            <Bar data={chartData.familyCars} options={optionsBar('Average', ' average')} />
                        </div>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 shadow-md  h-[330px] ">
                        <h3 className="font-semibold mb-2 text-center">The car make and model distribution</h3>
                        <div className="h-[92%] flex flex-col items-center justify-center">
                            <Bar data={chartData.carFeatures} options={optionsBar('', '')} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export {Statistics};