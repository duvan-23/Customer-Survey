import React from "react";
import { SelectOption } from "../../components/SelectOption";
import { RadioOption } from "../../components/RadioOption";
import {  useFormContext } from "../../contexts/Form/context";
import { carMakes, gender } from "../../contexts/Form/Options";
import { Modal } from "../../components/Modal";
import { Message } from "../../components/Message";
import backgroundImage from '../../assets/background.webp';
import { Nav } from "../../components/Nav";
import fromImage from '../../assets/form.webp';

const Survey: React.FC = ()=>{
    const {
        formData,
        handleChange,
        handleSubmit,
        handleBlur,
        bonusQuestion,
        openModal,
        errorPattern
      }=useFormContext();
      
    return (
        <>
            <div
                className="min-h-screen flex flex-col"
                style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="w-full fixed top-0 left-0 z-50">
                    <Nav />
                </div>

                <div className="flex flex-grow items-start justify-center pt-16 lg:pt-16  ">
                    <div className="relative w-full lg:flex lg:w-11/12 shadow-2xl ">

                        <div className="w-full lg:flex lg:w-[35%] h-auto bg-gradient-to-b from-emerald-400 to-blue-400 min-h-[80vh] rounded hidden items-center justify-center">
                            <img src={fromImage} alt="Form image" className="w-10/12 h-auto rounded-lg shadow-2xl" />
                        </div>

                        <div className="lg:w-[65%] w-full bg-gradient-to-b from-emerald-400 to-blue-400 flex items-center justify-center p-5 rounded">
                            <div className="bg-white bg-opacity-20 shadow-xl rounded-lg p-5 w-full">
                                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 italic shadow-sm">
                                    Automotive Sales Customer Survey
                                </h2>
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="mb-1 w-full">
                                        <label className="block text-base font-semibold text-gray-900">Age</label>
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="mt-1 block w-full p-2.5 border border-gray-300 
                                            rounded-md shadow-sm focus:outline-none focus:border-blue-500 
                                            bg-gray-300 transition duration-200"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="mb-1 w-full">
                                        <SelectOption 
                                            data={gender}
                                            input={{ label: "Gender", name: "gender", value: formData.gender }}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-1 w-full">
                                        <RadioOption 
                                            data={[{ label: 'YES', key: 'yes' }, { label: 'No, I prefer using other transport', key: 'no' }]}
                                            input={{ label: "Do you own a car driving license?", name: "hasLicense" }}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {(bonusQuestion.age && bonusQuestion.completed) && (
                                        <>
                                        <div className="mb-1 w-full">
                                            <RadioOption 
                                                data={[{ label: 'YES', key: 'yes' }, { label: 'NO', key: 'no' }]}
                                                input={{ label: "Is this your first car?", name: "isFirstCar" }}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        </>
                                    )}

                                    {(bonusQuestion.age && bonusQuestion.completed && bonusQuestion.completed2) && (
                                        <>
                                        <div className="mb-1 w-full">
                                            <RadioOption 
                                                data={[{ label: 'FWD', key: 'fwd' }, { label: 'RWD', key: 'rwd' }, { label: 'I don’t know', key: 'idk' }]}
                                                input={{ label: "Which drivetrain do you prefer?", name: "drivetrain" }}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-1 w-full">
                                            <RadioOption 
                                                data={[{ label: 'YES', key: 'yes' }, { label: 'NO', key: 'no' }]}
                                                input={{ label: "Are you worried about fuel emissions?", name: "fuelEmissionsConcern" }}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-1 w-full">
                                            <label className="block text-base font-semibold text-gray-900">
                                                How many cars do you have in your family?
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                name="familyCars"
                                                value={formData.familyCars}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2.5 border border-gray-300 
                                                rounded-md shadow-sm focus:outline-none focus:border-blue-500 
                                                bg-gray-300 transition duration-200"
                                                required
                                            />
                                        </div>

                                        <div className="mb-1 w-full">
                                            <SelectOption 
                                                data={carMakes}
                                                input={{ label: "Which car make and model do you drive?", name: "carMake", value: formData.carMake }}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-1 w-full">
                                            <label className="block text-base font-semibold text-gray-900">Model</label>
                                            <input
                                                type="text"
                                                name="carModel"
                                                value={formData.carModel}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2.5 border border-gray-300 
                                                rounded-md shadow-sm focus:outline-none focus:border-blue-500 
                                                bg-gray-300 transition duration-200"
                                                placeholder="Model name"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="mb-1 w-full pt-6">
                                            {errorPattern ? (
                                            <span className="text-red-500 text-base ">Error with the pattern for the Model BMW, please change it and try again.</span>
                                            ) : <span className="text-red-500 text-base " style={{ visibility: 'hidden' }}>Error with the pattern for the Model BMW, please change it and try again.</span>}

                                        </div>
                                        </>
                                    )}

                                    <div className="col-span-full w-full flex justify-center">
                                        <button
                                            type="submit"
                                            className="w-1/3 bg-[#4a8bba] text-gray-800 py-3 
                                            rounded-lg shadow-lg hover:bg-[#ad51a4] transform 
                                            hover:scale-105 transition duration-200 font-semibold italic"
                                        >
                                        Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {openModal.open && (
                <Modal>
                    <Message />
                </Modal>
                )}
            </div>
        </>
    );
}

export {Survey};