import React, { ChangeEventHandler } from "react";

interface TodoProviderProps {
    data: {label:string, key:string}[];
    input:{label:string,name:string,value:string}
    onChange: ChangeEventHandler<HTMLSelectElement>;
}
const SelectOption:React.FC<TodoProviderProps> = (props)=> {
    return(
        <div>
            <label className="block text-sm font-medium text-gray-700">{props.input.label}</label>
            <select
                name={props.input.name}
                value={props.input.value}
                onChange={props.onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
                >
                <option value="">Select...</option>
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