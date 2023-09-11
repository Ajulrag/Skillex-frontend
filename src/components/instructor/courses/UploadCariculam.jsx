import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../utils/instance";
import { useLocation,useNavigate } from "react-router-dom";

const UploadCariculam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = location.state;

  const [sections, setSections] = useState([]);

  const addSection = () => {
    const newSection = {
      sectionName: "",
      videos: [],
    };
    setSections([...sections, newSection]);
  };

  const addVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({
      title: "",
      videoFile: null,
      key: Date.now(),
    });
    setSections(updatedSections);
  };

  const handleSectionNameChange = (sectionIndex, event) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionName = event.target.value;
    setSections(updatedSections);
  };

  const handleVideoTitleChange = (sectionIndex, videoIndex, event) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].title = event.target.value;
    setSections(updatedSections);
  };

  const handleVideoFileChange = (sectionIndex, videoIndex, event) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].videoFile = event.target.files[0];
    setSections(updatedSections);
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const removeVideo = (sectionIndex, videoIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.splice(videoIndex, 1);
    setSections(updatedSections);
  };

  const submitData = async () => {
    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      sections.forEach((section, sectionIndex) => {
        formData.append(`curriculam[${sectionIndex}][section_title]`, section.sectionName);

        section.videos.forEach((video, videoIndex) => {
          formData.append(`curriculam[][lectures][][lecture_title]`, video.title);
          formData.append(`curriculam[][lectures][][video]`, video.videoFile);
        });
      });
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await axios.post("/instructor/create-cariculam", formData, {

      });

      console.log("Data sent to backend:", response.data);
      if(response.status === 200) {
        navigate('/instructor/courses')
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
