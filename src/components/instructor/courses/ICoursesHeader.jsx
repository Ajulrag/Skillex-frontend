import React, { useState } from "react";
import OverlayComponent from "./CreateCourseOverlay";

const ICoursesHeader = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 pr-5 pt-5">
        <h2 className="text-xl font pl-5 pt-5">Course Management</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={toggleOverlay}
        >
          Create Course
        </button>
      </div>
      {overlayVisible && <OverlayComponent onClose={toggleOverlay} />}
    </>
  );
};

export default ICoursesHeader;
