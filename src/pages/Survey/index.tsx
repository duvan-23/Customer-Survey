import React from "react";
import { SelectOption } from "../../components/SelectOption";
import { RadioOption } from "../../components/RadioOption";
import {  useFormContext } from "../../contexts/Form/context";
import { carMakes, gender } from "../../contexts/Form/Options";
import { Modal } from "../../components/Modal";
import { Message } from "../../components/Message";

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
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    autoComplete="off"
                />
            </div>

            <SelectOption 
                data={gender}
                input={{label:"Gender", name:"gender",value:formData.gender }}
                onChange={handleChange}
            />

            <RadioOption 
                data={[{label:'YES',key:'yes'},{label:'No, I prefer using other transport',key:'no'}]}
                input={{label:"Do you own a car driving license?",name:"hasLicense"}}
                onChange={handleChange}
            />
            {(bonusQuestion.age&& bonusQuestion.completed) &&(
            <>
                <RadioOption 
                    data={[{label:'YES',key:'yes'},{label:'NO',key:'no'}]}
                    input={{label:"Is this your first car?",name:"isFirstCar"}}
                    onChange={handleChange}
                />
            </>
            )}
            {(bonusQuestion.age && bonusQuestion.completed && bonusQuestion.completed2) &&(
            <>
                <RadioOption 
                    data={[{label:'FWD',key:'fwd'},{label:'RWD',key:'rwd'},{label:'I don’t know',key:'unknown'}]}
                    input={{label:"Which drivetrain do you prefer?",name:"drivetrain"}}
                    onChange={handleChange}
                />

                <RadioOption 
                    data={[{label:'YES',key:'yes'},{label:'NO',key:'no'}]}
                    input={{label:"Are you worried about fuel emissions?",name:"fuelEmissionsConcern"}}
                    onChange={handleChange}
                />

            
                <div>
                    <label className="block text-sm font-medium text-gray-700">How many cars do you have in your family?</label>
                    <input
                        type="number"
                        min={1}
                        name="familyCars"
                        value={formData.familyCars}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
            
                <SelectOption 
                    data={carMakes}
                    input={{label:"Which car make and model do you drive?",name:"carMake",value:formData.carMake}}
                    onChange={handleChange}
                />
                <div>
                    <input
                        type="text"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Model name"
                        autoComplete="off"
                        required
                    />
                    {errorPattern && (
                        <span className="text-red-500 text-sm mt-1">Error with the pattern for the Model name</span>
                    )}
                </div>
            </>
            )}
        
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition"
            >
                Submit
            </button>
        </form>
        {openModal.open &&(
            <Modal>
              <Message />
            </Modal>
          )}
        </>
      );
}

export {Survey};