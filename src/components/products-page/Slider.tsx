import React, { useState } from 'react';
import { Slider } from 'antd';
// import RadioInput from './RadioButton';

interface SliderBarProps {
    onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
}

const SliderBar: React.FC<SliderBarProps> = ({ onPriceRangeChange }) => {
    const [, setSelectedPriceRange] = useState<any>('All price');
    const [minPrice, setMinPrice] = useState<number>(10);
    const [maxPrice, setMaxPrice] = useState<number>(2000000);

    const handleSliderChange = (values: any) => {
        const minPrice: number = values[0];
        const maxPrice: number = values[1];
        updateSelectedPriceRange(minPrice, maxPrice);
        onPriceRangeChange(minPrice, maxPrice);
    };
    const updateSelectedPriceRange = (min: number, max: number) => {
        let selectedRange: any = '';
        if (min === 10 && max === 2000000) {
            selectedRange = 'All price';
            setMinPrice(10);
            setMaxPrice(2000000);
        } else if (max < 25000) {
            selectedRange = 'Under Rwf25000';
            setMinPrice(10);
            setMaxPrice(25000);
        } else if (max >= 25000 && max <= 500000) {
            selectedRange = 'Rwf25000 to Rwf500000';
            setMinPrice(25000);
            setMaxPrice(500000);
        } else if (max > 500000 && max <= 700000) {
            selectedRange = 'Rwf500000 to Rwf700000';
            setMinPrice(500000);
            setMaxPrice(700000);
        } else if (max > 700000 && max <= 1000000) {
            selectedRange = 'Rwf700000 to Rwf1000000';
            setMinPrice(700000);
            setMaxPrice(1000000);
        } else if (max > 1000000 && max <= 1500000) {
            selectedRange = 'Rwf700000 to Rwf1000000';
            setMinPrice(1000000);
            setMaxPrice(1500000);
        } else if (max > 1500000) {
            selectedRange = '$1500000 & Above';
            setMinPrice(1000000);
            setMaxPrice(1500000);
        }
        setSelectedPriceRange(selectedRange);
    };

    return (
        <div className='priceRange flex flex-col mt-3'>
            <p className='text-sm font-semibold text-gray-600'>Price Range</p>
            <Slider
                style={{ color: '#EDB62E' }}
                range
                defaultValue={[10, 2000000]}
                className='text-yellow-600 mt-5'
                onChange={handleSliderChange}
                max={2000000}
            />
            <div className='minAndMaxButtins flex justify-between'>
                <button className='text-sm text-gray-600 py-2 px-4 rounded-md border border-gray-700'>
                    {minPrice}
                </button>
                <button className='text-sm text-gray-600 py-2 px-4 rounded-md border border-gray-700'>
                    {maxPrice}
                </button>
            </div>
            {/* <div className='flex flex-col mt-3'>
                <RadioInput label='All price' name='price' checked={selectedPriceRange === 'All price'} onChange={() => { }} />
                <RadioInput label='Under $25' name='price' checked={selectedPriceRange === 'Under $25'} onChange={() => { }} />
                <RadioInput label='$25 to $50' name='price' checked={selectedPriceRange === '$25 to $50'} onChange={() => { }} />
                <RadioInput label='$50 to $100' name='price' checked={selectedPriceRange === '$50 to $100'} onChange={() => { }} />
                <RadioInput label='$100 to $200' name='price' checked={selectedPriceRange === '$100 to $200'} onChange={() => { }} />
                <RadioInput label='$200 & Above' name='price' checked={selectedPriceRange === '$200 & Above'} onChange={() => { }} />
            </div> */}
        </div>
    );
};

export default SliderBar;
