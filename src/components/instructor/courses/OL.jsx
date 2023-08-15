import React, { useState } from "react";

const OverlayComponent = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({ title: "", description: "" });
  const [stepTwoData, setStepTwoData] = useState({ duration: "", instructor: "" });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleInputChange = (e, stepNumber) => {
    const { name, value } = e.target;

    if (stepNumber === 1) {
      setStepOneData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (stepNumber === 2) {
      setStepTwoData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={stepOneData.title}
              onChange={(e) => handleInputChange(e, 1)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              name="Subtitle"
              placeholder="Subtitle"
              value={stepOneData.subtitle}
              onChange={(e) => handleInputChange(e, 1)}
              className="border rounded px-3 py-2 w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={stepOneData.description}
              onChange={(e) => handleInputChange(e, 1)}
              className="border rounded px-3 py-2 w-full"
              rows="3"
            />
            <div className="flex justify-between">
            <button
  onClick={onClose}
  className="px bg-white text-teal-500 font-semibold border-none cursor-pointer shadow-md box-border"
>
  Cancel
</button>

              <button onClick={() => setStep(2)} className="btn">
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={stepTwoData.duration}
              onChange={(e) => handleInputChange(e, 2)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={stepTwoData.instructor}
              onChange={(e) => handleInputChange(e, 2)}
              className="border rounded px-3 py-2 w-full"
            />
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Previous
              </button>
              <button onClick={() => setStep(3)} className="btn">
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="border rounded px-3 py-2 w-full"
            />
            <div className="flex justify-between">
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <div>
                <button onClick={() => setStep(2)} className="btn-secondary mr-2">
                  Previous
                </button>
                <button onClick={submitData} className="btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const submitData = async () => {
    // Prepare data and submit to the backend
    const formData = new FormData();
    formData.append("title", stepOneData.title);
    formData.append("description", stepOneData.description);
    formData.append("duration", stepTwoData.duration);
    formData.append("instructor", stepTwoData.instructor);
    formData.append("image", imageFile);
    formData.append("video", videoFile);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Data submitted successfully
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content p-6 rounded-lg shadow-lg bg-white">
        {renderStep()}
      </div>
    </div>
  );
};

export default OverlayComponent;
