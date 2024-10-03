import React, { ChangeEventHandler } from "react";

interface TodoProviderProps {
    data: {label:string, key:string}[];
    input:{label:string,name:string};
    onChange: ChangeEventHandler<HTMLInputElement>;
}
const RadioOption:React.FC<TodoProviderProps> = (props)=> {
    return(
        <div>
            <label className="block text-sm font-medium text-gray-700">{props.input.label}</label>
            <div className="flex space-x-4">
                {props.data.map((item) => (
                    <label key={item.key}>
                        <input
                        type="radio"
                        name={props.input.name}
                        value={item.key}
                        onChange={props.onChange}
                        required
                        />
                        {item.label}
                    </label>
                    ))}
            </div>
        </div>
    );
}

export {RadioOption};