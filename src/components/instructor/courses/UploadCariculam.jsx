import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../utils/instance";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique keys

const UploadCariculam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = location.state;

  const [sections, setSections] = useState([
    {
      sectionName: "",
      videos: [{ title: "", videoFile: null, key: uuidv4() }],
    },
  ]);

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { sectionName: "", videos: [{ title: "", videoFile: null, key: uuidv4() }] },
    ]);
  };

  const addVideo = (sectionIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      const newVideo = {
        title: "",
        videoFile: null,
        key: uuidv4(), // Use uuid to generate a unique key
      };
      updatedSections[sectionIndex].videos.push(newVideo);
      return updatedSections;
    });
  };

  const handleSectionNameChange = (sectionIndex, event) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].sectionName = event.target.value;
      return updatedSections;
    });
  };

  const handleVideoTitleChange = (sectionIndex, videoIndex, event) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].videos[videoIndex].title = event.target.value;
      return updatedSections;
    });
  };

  const handleVideoFileChange = (sectionIndex, videoIndex, event) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].videos[videoIndex].videoFile = event.target.files[0];
      return updatedSections;
    });
  };

  const removeSection = (sectionIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections.splice(sectionIndex, 1);
      return updatedSections;
    });
  };

  const removeVideo = (sectionIndex, videoIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].videos.splice(videoIndex, 1);
      return updatedSections;
    });
  };

  const submitData = async () => {
    try {
      // Prepare the data to be sent to the server
      const requestData = {
        courseId,
        sections: sections.map((section) => ({
          sectionName: section.sectionName,
          videos: section.videos.map((video) => ({
            title: video.title,
            videoFile: video.videoFile,
          })),
        })),
      };
  
      const formData = new FormData();
  
      // Append the courseId to the formData
      formData.append('courseId', courseId);
  
      // Append each section and its videos as form data
      requestData.sections.forEach((section, sectionIndex) => {
        formData.append(`sections[${sectionIndex}][sectionName]`, section.sectionName);
  
        section.videos.forEach((video, videoIndex) => {
          formData.append(`sections[${sectionIndex}][videos][${videoIndex}][title]`, video.title);
          formData.append(`sections[${sectionIndex}][videos][${videoIndex}][videoFile]`, video.videoFile);
        });
      });
  
      const response = await axios.post("/instructor/create-cariculam", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Data sent to backend:", response);
      if (response.status === 200) {
        navigate('/instructor/courses');
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={addSection}
        >
          Add Section
        </button>
        <button
          className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={submitData}
        >
          Submit
        </button>
      </div>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 my-4">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              placeholder={`Enter Section Name ${sectionIndex + 1}`}
              value={section.sectionName}
              onChange={(event) =>
                handleSectionNameChange(sectionIndex, event)
              }
              className="border rounded px-3 py-2 w-full"
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
              onClick={() => removeSection(sectionIndex)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          {section.videos.map((video, videoIndex) => (
            <div key={video.key} className="mt-2 flex items-center">
              <input
                type="text"
                placeholder={`Enter Video Title ${videoIndex + 1}`}
                value={video.title}
                onChange={(event) =>
                  handleVideoTitleChange(sectionIndex, videoIndex, event)
                }
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  handleVideoFileChange(sectionIndex, videoIndex, event)
                }
                className="border rounded px-3 py-2 w-full ml-2"
              />
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 ml-2 rounded"
                onClick={() => removeVideo(sectionIndex, videoIndex)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mt-2"
            onClick={() => addVideo(sectionIndex)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">Add Video</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UploadCariculam;
