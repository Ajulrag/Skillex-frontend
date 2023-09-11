import React, { useEffect, useState } from "react";
import axios from "../../../utils/instance";
import DataTable from "react-data-table-component";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import CategoryHeader from "./CategoryHeader";
import CreateCategoryOverlay from "./CreateCategoryOverlay";

const CategoriesTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [categoryToChange, setCategoryToChange] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleConfirmation = (categoryId, currentStatus) => {
    setCategoryToChange({ categoryId, currentStatus });
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const column = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
      sortable: true,
      width: "10%",
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
      cell: (row) => <div className="md:block ">{row.category_description}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Edit",
      selector: "",
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
          className={`${row.status === "Active" ? "bg-green-500" : "bg-red-500"
            } hover:bg-opacity-75 text-white font-bold py-1 px-2 rounded`}
          onClick={() => toggleConfirmation(row._id, row.status)}
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
        setFilterData(categoriesWithSerialNo);
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
      fetchData();
      toast.success(`Category status changed to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category status");
    }
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const newData = filterData.filter(
      (row) =>
        row.category_name.toLowerCase().includes(searchTerm) ||
        row.category_description.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm)
    );

    setData(newData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-[#] ml-3 mt-3 mr-3">
      <div className="mb-4">
        <div className="text-center text-black">
          <h1 className="text-3xl font-bold underline pb-3">
            CATEGORY MANAGEMENT
          </h1>
        </div>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleFilter}
        />
      </div>
      <CategoryHeader
        onCategoryCreated={fetchData}
        onCategoryEdit={() => setSelectedCategory(null)}
        setSelectedCategory={setSelectedCategory}
      />
      <DataTable columns={column} data={data} pagination />
      <Toaster />

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 h-48">
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <p>Are you sure you want to change the status?</p>
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={async () => {
                  setIsConfirmationOpen(false);
                  await toggleCategoryStatus(
                    categoryToChange.categoryId,
                    categoryToChange.currentStatus
                  );
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
