import React, { useState } from "react";
import CreateCategoryOverlay from "./CreateCategoryOverlay";

const CategoryHeader = ({ onCategoryCreated }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleCreateCategory = () => {
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 pr-5 pt-5 ">
        <h2 className="text-xl font pl-5 pt-5">Category Management</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={handleCreateCategory}
        >
          Create Category
        </button>
      </div>
      {isOverlayOpen && (
        <CreateCategoryOverlay
          onClose={handleCloseOverlay}
          onCategoryCreated={onCategoryCreated}
        />
      )}
    </>
  );
};

export default CategoryHeader;
