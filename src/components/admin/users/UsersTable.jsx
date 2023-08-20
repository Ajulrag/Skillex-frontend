import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const column = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
      sortable: true,
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
      width: "25%",
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
          onClick={() => toggleUsersStatus(row._id, row.status)}
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
      .get("/admin/users")
      .then((res) => {
        const usersWithSerialNo = res.data.results.users.map(
          (user, index) => ({
            ...user,
            serialNo: index + 1,
          })
        );

        setData(usersWithSerialNo);
        setFilterData(usersWithSerialNo);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (event) => {
    const newData = filterData.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(newData);
  };

  const toggleUsersStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(
        `/admin/users/status/${userId}?status=${newStatus}`
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

export default UsersTable;
