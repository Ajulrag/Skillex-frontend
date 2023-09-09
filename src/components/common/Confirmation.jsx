// ConfirmationDialog.jsx

import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md">
        <p className="text-lg text-gray-800">{message}</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
