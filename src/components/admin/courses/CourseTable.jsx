import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai"

const CourseTable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        axios.get('/admin/get-courses')
            .then((res) => {
                setData(res.data.results.courses)
            })
            .catch((err) => console.log(err));
    }

    const column = [
        {
            name: "Serial No",
            selector: (row) => row._id
        },
        {
            name: "Name",
            selector: (row) => row.course_title
        },
        {
            name: "Description",
            selector: (row) => row.description
        },
        {
            name: "Published On",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "Status",
            selector: (row) => `${row.status}`,
        },
        {
            name: "Toggle Status",
            cell: (row) => (
                <button
                    className={`${row.status === "Active" ? "bg-red-500" : "bg-green-500"
                        } hover:bg-opacity-75 text-white font-bold py-1 px-2 rounded`}
                    onClick={() => toggleStatus(row._id, row.status)}
                >
                    {row.status === "Active" ? "Deactivate" : "Activate"}
                </button>
            ),
        },
        {
            name: "View",
            selector: (row) => <AiFillEye className="text-3xl" />

        },
    ];
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1
            }-${date.getFullYear()}`;
        return formattedDate;
    };

    const toggleStatus = async (courseId, currentStatus) => {
        try {
          const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
          await axios.put(`/admin/courses/course/status/${courseId}?status=${newStatus}`);
          fetchData(); // Refresh the data after updating the status
          toast.success(`Course status changed to ${newStatus}`);
        } catch (error) {
          console.error(error);
          toast.error("Failed to update course status");
        }
      };

    return (

        <DataTable columns={column} data={data} pagination />
    );
};

export default CourseTable;
