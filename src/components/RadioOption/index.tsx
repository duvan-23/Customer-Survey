import React, { ChangeEventHandler } from "react";

interface TodoProviderProps {
    data: {label:string, key:string}[];
    input:{label:string,name:string};
    onChange: ChangeEventHandler<HTMLInputElement>;
}
const RadioOption:React.FC<TodoProviderProps> = (props)=> {
    return(
        <div>
      <label className="block text-base font-semibold text-gray-900">{props.input.label}</label>
      <div className="flex space-x-4 mt-2">
        {props.data.map((item) => (
          <label key={item.key} className="flex items-center space-x-2">
            <input
              type="radio"
              name={props.input.name}
              value={item.key}
              onChange={props.onChange}
              required
              className="h-4 w-4 text-blue-600 border-gray-900 focus:ring-blue-500"
            />
            <span className="text-black font-normal">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
    );
}

export {RadioOption};