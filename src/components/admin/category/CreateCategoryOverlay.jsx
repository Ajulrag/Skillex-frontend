import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateCategoryOverlay = ({ onClose, onCategoryCreated }) => {
  const [category_name, setCategoryName] = useState("");
  const [category_description, setCategoryDescription] = useState("");
  const [categoryConflictError, setCategoryConflictError] = useState("");

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      console.log("Arrived for category creation");
      const response = await axios.post("/admin/categories/create", {
        category_name,
        category_description,
      });

      console.log(response.data, "Response data");
      setCategoryName("");
      setCategoryDescription("");
      setCategoryConflictError("");
      toast.success("Category created successfully");

      // Notify the parent component of the new category
      onCategoryCreated();

      onClose();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setCategoryConflictError(
          "Category name already exists. Please choose another name."
        );
      } else {
        toast.error("Failed to create category!!!");
      }
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    setCategoryDescription("");
    setCategoryConflictError("");
    onClose();
  };

  const validateForm = () => {
    if (!category_name.trim() || !category_description.trim()) {
      setCategoryConflictError("Category Name and Description are required");
      return false;
    }
    return true;
  };

  return (
    <div className="overlay" style={{ zIndex: 1000 }}>
      <div className="overlay-content">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>
        {categoryConflictError && (
          <p className="text-red-500 mb-2">{categoryConflictError}</p>
        )}
        <input
          type="text"
          placeholder="Category Name"
          value={category_name}
          onChange={(e) => {
            setCategoryName(e.target.value);
            setCategoryConflictError(""); // Clear error message when input changes
          }}
          className="border rounded mb-2 px-2 py-1 w-full"
        />
        <textarea
          placeholder="Category Description"
          value={category_description}
          onChange={(e) => {
            setCategoryDescription(e.target.value);
            setCategoryConflictError(""); // Clear error message when input changes
          }}
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
