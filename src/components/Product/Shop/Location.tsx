import { CiLocationArrow1 } from 'react-icons/ci'
const Location = () => {
  return (
    <div className="flex workingHours space-x-4 md:px-8 px-1 pb-3">
    <CiLocationArrow1 className="text-[#353535] text-2xl justify-center my-auto" />
    <div className="flex flex-col">
        <p className="text-sm text-[#fe4141]">Location</p>
        <h1 className="text-sm mt-3 text-[#353535] font-bold">Kigali, Rwanda</h1>
        <p className="text-sm text-[#353535]">Nyarugenge, Nyamirambo</p>
        <p className="text-sm text-[#353535]">KG12, 123T</p>
    </div>
    </div>
  )
}

export default Location