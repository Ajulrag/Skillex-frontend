import React, { useEffect, useState } from "react";
import axios from "../../../utils/instance";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';

const CourseTable = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/admin/get-courses')
            .then((res) => {
                const coursesWithSerialNo = res.data.results?.courses?.map(
                    (course, index) => ({
                        ...course,
                        serialNo: index + 1,
                    })
                ) || [];

                setData(coursesWithSerialNo);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }

    const column = [
        {
            name: "SL No.",
            selector: (row) => row.serialNo,
            sortable: true,
            width: "7%",
        },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={process.env.REACT_APP_IMG_URL+data.course_image}
                    alt={row.course_title}  
                    style={{ width: "100px", height: "auto" }}
                />
            ),
        },
        {
            name: "Name",
            selector: (row) => row.course_title
        },
        {
            name: "Description",
            selector: (row) => row.description,
            cell: (row) => <div className="md:block ">{row.description}</div>,
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
            name: 'View',
            cell: (row) => (
                <Link to={`/admin/courses/getcourse/${row._id}`}>
                    <AiFillEye className='text-3xl' />
                </Link>

            ),
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
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="#007bff"
                        strokeWidth="8"
                        r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                        ></animateTransform>
                    </circle>
                </svg>
            </div>
        );
    }
    return (
        <DataTable columns={column} data={data} pagination />
    );
};

export default CourseTable;
