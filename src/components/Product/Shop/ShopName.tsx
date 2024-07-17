import { CiWarning } from "react-icons/ci"

const ShopName = () => {
    return (
        <><div className="flex w-full justify-between md:px-4 px-1">
            <div className="flex flex-col text-sm">
                <h1 className="shopname text-sm text-yellow-500">Isaro shop</h1>
                <p className="shopOwner text-sm text-[#353535]">Ineza Gasaro Sheja</p>
            </div>
            <div className="logo bg-slate-400 flex justify-center items-center  my-auto">
                <img src="/cc.png" alt="logo" className="w-fit h-10" />
            </div>
        </div><div className="flex space-x-8 mt-12 md:px-8 px-1">
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                    <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                    <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                    <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] h-12 w-12 rounded-full bg-yellow-600 mx-auto justify-center"></div>
                    <p className="text-sm text-[#353535]">Ineza Gasaro</p>
                </div>
            </div>
            <div className="flex flex-col mt-4 md:px-8 px-1">
                <div className="flex w-full space-x-4">
                    <CiWarning className="text-[#353535] text-2xl justify-center" />
                    <p className="text-sm text-[#353535] justify-center my-auto flex">Izindi Terefone dufite</p>
                </div>
                <div className="flex w-full space-x-4">
                    <CiWarning className="text-[#353535] text-2xl justify-center" />
                    <p className="text-sm text-[#353535] justify-center my-auto flex">Izindi Terefone dufite</p>
                </div>
            </div>
        </>
    )
}

export default ShopName