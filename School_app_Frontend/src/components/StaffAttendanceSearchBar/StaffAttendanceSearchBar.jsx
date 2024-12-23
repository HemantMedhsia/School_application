import React, { useState } from "react";
import IconInput from "../../common/SearchBar/IconInput";
import Button from "../../common/SearchBar/Button";

const StaffAttendanceSearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Search text:", searchText);
    onSearch(searchText); // Pass the search text to the parent
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center mb-6 sm:p-4 px-4 py-2 space-y-4 md:space-y-0 md:space-x-6 bg-[#283046] rounded-md shadow-lg hover:shadow-xl transition duration-500 relative z-10">
      <div className="w-full md:flex-1 lg:w-1/3">
        <IconInput
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          }
          placeholder="Search by staff name . . ."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update search text state
        />
      </div>

      <div className="w-full md:w-auto flex justify-center lg:justify-start">
        <Button
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          }
          label="Search"
          onClick={handleSearch} // Trigger search on button click
        />
      </div>
    </div>
  );
};


export default StaffAttendanceSearchBar;
