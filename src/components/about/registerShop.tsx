import { useState } from "react";
import { addShop } from "../../api/getAllShops";
import SubNav from "../Navigations/SubNav";
import HomeNav from "../home/HomeNav";
import MobileHomeNav from "../home/HomeMobileNav";
import Footer from "../Footer";
import { toast } from "react-toastify";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


const RegisterShop = () => {
  let response:any;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    location: "",
    working_hours: daysOfWeek.map((day) => ({ day, time_range: "" })),
    description: "",
    location_discription: "",
    image: null as File | null | any,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleAddShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("owner", formData.owner);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("location", formData.location);
    formDataToSend.append(
      "location_discription",
      formData.location_discription
    );
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formData.working_hours.forEach((wh, index) => {
      formDataToSend.append(`working_hours[${index}][day]`, wh.day);
      formDataToSend.append(
        `working_hours[${index}][time_range]`,
        wh.time_range
      );
    });

    try {
      response = await addShop(formDataToSend);
        toast.success(response.data.message || "Shop added successfully.");
        setFormData({
          name: "",
          owner: "",
          email: "",
          phone: "",
          location: "",
          working_hours: daysOfWeek.map((day) => ({ day, time_range: "" })),
          description: "",
          location_discription: "",
          image: null,
        });
          
    } catch (error) {
      toast.error(response.data.message || "Failed to add shop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full top-0 left-0 justify-center items-center">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />
      <div className="w-full lg:w-3/5 my-12 h-fit rounded-lg shadow-lg pb-10 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <h1 className="text-slate-900 text-lg font-bold pl-4 lg:pl-48">
            Andikisha iduka yawe maze igaragare kuri kompras
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <form
            className="w-full flex flex-col justify-center items-center px-2"
            onSubmit={handleAddShop}>
            {/* Step 1: Shop Details */}
            {step === 1 && (
              <div className="w-full flex flex-col justify-start items-start bg-white px-6 lg:px-10 py-5 rounded-md">
                <h2 className="text-lg font-bold mb-4">
                  Amakuru ajyanye n'iduka ryawe
                </h2>
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Izina ry'iduka
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Amazina ya nyir'iduka
                </label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Email y'iduka cg nyirayo
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">Telephone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Aho iduka riherereye
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold ">
                  Aho iduka riherereye birambuye
                </label>
                <input
                  type="text"
                  name="location_discription"
                  value={formData.location_discription}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Amakuru arambuye
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-16 rounded-md border border-slate-900 p-2 mb-3"
                />
                <label className="w-full text-slate-900 mb-1 font-semibold">
                  Ikirango cy'iduka
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full h-10 rounded-md border border-slate-900 p-2 mb-3"
                />
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="mt-4 w-full h-12 rounded-md bg-slate-900 text-white hover:bg-slate-800">
                  Next:{" "}
                  <span className=" text-lg font-extrabold ">
                    Amasaha dukoreraho
                  </span>
                </button>
              </div>
            )}
            {/* Step 2: Working Hours */}
            {step === 2 && (
            <div className="w-full flex flex-col bg-white px-4 lg:px-10 py-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Amasaha dukoreraho</h2>
            
            <div className=" p-4 rounded-lg w-full">
              {formData.working_hours.map((day, index) => (
                <div
                  key={index}
                  className="w-full  my-4 py-3 px-4 sm:flex-col sm:items-start md:flex-row flex justify-between items-center">
                  <p className="w-full sm:w-auto font-semibold">{day.day}</p>
                  <input
                    type="text"
                    name={`working_hours.${index}`}
                    value={day.time_range}
                    onChange={handleInputChange}
                    className="w-full sm:w-[80%] h-12 rounded-md border border-slate-900 px-4 mt-3 md:mt-0 text-white"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                  />
                </div>
              ))}
            </div>
          
            <div className="mt-8 flex flex-col sm:flex-row w-full justify-between items-center gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 w-full sm:w-auto bg-slate-900 text-white font-medium rounded-md shadow hover:bg-slate-800 transition">
                Prev: <span className="font-bold">Amakuru ajyanye na n'iduka</span>
              </button>
              
              <button
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.location ||
                  !formData.description
                }
                type="submit"
                className={`px-6 py-3 w-full sm:w-auto bg-slate-800 text-white font-medium rounded-md shadow hover:bg-slate-700 transition ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
          
            
            )}{" "}
          </form>{" "}
        </div>{" "}
      </div>
        <Footer />
    </div>
  );
};

export default RegisterShop;
