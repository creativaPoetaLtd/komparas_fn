import React from 'react';

interface SwitcherProps {
    selected: boolean;
    onSelect: (selected: boolean) => void;
}

const Switcher: React.FC<SwitcherProps> = ({ selected, onSelect }) => {
    return (
        <div className='switcher border-yellow-500 rounded-md border w-fit flex mx-auto justify-center'>
            <button
                className={`switcher__item rounded-l-md p-2 px-4 ${selected ? 'bg-green-400' : 'bg-white'}`}
                onClick={(e) => {
                    e.preventDefault();
                    onSelect(true);
                }}
            >
                Yego
            </button>
            <button
                className={`switcher__item rounded-r-md p-2 px-4 ${!selected ? 'bg-green-400' : 'bg-white'}`}
                onClick={(e) => {
                    e.preventDefault();
                    onSelect(false);
                }}
            >
                Oya
            </button>
        </div>
    );
};

export default Switcher;
