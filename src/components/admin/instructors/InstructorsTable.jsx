import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const InstructorsTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
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
      name: "Actions",
      selector: (row) => row.actions,
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
  }, []);

  const handleFilter = (event) => {
    const newData = filterData.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(newData);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
          onChange={handleFilter}
        />
      </div>
      <DataTable columns={column} data={data} pagination />
    </div>
  );
};

export default InstructorsTable;
