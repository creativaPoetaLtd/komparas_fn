import { TbTimeDuration0 } from "react-icons/tb";

const OpeningTimes = ({ shopData }: any) => {
    const days = [
        { en: "Monday", rw: "Kuwa mbere" },
        { en: "Tuesday", rw: "Kuwa kabiri" },
        { en: "Wednesday", rw: "Kuwa gatatu" },
        { en: "Thursday", rw: "Kuwa kane" },
        { en: "Friday", rw: "Kuwa gatanu" },
        { en: "Saturday", rw: "Kuwa gatandatu" },
        { en: "Sunday", rw: "Kucyumweru" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <div className="p-5">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-yellow-500 p-2 rounded-full flex items-center justify-center">
                        <TbTimeDuration0 className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-xs uppercase text-yellow-600 font-semibold tracking-wide">
                            Hafunguye
                        </p>
                        <h2 className="text-lg font-bold text-gray-800">
                            Amasaha y'akazi
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {days.map(({ en, rw }) => (
                        <div
                            key={en}
                            className="flex justify-between items-center py-2 px-3 rounded-md bg-gray-50 border border-gray-100"
                        >
                            <span className="text-sm text-gray-600">{rw}</span>
                            <span className="text-sm text-gray-900 font-medium">
                                {shopData?.working_hours?.find((day: any) => day?.day === en)
                                    ?.time_range || "Off"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpeningTimes;
