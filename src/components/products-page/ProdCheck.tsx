import React from 'react';

interface Props {
    label: string;
    name: string;
    productData: any;
    addProductToCompare: (productData: any) => void;
    checked: boolean;
    onUncheck: (productData: any) => void;
}   


const PorductCheckInput: React.FC<Props> = ({ label, name, productData, addProductToCompare, checked, onUncheck }) => {
    const handleCheckboxChange = (event: { target: { checked: any; }; }) => {
        if (event.target.checked) {
            addProductToCompare(productData);
        }
    };

    const handleUncheck = () => {
        onUncheck(productData);
    }


    return (
        <div className='flex items-center'>
            <input
                type='checkbox'
                id={name}
                name={name}
                onChange={handleCheckboxChange}
                onClick={handleUncheck}
                checked={checked}
                className='mr-2'
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default PorductCheckInput;
