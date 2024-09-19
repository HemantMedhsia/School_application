import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import FormSection from "../../components/Form/FormSection";
import Input from "../../components/Form/Input";
import FormButton from "../../components/Form/FormButton";

const ExamGroup = () => {
  const [examGroupName, setExamGroupName] = useState("");
  const [examGroups, setExamGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);

  const handleSave = async () => {
    if (examGroupName.trim()) {
      if (editingGroupId) {
        // Update existing exam group
        await handleUpdate();
      } else {
        // Create a new exam group
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/create-examgroup`,
            { name: examGroupName }
          );
          if (response.status === 201) { 
            const newGroup = response.data.data;
            setExamGroups([...examGroups, newGroup]);
          } else {
            console.error("Failed to create exam group");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      setExamGroupName("");
    }
  };

  const handleUpdate = async () => {
    if (editingGroupId && examGroupName.trim()) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/update-examgroup/${editingGroupId}`,
          { name: examGroupName }
        );
        if (response.status === 200) {
          setExamGroups(
            examGroups.map((group) =>
              group._id === editingGroupId
                ? { ...group, name: examGroupName }
                : group
            )
          );
          setEditingGroupId(null);
          setExamGroupName("");
        } else {
          console.error("Failed to update exam group");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-examgroup/${id}`);
      setExamGroups(examGroups.filter((group) => group._id !== id));
    } catch (error) {
      console.error("Failed to delete exam group", error);
    }
  };

  useEffect(() => {
    const fetchExamGroups = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-examgroup`
        );
        setExamGroups(response.data.data);
      } catch (error) {
        console.error("Error fetching exam groups:", error);
      }
    };
    fetchExamGroups();
  }, []);

  const handleEdit = (id) => {
    const group = examGroups.find((group) => group._id === id);
    setExamGroupName(group.name);
    setEditingGroupId(id);
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <FormSection title="Create Exam Group">
          <Input
            labelName="Exam Group Name"
            type="text"
            placeholder="Enter exam group name"
            value={examGroupName}
            onChange={(e) => setExamGroupName(e.target.value)}
          />
        </FormSection>
        <div className="flex">
          <FormButton
            name={editingGroupId ? "Update" : "Save"}
            onClick={handleSave}
          />
        </div>
      </div>
      <div className="mt-6 w-1/2 p-16">
        <label className="block text-lg font-medium text-[#7367F0] mb-4">
          Exam Groups
        </label>
        {examGroups.length > 0 ? (
          <div className="grid grid-cols-1 w-full sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {examGroups.map((group) => (
              <div
                key={group._id}
                className="flex items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-900 border border-[#65FA9E]"
              >
                <label className="text-[#65FA9E] text-md font-medium flex-grow">
                  {group.name}
                </label>
                <div className="border-l-2 pl-4 border-[#65FA9E]">
                  <button
                    className="text-blue-500 mr-4"
                    onClick={() => handleEdit(group._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(group._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No exam groups available</p>
        )}
      </div>
    </div>
  );
};

export default ExamGroup;