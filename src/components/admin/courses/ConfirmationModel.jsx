import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="w-96 bg-white rounded shadow-lg mx-auto mt-20 p-4 text-center"
      overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
    >
      <h2 className="text-xl font-semibold mb-4">Confirm Approval</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to approve this course?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded"
          onClick={onRequestClose}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
