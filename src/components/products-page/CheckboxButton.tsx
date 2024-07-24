import React from 'react';

interface CheckboxInputProps {
    label: any;
    name: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, checked, onChange, onClick }) => {
    return (
        <label className="container1">{label}
            <input type="checkbox" name={name} checked={checked} onChange={onChange} onClick={onClick} />
            <span className="checkmark1"></span>
        </label>
    );
}

export default CheckboxInput;
