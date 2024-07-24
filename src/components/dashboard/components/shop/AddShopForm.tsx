import { useState } from "react";
import { addShop } from "../../../../api/getAllShops";

interface AddShopFormProps {
    setIsAddShop: (isShopFormOpen: boolean) => void;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddShopForm = ({ setIsAddShop }: AddShopFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        email: "",
        phone: "",
        location: "",
        working_hours: daysOfWeek.map(day => ({ day, time_range: "" })),
        description: "",
        location_discription: "",
        image: null as File | null | any,
    });

    const handleShopFormClose = () => {
        setIsAddShop(false);
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

    const handleAddShop = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("owner", formData.owner);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("location_discription", formData.location_discription);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("image", formData.image);
        formData.working_hours.forEach((wh, index) => {
            formDataToSend.append(`working_hours[${index}][day]`, wh.day);
            formDataToSend.append(`working_hours[${index}][time_range]`, wh.time_range);
        });

        await addShop(formDataToSend);
        setLoading(false);
        setIsAddShop(false);
    };

    return (
        <div className="w-full h-full bg-black bg-opacity-50  top-0 left-0 flex justify-center items-center">
            <div className="w-full px-12 my-12 h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center px-4 py-2">
                    <h1 className="text-slate-900 text-lg font-bold pl-48">Register Shop</h1>
                    <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600 flex justify-center items-center" onClick={handleShopFormClose}>
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
                    <form className="w-full flex flex-col justify-center items-center md:px-52 px-2 bg-gray-300" onSubmit={handleAddShop}>
                        <div className="w-full flex flex-col justify-start items-start bg-white px-10 py-5 rounded-md">
                            <div className="w-full flex flex-col justify-start items-start">
                                <label className="w-full flex justify-start items-start text-slate-900">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-start items-start">
                                <label className="w-full flex justify-start items-start text-slate-900">Name</label>
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-start items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Location Description</label>
                                <input
                                    type="text"
                                    name="location_discription"
                                    value={formData.location_discription}
                                    onChange={handleInputChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Working Hours</label>
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
                            <div className="w-full flex flex-col justify-start items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Description</label>
                                <textarea
                                    className="w-full h-16 rounded-md border outline-blue-700 border-slate-900 p-2"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full flex justify-start flex-col items-start mt-4">
                                <label className="w-full flex justify-start items-start text-slate-900">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                                />
                            </div>
                            <div className="w-full flex justify-start items-start mt-4">
                                <button
                                    disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.location || !formData.description}
                                    type="submit"
                                    className={`w-full h-10 rounded-md bg-blue-700 text-white ${loading || !formData.email || !formData.phone || !formData.location || !formData.description ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                                >
                                    Add Shop
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddShopForm;
