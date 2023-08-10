import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import CategoryHeader from "./CategoryHeader";
import CreateCategoryOverlay from "./CreateCategoryOverlay"; // Import the overlay component

const CategoriesTable = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store the selected category

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
      selector: "", // We don't need a selector for this column
      cell: (row) => (
        <div>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEditCategory(row)}
          >
            Edit
          </button>
        </div>
      ),
      sortable: false,
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

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(
        `/admin/categories/category/status/${categoryId}?status=${newStatus}`
      );
      fetchData(); // Refresh the data after updating the status
      toast.success(`Category status changed to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category status");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-[#] ml-3 mt-3 mr-3">
      <CategoryHeader
        onCategoryCreated={fetchData}
        onCategoryEdit={() => setSelectedCategory(null)}
        setSelectedCategory={setSelectedCategory} // Pass the setSelectedCategory function
      />
      <DataTable columns={column} data={data} pagination />
      <Toaster />
      {selectedCategory && (
        <CreateCategoryOverlay
          onClose={() => setSelectedCategory(null)}
          onCategoryCreated={fetchData}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
