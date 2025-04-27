import { useState } from "react";
import { addShop } from "../../../../api/getAllShops";

interface AddShopFormProps {
  setIsAddShop: (isShopFormOpen: boolean) => void;
}

interface WorkingHour {
  day: string;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddShopForm = ({ setIsAddShop }: AddShopFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    location_discription: "",
    image: null as File | null | any,
  });

  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([
    { day: "Monday", isOpen: true, startTime: "09:00", endTime: "17:00" },
  ]);

  const [availableDays, setAvailableDays] = useState<string[]>(
    allDays.filter((day) => day !== "Monday"),
  );

  const handleShopFormClose = () => {
    setIsAddShop(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleAddDay = () => {
    if (availableDays.length === 0) return;

    const nextDay = availableDays[0];
    const updatedAvailableDays = availableDays.filter((day) => day !== nextDay);

    setWorkingHours([
      ...workingHours,
      { day: nextDay, isOpen: true, startTime: "09:00", endTime: "17:00" },
    ]);

    setAvailableDays(updatedAvailableDays);
  };

  const handleRemoveDay = (index: number) => {
    const dayToRemove = workingHours[index].day;
    const updatedWorkingHours = workingHours.filter((_, i) => i !== index);

    setWorkingHours(updatedWorkingHours);
    setAvailableDays(
      [...availableDays, dayToRemove].sort((a, b) => {
        return allDays.indexOf(a) - allDays.indexOf(b);
      }),
    );
  };

  const handleToggleDay = (index: number) => {
    const updatedHours = [...workingHours];
    updatedHours[index].isOpen = !updatedHours[index].isOpen;
    setWorkingHours(updatedHours);
  };

  const handleTimeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    const updatedHours = [...workingHours];
    updatedHours[index][field] = value;
    setWorkingHours(updatedHours);
  };

  const formatTimeForDisplay = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
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
    formDataToSend.append(
      "location_discription",
      formData.location_discription,
    );
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    // Convert working hours to the format expected by the API
    workingHours.forEach((wh, index) => {
      formDataToSend.append(`working_hours[${index}][day]`, wh.day);
      const timeRange = wh.isOpen ? `${wh.startTime}-${wh.endTime}` : "Closed";
      formDataToSend.append(`working_hours[${index}][time_range]`, timeRange);
    });

    await addShop(formDataToSend);
    setLoading(false);
    setIsAddShop(false);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.owner &&
      formData.email &&
      formData.phone &&
      formData.location &&
      formData.description
    );
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">
            Register New Shop
          </h1>
          <button
            className="p-1 rounded-full hover:bg-slate-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            onClick={handleShopFormClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleAddShop} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">
                Shop Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter shop name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name*
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter owner name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0782342196"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">
                Location Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Address*
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Kigali City"
                    required
                  />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Maps Location
                  </label>
                  <input
                    type="text"
                    name="location_discription"
                    value={formData.location_discription}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste Google Maps URL here"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Go to Google Maps, find the shops's location, and copy the URL
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h2 className="text-lg font-medium text-gray-800">
                  Working Hours
                </h2>
                {availableDays.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddDay}
                    className="flex items-center justify-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Day
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {workingHours.map((day, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-3 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`day-${index}`}
                          checked={day.isOpen}
                          onChange={() => handleToggleDay(index)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <label
                          htmlFor={`day-${index}`}
                          className="ml-2 font-medium text-gray-700"
                        >
                          {day.day}
                        </label>
                        <span className="ml-2 text-sm px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {day.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveDay(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {day.isOpen && (
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Opening Time
                          </label>
                          <input
                            type="time"
                            value={day.startTime}
                            onChange={(e) =>
                              handleTimeChange(
                                index,
                                "startTime",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTimeForDisplay(day.startTime)}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Closing Time
                          </label>
                          <input
                            type="time"
                            value={day.endTime}
                            onChange={(e) =>
                              handleTimeChange(index, "endTime", e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTimeForDisplay(day.endTime)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {workingHours.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="mt-2 text-gray-500">No working days added</p>
                    <button
                      type="button"
                      onClick={handleAddDay}
                      className="mt-3 px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm"
                    >
                      Add Working Day
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">
                Additional Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Description*
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your shop, products, services..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload an image</span>
                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {formData.image && (
                        <p className="text-xs text-green-600 mt-2">
                          File selected: {formData.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="button"
                onClick={handleShopFormClose}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className={`px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600
                                    ${loading || !isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Register Shop"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShopForm;
