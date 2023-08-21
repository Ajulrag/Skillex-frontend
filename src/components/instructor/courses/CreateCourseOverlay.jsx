import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OverlayComponent = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user)
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [stepOneData, setStepOneData] = useState({
    course_title: "",
    course_subtitle: "",
    description: "",
  });
  const [stepTwoData, setStepTwoData] = useState({
    duration: "",
    category: "",
  });
  const [stepThreeData, setStepThreeData] = useState({
    price: "",
    saleprice: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({
    stepOne: {},
    stepTwo: {},
    stepThree: {},
    stepFour: {}
  });


  const handleInputChange = (e, stepNumber) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (stepNumber === 1) {
      setStepOneData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      newErrors.stepOne = { ...newErrors.stepOne, [name]: "" };
    } else if (stepNumber === 2) {
      setStepTwoData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      newErrors.stepTwo = { ...newErrors.stepTwo, [name]: "" };
    } else if (stepNumber === 3) {
      setStepThreeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      newErrors.stepThree = { ...newErrors.stepThree, [name]: "" };
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/instructor/categories");
        if (response.status === 200) {
          setCategories(response.data.results.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const validateStepOne = () => {
    const newErrors = { ...errors.stepOne };
    let isValid = true;

    if (!stepOneData.course_title) {
      newErrors.course_title = "Course title is required.";
      isValid = false;
    }

    if (!stepOneData.course_subtitle) {
      newErrors.course_subtitle = "Course subtitle is required.";
      isValid = false;
    }

    if (!stepOneData.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    setErrors({ ...errors, stepOne: newErrors });
    return isValid;
  };

  const validateStepTwo = () => {
    const newErrors = { ...errors.stepTwo };
    let isValid = true;

    if (!stepTwoData.duration) {
      newErrors.duration = "Course duration is required.";
      isValid = false;
    }

    if (!stepTwoData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }

    setErrors({ ...errors, stepTwo: newErrors });
    return isValid;
  };
  const validateStepThree = () => {
    const newErrors = { ...errors.stepThree };
    let isValid = true;

    if (!stepThreeData.price) {
      newErrors.price = "Course price is required.";
      isValid = false;
    }

    if (!stepThreeData.saleprice) {
      newErrors.saleprice = "Saleprice is required.";
      isValid = false;
    }

    setErrors({ ...errors, stepThree: newErrors });
    return isValid;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input
              type="text"
              name="course_title"
              placeholder="Course Title"
              value={stepOneData.course_title}
              onChange={(e) => handleInputChange(e, 1)}
              className={`border rounded px-3 py-2 w-full ${errors.stepOne.course_title ? "border-red-500" : ""
                }`}
            />
            {errors.stepOne.course_title && (
              <p className="text-red-500">{errors.stepOne.course_title}</p>
            )}
            <input
              type="text"
              name="course_subtitle"
              placeholder="Subtitle"
              value={stepOneData.course_subtitle}
              onChange={(e) => handleInputChange(e, 1)}
              className={`border rounded px-3 py-2 w-full ${errors.stepOne.course_subtitle ? "border-red-500" : ""
                }`}
            />
            {errors.stepOne.course_subtitle && (
              <p className="text-red-500">{errors.stepOne.course_subtitle}</p>
            )}
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={stepOneData.description}
              onChange={(e) => handleInputChange(e, 1)}
              className={`border rounded px-3 py-2 w-full ${errors.stepOne.description ? "border-red-500" : ""
                }`}
              rows="3"
            />
            {errors.stepOne.description && (
              <p className="text-red-500">{errors.stepOne.description}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="bg-gray-100 h-10 w-20 text-gray-600 font-semibold border-none cursor-pointer shadow-lg rounded-lg relative hover:bg-gray-200"
                style={{
                  boxShadow:
                    "inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (validateStepOne()) {
                    setStep(2);
                  }
                }}
                className="h-10 w-20 px-5 text-gray-100 bg-teal-500 font-semibold border-none cursor-pointer shadow-lg rounded-lg relative hover:bg-white hover:text-teal-500"
                style={{
                  boxShadow:
                    "inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <input
              type="number"
              name="duration"
              placeholder="Course Duration"
              value={stepTwoData.duration}
              onChange={(e) => handleInputChange(e, 2)}
              className={`border rounded px-3 py-2 w-full ${errors.stepTwo.duration ? "border-red-500" : ""
                }`}
            />
            {errors.stepTwo.duration && (
              <p className="text-red-500">{errors.stepTwo.duration}</p>
            )}
            <select
              name="category"
              value={stepTwoData.category}
              onChange={(e) => handleInputChange(e, 2)}
              className={`border rounded px-3 py-2 w-full ${errors.stepTwo.category ? "border-red-500" : ""
                }`}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (  // <-- This is where the error is occurring
                <option key={category._id} value={category._id}> {/* Make sure you are using the correct property */}
                  {category.category_name} {/* Make sure you are using the correct property */}
                </option>
              ))}
            </select>
            {errors.stepTwo.category && (
              <p className="text-red-500">{errors.stepTwo.category}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary hover:text-teal-500"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (validateStepTwo()) {
                    setStep(3);
                  }
                }}
                className="h-10 w-20 px-5 text-gray-100 bg-teal-500 font-semibold border-none cursor-pointer shadow-lg rounded-lg relative hover:bg-white hover:text-teal-500"
                style={{
                  boxShadow:
                    "inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <input
              type="number"
              name="price"
              placeholder="Course Price"
              value={stepThreeData.price}
              onChange={(e) => handleInputChange(e, 3)}
              className={`border rounded px-3 py-2 w-full ${errors.stepThree.price ? "border-red-500" : ""
                }`}
            />
            {errors.stepThree.price && (
              <p className="text-red-500">{errors.stepThree.price}</p>
            )}
            <input
              type="number"
              name="saleprice"
              placeholder="Sale Price"
              value={stepThreeData.saleprice}
              onChange={(e) => handleInputChange(e, 3)}
              className={`border rounded px-3 py-2 w-full ${errors.stepThree.price ? "border-red-500" : ""
                }`}
            />
            {errors.stepThree.saleprice && (
              <p className="text-red-500">{errors.stepThree.saleprice}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary hover:text-teal-500"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (validateStepThree()) {
                    setStep(4);
                  }
                }}
                className="h-10 w-20 px-5 text-gray-100 bg-teal-500 font-semibold border-none cursor-pointer shadow-lg rounded-lg relative hover:bg-white hover:text-teal-500"
                style={{
                  boxShadow:
                    "inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 p-8 xl:min-w-[100vh]">
            {imageFile && (
              <div className="flex flex-col items-center">
                {/* <h3 className="text-lg font-semibold mb-2">Uploaded Image Preview:</h3> */}
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded"
                  className="max-w-[50vh] max-h-[20vh] rounded-lg shadow-md"
                />
              </div>
            )}
            <label className="relative block w-full h-16 bg-white border border-gray-300 rounded cursor-pointer">
              <div className="flex items-center justify-center h-full px-4">
                <svg
                  className="w-8 h-8 text-gray-500 mr-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="text-gray-500 text-lg">
                  Upload your image
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>

            {errors.stepFour.image && (
              <p className="text-red-500">{errors.stepFour.image}</p>
            )}

            {videoFile && (
              <div className="flex flex-col items-center mt-4">
                {/* <h3 className="text-lg font-semibold mb-2">Uploaded Video Preview:</h3> */}
                <video
                  controls
                  className="max-w-[50vh] max-h-[20vh] rounded-lg shadow-md"
                >
                  <source
                    src={URL.createObjectURL(videoFile)}
                    type={videoFile.type}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <label className="relative block w-full h-16 bg-white border border-gray-300 rounded cursor-pointer">
              <div className="flex items-center justify-center h-full px-4">
                <svg
                  className="w-8 h-8 text-gray-500 mr-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="text-gray-500 text-lg">
                  Upload Promo video
                </span>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {errors.stepFour.video && (
              <p className="text-red-500">{errors.stepFour.video}</p>
            )}

            <div className="flex justify-between">
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <div>
                <button
                  onClick={() => setStep(3)}
                  className="btn-secondary hover:text-teal-500 mr-4"
                >
                  Previous
                </button>
                <button
                  onClick={submitData}
                  className="h-10 w-30 px-5 text-gray-100 bg-teal-500 font-semibold border-none cursor-pointer shadow-lg rounded-lg relative hover:bg-white hover:text-teal-500"
                  style={{
                    boxShadow:
                      "inset 4px 4px 6px rgba(0, 0, 0, 0.1), inset -4px -4px 6px rgba(255, 255, 255, 0.5)",
                  }}
                >
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
    try {
      if (!user) {
        console.error("User data is not available.");
        return;
      }
      const formData = new FormData();
      formData.append("course_title", stepOneData.course_title);
      formData.append("course_subtitle", stepOneData.course_subtitle);
      formData.append("description", stepOneData.description);
      formData.append("duration", stepTwoData.duration);
      formData.append("category", stepTwoData.category);
      formData.append("price", stepThreeData.price);
      formData.append("saleprice", stepThreeData.saleprice);
      formData.append("course_image", imageFile);
      formData.append("promotional_video", videoFile);
      formData.append("tutor", user._id);

      const response = await axios.post("/instructor/submit-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Course submitted successfully");
        navigate('/instructor/create-courses');
      } else {
        console.error("Failed to submit course");
      }
    } catch (error) {
      console.error("Error submitting course:", error);
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
