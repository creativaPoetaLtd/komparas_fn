import { CiShare2, CiWarning } from "react-icons/ci"
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const ShopName = (
    { shopData }: any
) => {
    return (
        <><div className="flex w-full space-x-12 md:px-4 px-1">
            <div className="flex flex-col text-sm">
                <h1 className="shopname text-sm text-yellow-500">
                    {shopData?.name}
                </h1>
                <p className="shopOwner text-sm text-[#353535]">
                    {shopData?.owner}
                </p>
            </div>
            <div className="logo bg-slate-400 flex justify-center items-center  my-auto">
                <img src={
                    shopData?.image
                } alt="logo" className="w-fit h-10" />
            </div>
        </div>
            <div className="flex md:space-x-6 space-x-2  mt-12 md:px-8 px-1">
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <a href={
                            shopData?.phone
                        } className="flex justify-center m-auto">
                            <IoCallOutline className="text-white text-2xl" />
                        </a>
                    </div>
                    <p className="text-sm text-[#353535]">Duhamagare</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <a href=
                            {
                                shopData?.email
                            }
                            className="flex justify-center m-auto">
                            <MdOutlineEmail className="text-white text-2xl" />
                        </a>
                    </div>
                    <p className="text-sm text-[#353535]">Twandikire</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <a href=
                            {
                                shopData?.phone
                            }
                            className="flex justify-center items-center m-auto">
                            <img src="/dd.png" alt="whatsapp" className="w-full h-full rounded-full self-center m-auto" />
                        </a>
                    </div>
                    <p className="text-sm text-[#353535]">Komparas Code</p>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-[#353535] items-center flex m-auto h-10 w-10 rounded-full bg-yellow-600 mx-auto justify-center">
                        <a href=
                        {
                            `https://wa.me/?text=${window.location.href}`
                        }
                           
                            className="flex justify-center m-auto">
                            <CiShare2 className="text-white text-2xl" />
                        </a>
                    </div>
                    <p className="text-sm text-[#353535]">Sangiza Abandi</p>
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