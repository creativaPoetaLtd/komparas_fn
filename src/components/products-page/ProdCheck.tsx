import React from 'react';

interface Props {
    label: string;
    name: string;
    productData: any;
    addProductToCompare: (productData: any) => void;
    checked: boolean;
}   


const PorductCheckInput: React.FC<Props> = ({ label, name, productData, addProductToCompare, checked }) => {
    const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
        if (event.target.checked) {
            addProductToCompare(productData);
        }
    };

    return (
        <div className='flex items-center'>
            <input
                type='checkbox'
                id={name}
                name={name}
                onChange={handleCheckboxChange}
                checked={checked}
                className='mr-2'
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default PorductCheckInput;
