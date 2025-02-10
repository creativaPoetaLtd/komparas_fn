import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import './slider.css';
import { getCheapestAndExpensivePhone } from '../../api/product';

interface SliderBarProps {
    onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
}

const SliderBar: React.FC<SliderBarProps> = ({ onPriceRangeChange }) => {
    const [minPrice, setMinPrice] = useState<number>(10000);
    const [maxPrice, setMaxPrice] = useState<number>(2000000);

    const [initialMinPrice, setInitialMinPrice] = useState<number | null>(null);
    const [initialMaxPrice, setInitialMaxPrice] = useState<number | null>(null);
    
    const handleSliderChange = (values: any) => {
        const minPrice = values[0];
        const maxPrice = values[1];
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        //onPriceRangeChange(minPrice, maxPrice);
    };

    // Fetching only when the slider is released
    const handleSliderRelease = (values: any) => {
        const minPrice = values[0];
        const maxPrice = values[1];
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        onPriceRangeChange(minPrice, maxPrice);
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMinPrice(value);
        onPriceRangeChange(value, maxPrice);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
        onPriceRangeChange(minPrice, value);
    };

    const fetchPricing = async () => {
        try {
            const response = await getCheapestAndExpensivePhone();
            const { cheapestPhonePrice, expensivePhonePrice } = response.data;

            if (cheapestPhonePrice && expensivePhonePrice) {
            setMinPrice(cheapestPhonePrice);
            setMaxPrice(expensivePhonePrice);

            setInitialMinPrice(cheapestPhonePrice);
            setInitialMaxPrice(expensivePhonePrice);
            }
        } catch (error) {
            console.error("Error fetching phone prices:", error);
        }
    };

    useEffect(() => {
        fetchPricing();
    }, []);

    return (
        <div className='priceRange border-t flex flex-col mt-3'>
            <p className='text-sm mt-1 font-semibold pb-1 text-gray-600'>Igiciro</p>
            <div className='minAndMaxButtins space-x-2 w-full flex justify-between'>
                <div className='flex w-1/2 flex-col'>
                    <label htmlFor='minPrice' className='text-xs text-gray-600'>Amakeya ashoboka</label>
                    <input
                        type='number'
                        id='minPrice'
                        value={minPrice}
                        step={1000}
                        onChange={handleMinInputChange}
                        className='text-sm text-gray-600 py-2 px-2 rounded-md border border-gray-700'
                    />
                </div>
                <div className='flex w-1/2 flex-col'>
                    <label htmlFor='maxPrice' className='text-xs text-gray-600'>Amenshi ashoboka</label>
                    <input
                        type='number'
                        id='maxPrice'
                        value={maxPrice}
                        step={1000}
                        onChange={handleMaxInputChange}
                        className='text-sm text-gray-600 py-2 px-2 rounded-md border border-gray-700'
                    />
                </div>
            </div>
            {/* Only show slider if initialMinPrice and initialMaxPrice are set */}
            {initialMinPrice !== null && initialMaxPrice !== null && (
                <Slider
                    range
                    value={[minPrice, maxPrice]}
                    className='custom-slider text-yellow-600 mt-5'
                    onChange={handleSliderChange}
                    onChangeComplete={handleSliderRelease}
                    min={initialMinPrice}
                    max={initialMaxPrice}
                    step={1000}
                />
            )}
        </div>
    );
};

export default SliderBar;
