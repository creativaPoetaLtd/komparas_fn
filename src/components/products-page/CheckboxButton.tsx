import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name }) => {
    return (
        <label className="container1">{label}
            <input type="checkbox" name={name} />
            <span className="checkmark1"></span>
        </label>
    );
}

export default CheckboxInput;
