import React from "react";
import IconInput from "./IconInput";
import Dropdown from "./Dropdown";

const ResultSearchBar = () => {

    const handleClassSelect = (selectedClass) => {
        onFilter({ type: "class", value: selectedClass });
      };
    
      const handleSectionSelect = (selectedSection) => {
        onFilter({ type: "section", value: selectedSection });
      };
    
      


  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center mb-6 sm:p-4 px-4 py-2 space-y-4 md:space-y-0 md:space-x-6 bg-[#283046] rounded-md shadow-lg hover:shadow-xl transition duration-500 relative z-10">
     <div className="w-full md:flex-1 lg:w-1/2">
        <IconInput
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          }
          placeholder="Article name or keyword..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update search text state
        />
      </div>

      <div className="w-full md:w-auto lg:flex-1">
        <Dropdown label="All Class" items={termItems} onSelect={handleClassSelect} />
      </div>

      <div className="w-full md:w-auto lg:flex-1">
        <Dropdown label="All Class" items={classItems} onSelect={handleClassSelect} />
      </div>

      <div className="w-full md:w-auto lg:flex-1">
        <Dropdown label="Section" items={sectionItems} onSelect={handleSectionSelect} />
      </div>
    </div>
  );
};

export default ResultSearchBar;
