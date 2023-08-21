import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";

const InstructorsTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [instructorToChange, setInstructorToChange] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const column = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
      sortable: true,
      width: "5%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Joined On",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => `${row.status}`,
    },
    {
      name: "Toggle Status",
      cell: (row) => (
        <button
          className={`${
            row.status === "Active" ? "bg-green-500" : "bg-red-500"
          } hover:bg-opacity-75 text-white font-bold py-1 px-2 rounded`}
          onClick={() => toggleConfirmation(row._id, row.status)} // Open confirmation dialog
        >
          {row.status === "Active" ? "Deactivate" : "Activate"}
        </button>
      ),
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/admin/instructors")
      .then((res) => {
        const instructorsWithSerialNo = res.data.results.instructors.map(
          (instructor, index) => ({
            ...instructor,
            serialNo: index + 1,
          })
        );

        setData(instructorsWithSerialNo);
        setFilterData(instructorsWithSerialNo);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const newData = filterData.filter((row) =>
      row.name.toLowerCase().includes(searchTerm)
    );
    setData(newData);
  };

  const toggleConfirmation = (instructorId, currentStatus) => {
    setInstructorToChange({ instructorId, currentStatus });
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const toggleInstructorStatus = async () => {
    try {
      const newStatus =
        instructorToChange.currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(
        `/admin/instructors/status/${instructorToChange.instructorId}?status=${newStatus}`
      );
      fetchData(); // Refresh the data after updating the status
      toast.success(`Instructor status changed to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update instructor status");
    }
  };

  return (
    <div className="p-4">
      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleFilter}
        />
      </div>
      {/* DataTable */}
      <DataTable columns={column} data={data} pagination />

      {/* Render the confirmation dialog */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 h-48">
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <p>Are you sure you want to change the status?</p>
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 "
                onClick={async () => {
                  setIsConfirmationOpen(false);
                  await toggleInstructorStatus();
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setIsConfirmationOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorsTable;
