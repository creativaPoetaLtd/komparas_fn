import { useEffect, useState } from "react";
import { getShopById, updateShop } from "../../../../api/getAllShops";
import { toast } from "react-toastify";

interface EditShopFormProps {
    setIsEditShop: (isShopFormOpen: boolean) => void;
    selectedShopId?: string;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditShopForm = ({ setIsEditShop }: EditShopFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        owner : "",
        email: "",
        phone: "",
        location: "",
        location_description: "",
        working_hours: daysOfWeek.map(day => ({ day, time_range: "" })), // Initialize with empty time_range
        description: "",
        image: null as File | null | any,
    });
    const [shopData, setShopData] = useState<any>();
    const editID: any = localStorage.getItem("editID");

    const handleShopFormClose = () => {
        setIsEditShop(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("working_hours")) {
            const [_, index] = name.split(".");
            const updatedWorkingHours = [...formData.working_hours];
            updatedWorkingHours[Number(index)].time_range = value;
            setFormData({ ...formData, working_hours: updatedWorkingHours });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    useEffect(() => {
        const fetchShop = async () => {
            const { data } = await getShopById(editID);
            setShopData(data);
        };
        fetchShop();
    }, [editID]);

    useEffect(() => {
        if (shopData) {
            setFormData({
                name: shopData.name,
                owner: shopData.owner,
                email: shopData.email,
                phone: shopData.phone,
                location: shopData.location,
                location_description: shopData.location_description,
                working_hours: daysOfWeek.map(day => {
                    const dayData = shopData.working_hours.find((wh: any) => wh.day === day);
                    return { day, time_range: dayData ? dayData.time_range : "" };
                }), // Map through daysOfWeek to ensure all days are represented
                description: shopData.description,
                image: null,
            });
        }
    }, [shopData]);

    const handleEditShop = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const updatedFormData = new FormData();
        updatedFormData.append("name", formData.name);
        updatedFormData.append("owner", formData.owner);
        updatedFormData.append("email", formData.email);
        updatedFormData.append("phone", formData.phone);
        updatedFormData.append("location", formData.location);
        updatedFormData.append("location_description", formData.location_description);
        updatedFormData.append("description", formData.description);

        formData.working_hours.forEach((wh, index) => {
            updatedFormData.append(`working_hours[${index}][day]`, wh.day);
            updatedFormData.append(`working_hours[${index}][time_range]`, wh.time_range);
        });

        if (formData.image) {
            updatedFormData.append("image", formData.image);
        }

        try {
            const res = await updateShop(updatedFormData, editID);
            if (res.status === 200) {
                toast.success("Shop Updated Successfully");
                setIsEditShop(false);
            } else {
                toast.error("Shop Not Updated");
            }
        } catch (error) {
            toast.error("An error occurred while updating the shop");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center">
            <div className="w-[60%] h-fit bg-gray-300 pb-10 my-12 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center px-4 py-2">
                    <h1 className="text-slate-900 text-lg font-bold pl-48">Edit Shop</h1>
                    <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600 flex justify-center items-center" onClick={handleShopFormClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-900 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form className="w-full flex flex-col justify-center items-center md:px-52 px-2 bg-gray-300" onSubmit={handleEditShop}>
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
                                    Owner
                                </label>
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
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
                                    Location Description
                                </label>
                                <input
                                    type="text"
                                    name="location_description"
                                    value={formData.location_description}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Working Hours
                                </label>
                                {formData.working_hours.map((day, index) => (
                                    <div key={index} className="w-full flex justify-between items-center mt-2">
                                        <span>{day.day}</span>
                                        <input
                                            type="text"
                                            name={`working_hours.${index}`}
                                            value={day.time_range}
                                            onChange={handleInputChange}
                                            className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2 ml-2"
                                            placeholder="e.g., 9:00 AM - 5:00 PM"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full h-20 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center mt-10 px-10">
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-md text-white font-semibold ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <button
                                type="button"
                                onClick={handleShopFormClose}
                                className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditShopForm;
