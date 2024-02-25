import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const HomeNav = () => {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const handleMenuClick = (menu: React.SetStateAction<string>) => {
      setSelectedMenu(menu);
    };
  
  return (
    <nav className='w-full lg:flex hidden justify-between px-20 pb-3 pt-7 border-black border-b bg-white'>
        <div className='logo flex my-auto justify-center'>
          <h1 className='text-xl text-[#0C203B] font-semibold'>Komparas</h1>
        </div>
        <ul className='flex space-x-8 my-auto justify-center'>
          <li className={`text-black ${selectedMenu === 'home' ? 'underline underline-offset-4' : ''}`} onClick={() => handleMenuClick('home')}>
            <a href='/#'>Home</a>
          </li>
          <li className={`text-black ${selectedMenu === 'about' ? 'underline underline-offset-4' : ''}`} onClick={() => handleMenuClick('about')}>
            <a href='/about_us'>About</a>
          </li>
          <li className={`text-black ${selectedMenu === 'contact' ? 'underline underline-offset-4' : ''}`} onClick={() => handleMenuClick('contact')}>
            <a href='/contact_us'>Contact</a>
          </li>
          <li className={`text-black ${selectedMenu === 'signup' ? 'underline underline-offset-4' : ''}`} onClick={() => handleMenuClick('signup')}>
            <a href='/login'>Signup</a>
          </li>
        </ul> 
        <div className='searchBar bg-[#F5F5F5] rounded-md pr-3'>
          <input type='text' placeholder='Search' className='p-2 outline-none rounded-md bg-[#F5F5F5]' />
          <button>
            <FaSearch />
          </button>
        </div>
      </nav>
  )
}

export default HomeNav