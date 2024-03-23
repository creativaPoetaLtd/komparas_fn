import { useState } from 'react';
import RadioInput from './RadioButton';
import { Slider } from 'antd';

interface SliderBarProps {
    productsData: any;
}

const SliderBar = ({ productsData }: SliderBarProps) => {


    const product = productsData?.map((product: any) => {
        return {
            id: product._id,
            price: product.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price,
        };
    }
    );

    console.log("producdddddddddddddddddddddddtsData", product);

 
    
    const [selectedPriceRange, setSelectedPriceRange] = useState<any>('All price');
    const handleSliderChange = (values: any) => {
        updateSelectedPriceRange(values);
    };
    const updateSelectedPriceRange = (values: any) => {
        const min: any = values[0];
        const max: any = values[1];
        let selectedRange: any = '';
        if (min === 20 && max === 50) {
            selectedRange = 'All price';
        } else if (max < 25) {
            selectedRange = 'Under $25';
        } else if (max >= 25 && max <= 50) {
            selectedRange = '$25 to $50';
        } else if (max > 50 && max <= 100) {
            selectedRange = '$50 to $100';
        } else if (max > 100 && max <= 200) {
            selectedRange = '$100 to $200';
        } else if (max > 200) {
            selectedRange = '$200 & Above';
        }

        setSelectedPriceRange(selectedRange);
    };

    return (
        <div className='priceRange flex flex-col mt-3'>
            <p className='text-sm font-semibold text-gray-600'>Price Range</p>
            <Slider
                style={{ color: '#EDB62E' }}
                range
                defaultValue={[0, 300]}
                className='text-yellow-600 mt-5'
                onChange={handleSliderChange}
                max={300}
            />
            <div className='minAndMaxButtins flex justify-between'>
                <button className='text-sm text-gray-600 py-2 px-4 rounded-md border border-gray-700'>Min Price</button>
                <button className='text-sm text-gray-600 py-2 px-4 rounded-md border border-gray-700'>Max Price</button>
            </div>
            <div className='flex flex-col mt-3'>
                <RadioInput label='All price' name='price' checked={selectedPriceRange === 'All price'} onChange={() => { }} />
                <RadioInput label='Under $25' name='price' checked={selectedPriceRange === 'Under $25'} onChange={() => { }} />
                <RadioInput label='$25 to $50' name='price' checked={selectedPriceRange === '$25 to $50'} onChange={() => { }} />
                <RadioInput label='$50 to $100' name='price' checked={selectedPriceRange === '$50 to $100'} onChange={() => { }} />
                <RadioInput label='$100 to $200' name='price' checked={selectedPriceRange === '$100 to $200'} onChange={() => { }} />
                <RadioInput label='$200 & Above' name='price' checked={selectedPriceRange === '$200 & Above'} onChange={() => { }} />
            </div>
        </div>
    );
};

export default SliderBar;
