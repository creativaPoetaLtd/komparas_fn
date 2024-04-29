import { useEffect, useState } from "react"
import { getShopById } from "../../../../api/getAllShops"
import { updateShop } from "../../../../api/getAllShops"
import { toast } from "react-toastify"

interface EditShopFormProps {
    setIsEditShop: (isShopFormOpen: boolean) => void
    selectedShopId?: string
}
const EditShopForm = (
    { setIsEditShop,  }: EditShopFormProps
) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        working_hours: "",
        description: "",
    })
    const [shopData, setShopData] = useState<any>()
    const editID: any = localStorage.getItem("editID")
    const handleShopFormClose = () => {
        setIsEditShop(false)
    }

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const fetchShop = async () => {
            const { data } = await getShopById(editID);
            setShopData(data);
        };
        fetchShop();
    }, [editID]);

    useEffect(() => {
        setFormData({
            name: shopData?.name,
            email: shopData?.email,
            phone: shopData?.phone,
            location: shopData?.location,
            working_hours: shopData?.working_hours,
            description: shopData?.description,
        })
    }, [shopData])

    const handleEditShop = async (e: any) => {
        e.preventDefault()
        setLoading(false)
        const res = await updateShop(formData, editID)
        if (res?.status === 200) {
            toast.success("Shop Updated Successfully")
            setIsEditShop(false)

        }
        else{
            toast.error("Shop Not Updated")
        }
    }

    return (
        <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
            <div className="w-[60%] h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center px-4 py-2">
                    <h1 className="text-slate-900 text-lg font-bold pl-48">Register Shop</h1>
                    <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600  flex justify-center items-center" onClick={handleShopFormClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-slate-900 hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form className="w-full flex flex-col justify-center items-center px-52 bg-gray-300" onSubmit={handleEditShop}>
                        <div className="w-full flex flex-col justify-start items-start bg-white px-10 py-5 rounded-md">
                            <div className="w-full flex flex-col justify-start items-start">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-start items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Working Hours
                                </label>
                                <input
                                    type="text"
                                    name="working_hours"
                                    value={formData.working_hours}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-start items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Description
                                </label>
                                <textarea
                                    className="w-full h-16 rounded-md border outline-blue-700 border-slate-900 p-2"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full flex justify-start items-start mt-4">
                                <button
                                    disabled={loading || formData.name === "" || formData.email === "" || formData.phone === "" || formData.location === "" || formData.working_hours === "" || formData.description === ""}
                                    type="submit" className={`w-full h-10 rounded-md bg-blue-700 text-white ${loading || formData.email === "" || formData.phone === "" || formData.location === "" || formData.working_hours === "" || formData.description === "" ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                                >
                                    Update Shop
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditShopForm