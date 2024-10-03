import { IData } from "./interfaces/form";


const validateSecondPattern = (
    name: string,
    value: string,
    setFormData: (value: React.SetStateAction<IData>) => void
) => {
    const valueLength = value.length;

    if (valueLength === 1) {
        if (isFirstCharValid(value)) {
        updateFormData(name, value, setFormData);
        }
    } else if (valueLength > 1) {
        const firstChar = value.charAt(0);
        const rest = value.slice(1);
        const lastChar = value.slice(-1);

        const minLength = /^\d+$/.test(firstChar) ? 3 : 4;

        if (valueLength < minLength) {
            if (isFirstCharValid(firstChar) && areRemainingCharsDigits(rest)) {
                updateFormData(name, value, setFormData);
            }
        } else if (
            isFirstCharValid(firstChar) &&
            areRemainingCharsDigits(rest.slice(0, -1)) &&
            isLastCharValid(lastChar)
        ) {
            updateFormData(name, value, setFormData);
        }
    }
};

const validateFirstPattern = (
    name: string,
    value: string,
    setFormData: (value: React.SetStateAction<IData>) => void
) => {
    const valueLength = value.length;
  
    if (valueLength < 3) {
      if (valueLength === 1) {
        if (isSingleCharacterValid(value)) {
          updateFormData(name, value, setFormData);
        }
      } else if (valueLength === 2) {
        const firstChar = value.charAt(0);
        const secondChar = value.charAt(1);
        if (isTwoCharacterValid(firstChar, secondChar)) {
          updateFormData(name, value, setFormData);
        }
      }
    }
};

const isFirstCharValid = (char: string): boolean => {
    return /^[mM0-9]/.test(char);
};
  
const areRemainingCharsDigits = (chars: string): boolean => {
    return /^\d+$/.test(chars);
};
  
const isLastCharValid = (char: string): boolean => {
    return /^[dDIi0-9]$/.test(char);
};
  
const updateFormData = (name: string,value: string,
    setFormData: (value: React.SetStateAction<IData>) => void
) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};


const isSingleCharacterValid = (char: string): boolean => {
    return /^[XxZz]$/.test(char) || char === '';
};
  
const isTwoCharacterValid = (firstChar: string, secondChar: string): boolean => {
    return /^[XxZz]$/.test(firstChar) && /^\d+$/.test(secondChar);
};

export{ validateFirstPattern, validateSecondPattern }