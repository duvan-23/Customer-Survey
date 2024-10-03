import React from "react";

function useLocalStorage( itemName:string, initialValue:any, reset:boolean ){
    const [item, setItem] = React.useState(initialValue);
    React.useEffect(()=>{
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        if(reset){
          saveItem(initialValue);
        }else if(!localStorageItem){
          parsedItem = initialValue;
          localStorage.setItem(itemName,JSON.stringify(initialValue));
        }else{
            parsedItem = JSON.parse(localStorageItem);
            setItem(parsedItem);
        }

      },[]);
  
    const saveItem = (newItem:any) =>{
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setItem(newItem);
    };
  
    return {
      item, 
      saveItem, 
    };
}

export { useLocalStorage };