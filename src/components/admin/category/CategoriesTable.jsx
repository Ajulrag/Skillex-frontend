import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import CategoryHeader from "./CategoryHeader";

const CategoriesTable = () => {
  const [data, setData] = useState([]);

  const column = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.category_description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => row.serialNo,
      sortable: true,
    },
    {
      name: "Toggle Status",
      cell: (row) => (
        <button
          className={`${
            row.status === "Active" ? "bg-green-500" : "bg-red-500"
          } hover:bg-opacity-75 text-white font-bold py-1 px-2 rounded`}
          onClick={() => toggleCategoryStatus(row._id, row.status)}
        >
          {row.status === "Active" ? "Deactivate" : "Activate"}
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/admin/categories")
      .then((res) => {
        console.log(res.data.results.categories);
        const categoriesWithSerialNo = res.data.results.categories.map(
          (category, index) => ({
            ...category,
            serialNo: index + 1,
          })
        );
        setData(categoriesWithSerialNo);
      })
      .catch((err) => console.log(err));
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(`/admin/categories/category/status/${categoryId}?status=${newStatus}`);
      fetchData(); // Refresh the data after updating the status
      toast.success(`Category status changed to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category status");
    }
  };

  return (
    <>
      <CategoryHeader onCategoryCreated={fetchData} />
      <DataTable columns={column} data={data} pagination />
      <Toaster />
    </>
  );
};

export default CategoriesTable;
