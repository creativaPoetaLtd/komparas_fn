import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    onClick?: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, onClick }) => {
    return (
        <label className="container1">{label}
            <input type="checkbox" name={name} onClick={onClick} />
            <span className="checkmark1"></span>
        </label>
    );
}

export default CheckboxInput;
