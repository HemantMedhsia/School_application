import { useEffect, useState } from "react";
import DynamicFilterBar from "../common/FilterBar/DynamicFilterBar";
import { getAPI } from "../utility/api/apiCall";
import axios from "axios";

const ClassTimetable = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        await getAPI("getAllClasses", {}, setClasses);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleClassChange = (selectedClass) => {
    setSelectedClass(selectedClass);
    setShowTable(false);
  };

  const formatTime = (timeString) => {
    const [startTime, endTime] = timeString.split(" - ");
    const format = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHours = hour % 12 || 12;
      const formattedMinutes = minute < 10 ? `0${minute}` : minute;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return `${format(startTime)} - ${format(endTime)}`;
  };

  const handleFilterSubmit = async (filterData) => {
    const selectedClassId = `Class ${filterData.class.trim()}`;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-class-timetable/${
          filterData.class
        }`
      );

      const timetableData = response.data.data[selectedClassId];

      if (timetableData) {
        setTimetable(timetableData);
        setShowTable(true);
      } else {
        setTimetable(null);
        setShowTable(false);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTimetable(null);
      setShowTable(false);
    }
  };

  const filterConfig = [
    {
      name: "class",
      label: "Select Class",
      placeholder: "Select Class",
      required: true,
      type: "select",
      options: classes.map((classItem) => ({
        label: classItem.name,
        value: classItem._id,
      })),
      onChange: handleClassChange,
    },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      {/* Filter Bar */}
      <DynamicFilterBar filters={filterConfig} onSubmit={handleFilterSubmit} />

      {/* Timetable Section */}
      <div className="mt-6">
        {showTable ? (
          <div className="flex flex-wrap gap-8">
            {daysOfWeek.map((day, dayIndex) => {
              const subjects = timetable ? timetable[day] : []; // Default to an empty array if timetable is undefined
              return (
                <div key={dayIndex} className="flex-1">
                  {/* Day heading */}
                  <h2 className="text-xl font-bold mb-4 text-center">{day}</h2>
                  <div className="flex flex-col gap-4">
                    {subjects && subjects.length > 0 ? ( // Check if subjects is defined and has length
                      subjects.map((subjectData, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 p-4 rounded-md bg-[#203046] text-white"
                        >
                          <h3 className="font-bold text-lg">
                            {subjectData.subject}
                          </h3>
                          <p className="text-sm">
                            {formatTime(subjectData.time)}
                          </p>
                          <p className="text-sm">{subjectData.teacher}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-400">
                        No classes scheduled.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-red-500">
            {selectedClass
              ? ""
              : "Please select a class to view the timetable."}
          </p>
        )}
      </div>
    </>
  );
};

export default ClassTimetable;
