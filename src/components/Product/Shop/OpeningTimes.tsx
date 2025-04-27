import { TbTimeDuration0 } from "react-icons/tb";
import { useState, useEffect } from "react";

interface WorkingHour {
  day: string;
  time_range: string;
  _id: string;
}

interface ShopData {
  description?: string;
  email?: string;
  image?: string;
  isAccepted?: boolean;
  location?: string;
  location_discription?: string;
  name?: string;
  owner?: string;
  phone?: string;
  shop_number?: number;
  working_hours?: WorkingHour[];
}

interface OpeningTimesProps {
  shopData: ShopData;
}

interface DayTranslation {
  en: string;
  rw: string;
}

const OpeningTimes: React.FC<OpeningTimesProps> = ({ shopData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const days: DayTranslation[] = [
    { en: "Monday", rw: "Kuwa mbere" },
    { en: "Tuesday", rw: "Kuwa kabiri" },
    { en: "Wednesday", rw: "Kuwa gatatu" },
    { en: "Thursday", rw: "Kuwa kane" },
    { en: "Friday", rw: "Kuwa gatanu" },
    { en: "Saturday", rw: "Kuwa gatandatu" },
    { en: "Sunday", rw: "Kucyumweru" },
  ];

  // Group days by their time ranges
  const groupedSchedule = (): [string, string[]][] => {
    const scheduleGroups: Record<string, string[]> = {};
    
    days.forEach(({ en }) => {
      // Find the working hour for this day
      const workingHour = shopData?.working_hours?.find(hour => hour.day === en);
      // Use the time_range if exists, otherwise "Off"
      const timeRange = workingHour ? workingHour.time_range : "Off";
      
      if (!scheduleGroups[timeRange]) {
        scheduleGroups[timeRange] = [];
      }
      scheduleGroups[timeRange].push(en);
    });
    
    return Object.entries(scheduleGroups);
  };

  // Check if shop is currently open
  useEffect(() => {
    const checkIfOpen = (): void => {
      const date = new Date();
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentDayName = dayNames[date.getDay()];
      
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const currentTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      const workingHour = shopData?.working_hours?.find(hour => hour.day === currentDayName);
      
      if (workingHour && workingHour.time_range) {
        // Notice: time_range format changed from "09:00-17:00" in your data
        const timeRangeParts = workingHour.time_range.split('-');
        
        if (timeRangeParts.length === 2) {
          const openTime = timeRangeParts[0];
          const closeTime = timeRangeParts[1];
          
          // Convert times to minutes for easier comparison
          const convertToMinutes = (timeStr: string): number => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return (hours || 0) * 60 + (minutes || 0);
          };
          
          const currentMinutes = convertToMinutes(currentTimeStr);
          const openMinutes = convertToMinutes(openTime);
          const closeMinutes = convertToMinutes(closeTime);
          
          setIsOpen(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
        } else {
          setIsOpen(false);
        }
      } else {
        setIsOpen(false);
      }
    };
    
    if (shopData?.working_hours) {
      checkIfOpen();
      const interval = setInterval(checkIfOpen, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [shopData]);

  const getTranslatedDay = (dayName: string): string => {
    return days.find(day => day.en === dayName)?.rw || dayName;
  };

  const formatDayGroup = (dayGroup: string[]): string => {
    if (dayGroup.length === 1) {
      return getTranslatedDay(dayGroup[0]);
    }
    
    if (dayGroup.length === 2) {
      return `${getTranslatedDay(dayGroup[0])} & ${getTranslatedDay(dayGroup[1])}`;
    }
    
    // Check if days are consecutive
    const dayIndices = dayGroup.map(day => days.findIndex(d => d.en === day));
    const isSorted = dayIndices.every((val, i, arr) => !i || val === arr[i-1] + 1);
    
    if (isSorted && dayGroup.length > 2) {
      return `${getTranslatedDay(dayGroup[0])} - ${getTranslatedDay(dayGroup[dayGroup.length - 1])}`;
    } else {
      // Not consecutive or can't determine order, list them
      return dayGroup.map(day => getTranslatedDay(day)).join(", ");
    }
  };

  const statusText = isOpen ? "Hafunguye (Open)" : "Hafunze (Closed)";
  const statusColor = isOpen ? "text-green-600" : "text-red-600";
  const iconBgColor = isOpen ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`${iconBgColor} p-2 rounded-full flex items-center justify-center`}>
            <TbTimeDuration0 className="text-white text-xl" />
          </div>
          <div>
            <p className={`text-xs uppercase font-semibold tracking-wide ${statusColor}`}>
              {statusText}
            </p>
            <h2 className="text-lg font-bold text-gray-800">
              Amasaha y'akazi
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-3">
          {shopData?.working_hours ? (
            groupedSchedule().map(([timeRange, dayGroup]) => (
              <div
                key={timeRange}
                className={`flex justify-between items-center py-2 px-3 rounded-md ${
                  timeRange === "Off" 
                    ? "bg-red-50 border border-red-100" 
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <span className="text-sm text-gray-600">{formatDayGroup(dayGroup)}</span>
                <span className={`text-sm font-medium ${
                  timeRange === "Off" ? "text-red-500" : "text-gray-900"
                }`}>
                  {timeRange}
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No schedule information available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpeningTimes;