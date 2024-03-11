import React from 'react';

interface RadioInputProps {
    label: string;
    name: string;
    onClick: () => void;
}

const RadioInputMain: React.FC<RadioInputProps> = ({ label, name, onClick }) => {
    return (
        <label className="container" onClick={onClick}>
            {label}
            <input type="radio" name={name} />
            <span className="checkmark"></span>
        </label>
    );
}

export default RadioInputMain;
