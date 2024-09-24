import React, { useEffect, useState } from "react";
import Datatable from "../../common/Datatables/Datatable";
import SearchBar from "../../common/SearchBar/SearchBar";
import { deleteAPI, getAPI } from "../../utility/api/apiCall";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import DetailsSelectionModal from "../../common/ConfirmationModal/DetailsSelectionModal";
import axios from "axios";

const StudentInfo = () => {
  const [allStudentData, setAllStudentData] = useState([]);
  const [updatedAllStudentdata, setUpdatedAllStudentdata] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [classItems, setClassItems] = useState([]);
  const [sectionItems, setSectionItems] = useState([]);
  const [sessionItems, setSessionItems] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchDropdownData = async () => {
    try {
      await getAPI("getAllClasses", {}, setClassItems);
      await getAPI("getAllSections", {}, setSectionItems);
      await getAPI("getAllSessions", {}, setSessionItems);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAPI("getAllStudents", {}, setAllStudentData);

      if (response.data && Array.isArray(response.data)) {
        console.log("Fetching student attendance summaries...");

        // Use Promise.all to handle the asynchronous calls inside map
        const updatedResponse = await Promise.all(
          response.data.map(async (student) => {
            try {
              const { data } = await axios.get(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/get-student-attendance-summary/${student._id}`
              );

              const attendancePercentage = data?.data?.percentage || 89; // Default to 89 if not available

              return {
                ...student,
                attendancePercentage: attendancePercentage.toFixed(2), // Ensure percentage is formatted
                grade: "A", // Example grade
              };
            } catch (error) {
              console.error(
                `Error fetching attendance for student ${student._id}:`,
                error
              );
              return {
                ...student,
                attendancePercentage: 89, // Default in case of error
                grade: "A", // Example grade
              };
            }
          })
        );

        console.log(
          "Updated student data with attendance percentage:",
          updatedResponse
        );
        setAllStudentData(updatedResponse);
        setFilteredStudentData(updatedResponse);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Handle filter logic
  const handleFilter = ({ type, value }) => {
    let filteredData = allStudentData;
    console.log("filteredData", filteredData);

    if (type === "class" && value) {
      setSelectedClass(value); // Store selected class
      filteredData = filteredData.filter(
        (student) => student.currentClass._id === value._id
      );
    } else if (type === "section" && value && selectedClass) {
      // Check if a class is selected
      filteredData = filteredData.filter(
        (student) => student.currentSection._id === value._id
      );
    } else if (type === "session" && value) {
      filteredData = filteredData.filter(
        (student) => student.currentSession._id === value._id
      );
    }

    if (searchText) {
      filteredData = filteredData.filter((student) => {
        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();
        return (
          fullName.includes(searchText.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    setFilteredStudentData(filteredData);
  };

  const handleDetailsSelect = (type) => {
    if (type === "student") {
      navigate(`/school/student-admission/${selectedStudent._id}`);
    } else if (type === "parent") {
      console.log("selected", selectedStudent._id);
      navigate(`/school/parent-update-student/${selectedStudent._id}`);
    }
  };

  const closeDetailsModal = () => {
    setSelectedStudent(null);
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    handleFilter({});
  };

  const columns = [
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Roll Number", accessor: "rollNumber" },
    { header: "Age", accessor: "age" },
    {
      header: "Father Name",
      accessor: (rowData) => rowData?.parent?.fatherName || "N/A",
    },
    {
      header: "Class",
      accessor: (rowData) => rowData?.currentClass?.name || "N/A",
    },
    {
      header: "Section",
      accessor: (rowData) => rowData?.currentSection?.name || "N/A",
    },
    {
      header: "Attendance Percentage",
      accessor: "attendancePercentage", // Corrected the field name
      render: (rowData) => {
        const attendanceValue = parseFloat(rowData.attendancePercentage); // Using the correct field
        return (
          <div className="flex items-center">
            <span className="mr-2">{attendanceValue}%</span>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
                <div
                  style={{
                    width: `${attendanceValue}%`,
                    backgroundColor:
                      attendanceValue >= 75 ? "#4caf50" : "#ff5252",
                  }}
                  className="h-2 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                />
              </div>
            </div>
          </div>
        );
      },
    },
    { header: "Grade", accessor: "grade" },
  ];

  const handleEdit = (studentData) => {
    setSelectedStudent(studentData);
    setIsDetailsModalOpen(true);
  };

  const handleView = (studentData) => {
    navigate(`/school/profile/${studentData._id}`);
  };

  const handleDelete = (studentData) => {
    setStudentToDelete(studentData);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await deleteAPI(`delete-student/${studentToDelete._id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting student:", error);
      } finally {
        setIsModalOpen(false);
        setStudentToDelete(null);
      }
    }
  };

  return (
    <div>
      <SearchBar
        classItems={classItems}
        sectionItems={sectionItems}
        sessionItems={sessionItems}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <Datatable
        data={filteredStudentData}
        columns={columns}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete ${
          studentToDelete ? studentToDelete.firstName : ""
        }?`}
      />
      <DetailsSelectionModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        onSelect={handleDetailsSelect}
      />
    </div>
  );
};

export default StudentInfo;
