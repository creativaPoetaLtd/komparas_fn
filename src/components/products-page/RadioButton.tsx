import React from 'react';

interface RadioInputProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: any;
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, checked, onChange }) => {
    return (
        <label className="container">{label}
            <input type="radio" name={name} checked={checked} onChange={onChange} />
            <span className="checkmark"></span>
        </label>
    );
}

export default RadioInput;
