import React, { useState } from "react";
import CreateCategoryOverlay from "./CreateCategoryOverlay";

const CategoryHeader = ({
  onCategoryCreated,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleCreateCategory = () => {
    setSelectedCategory(null); // Reset selectedCategory for create mode
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setSelectedCategory(null); // Reset selectedCategory when closing overlay
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
          setSelectedCategory={setSelectedCategory} // Pass the setSelectedCategory function
        />
      )}
    </>
  );
};

export default CategoryHeader;
