import React, { useState } from "react";

const CreateCategoryOverlay = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = () => {
    // Perform actions on submit, e.g., create category
    // Clear input fields
    setCategoryName("");
    setCategoryDescription("");
    // Close the overlay
    onClose();
  };

  const handleCancel = () => {
    // Clear input fields
    setCategoryName("");
    setCategoryDescription("");
    // Close the overlay
    onClose();
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border rounded mb-2 px-2 py-1 w-full"
        />
        <textarea
          placeholder="Category Description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          className="border rounded mb-4 px-2 py-1 w-full"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryOverlay;
