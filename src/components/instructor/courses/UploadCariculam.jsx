import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const UploadCariculam = () => {
  const [sections, setSections] = useState([]);
  

  const addSection = () => {
    const newSection = {
      sectionName: "Section Name", // Initial section name
      videos: [],
    };
    setSections([...sections, newSection]);
  };

  const addVideo = (sectionIndex) => {
    const newVideo = {
      videoUrl: "",
    };
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push(newVideo);
    setSections(updatedSections);
  };

  const handleSectionNameChange = (sectionIndex, event) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionName = event.target.value;
    setSections(updatedSections);
  };

  const handleVideoUrlChange = (sectionIndex, videoIndex, event) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].videoUrl =
      event.target.value;
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

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={addSection}
      >
        Add Section
      </button>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 my-4">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              placeholder={`Section Name ${sectionIndex + 1}`}
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
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded"
            onClick={() => addVideo(sectionIndex)}
          >
            Add Video
          </button>
          {section.videos.map((video, videoIndex) => (
            <div key={videoIndex} className="mt-2 flex items-center">
              <input
                type="text"
                placeholder={`Video URL for Video ${videoIndex + 1}`}
                value={video.videoUrl}
                onChange={(event) =>
                  handleVideoUrlChange(sectionIndex, videoIndex, event)
                }
                className="border rounded px-3 py-2 w-full"
              />
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 ml-2 rounded"
                onClick={() => removeVideo(sectionIndex, videoIndex)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UploadCariculam;
