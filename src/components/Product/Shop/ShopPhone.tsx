import { CgPhone } from "react-icons/cg"

const ShopPhone = ({shopData}:any) => {
    return (
        <div className="flex workingHours space-x-4 md:px-8 px-1">
            <CgPhone className="text-[#353535] text-2xl justify-center my-auto" />
            <div className="flex flex-col">
                <p className="text-sm text-[#fe4141]">
                    {shopData?.phone}
                </p>
            </div>
        </div>
    )
}

export default ShopPhone