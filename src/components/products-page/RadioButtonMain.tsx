import React from 'react';

interface RadioInputProps {
    label: string;
    name: string;
}

const RadioInputMain: React.FC<RadioInputProps> = ({ label, name }) => {
    return (

        <label className="container">{label}
            <input type="radio" name={name} />
            <span className="checkmark"></span>
        </label>
    );
}

export default RadioInputMain;