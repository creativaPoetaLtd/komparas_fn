import { TbTimeDuration0 } from 'react-icons/tb'

const OpeningTimes = ({shopData}:any) => {
    return (
        <div className="flex workingHours space-x-4 md:px-8 px-1">
            <TbTimeDuration0 className="text-[#353535] text-2xl justify-center my-auto" />
            <div className="flex flex-col">
                <p className="text-sm text-[#fe4141]">Hafunguye</p>
                <h1 className="text-sm mt-3 text-[#353535] font-bold">Amasaha y'akazi</h1>
                <p className="text-sm text-[#353535]">Kuwa mbere: {shopData?.working_hours?.find((day:any) => day?.day === 'Monday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kuwa kabiri: {shopData?.working_hours?.find((day:any) => day?.day === 'Tuesday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kuwa gatatu: {shopData?.working_hours?.find((day:any) => day?.day === 'Wednesday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kuwa kane: {shopData?.working_hours?.find((day:any) => day?.day === 'Thursday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kuwa gatanu: {shopData?.working_hours?.find((day:any) => day?.day === 'Friday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kuwa gatandatu: {shopData?.working_hours?.find((day:any) => day?.day === 'Saturday')?.time_range || 'off'}</p>
                <p className="text-sm text-[#353535]">Kucyumweru: {shopData?.working_hours?.find((day:any) => day?.day === 'Sunday')?.time_range || 'off'}</p>
            </div>
        </div>
    )
}

export default OpeningTimes