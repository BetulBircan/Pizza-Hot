import { useState } from 'react';
export default function useInput(initialValue, validationFunct) {
    const [value, setValue] = useState(initialValue);
    const [isEdited, setIsEdited] = useState(false);

    const isValid = validationFunct(value);

    const handleInputBlur = () => {
        setIsEdited(true);
    };

    const handleInputChange = (e) => {

        setValue(e.target.value);
        setIsEdited(false);

    }

    return {
         value, 
         isEdited, 
         handleInputBlur, 
         handleInputChange, 
         hasError: isEdited && !isValid };
}