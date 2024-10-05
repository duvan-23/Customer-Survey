import React, { ChangeEventHandler } from "react";
interface TodoProviderProps {
    data: {label:string, key:string}[];
    input:{label:string,name:string,value:string}
    onChange: ChangeEventHandler<HTMLSelectElement>;
}
const SelectOption:React.FC<TodoProviderProps> = (props)=> {
    return(
        <div className="relative">
            <label className="block text-base font-medium text-gray-900">{props.input.label}</label>
            <select
                name={props.input.name}
                value={props.input.value}
                onChange={props.onChange}
                className="mt-1 block w-full p-3 border-gray-300  rounded-md shadow-sm focus:outline-none focus:border-blue-500 bg-gray-300 transition duration-200"
                required
            >
                <option value="">Select an option</option>
                {props.data.map((item) => (
                    <option key={item.key} value={item.key}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>

    );
}

export {SelectOption};