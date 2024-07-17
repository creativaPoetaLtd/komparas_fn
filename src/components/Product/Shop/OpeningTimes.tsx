import { TbTimeDuration0 } from 'react-icons/tb'

const OpeningTimes = () => {
    return (
        <div className="flex workingHours space-x-4 md:px-8 px-1">
            <TbTimeDuration0 className="text-[#353535] text-2xl justify-center my-auto" />
            <div className="flex flex-col">
                <p className="text-sm text-[#fe4141]">Hafunguye</p>
                <h1 className="text-sm mt-3 text-[#353535] font-bold">Amasaha y'akazi</h1>
                <p className="text-sm text-[#353535]">Kuwa mbere 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa kabiri 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa gatatu 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa kane 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa gatanu 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa gatandatu 08:00 - 18:00</p>
                <p className="text-sm text-[#353535]">Kuwa cyenda 08:00 - 18:00</p>
            </div>
        </div>
    )
}

export default OpeningTimes