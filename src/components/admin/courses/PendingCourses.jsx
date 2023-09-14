import React, { useEffect, useState } from "react";
import axios from "../../../utils/instance";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ConfirmationModal from "./ConfirmationModel";

Modal.setAppElement('#root');

const PendingCourses = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/admin/courses/pending-courses')
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
                    src={row.course_image}
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
        {
            name: 'Approve',
            cell: (row) => (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => openConfirmModal(row._id)}
                >
                    Approve
                </button>
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
            fetchData();
            toast.success(`Course status changed to ${newStatus}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update course status");
        }
    };

    const openConfirmModal = (courseId) => {
        setSelectedCourseId(courseId);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setSelectedCourseId(null);
        setIsConfirmModalOpen(false);
    };

    const confirmApprove = () => {
        if (selectedCourseId) {
            axios
                .put(`/admin/courses/pendingcourse/approval/${selectedCourseId}`)
                .then(() => {
                    fetchData();
                    toast.success('Course approved successfully');
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to approve course');
                })
                .finally(() => {
                    closeConfirmModal();
                });
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
        <div>
            <div className="text-center mt-8 mb-5">
                <h1 className="text-3xl font-semibold underline text-gray-800">COURSES WAITING FOR APPROVAL</h1>
            </div>

            <DataTable columns={column} data={data} pagination />

            {/* Use the ConfirmationModal component */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onRequestClose={closeConfirmModal}
                onConfirm={confirmApprove}
            />
        </div>
    );
}

export default PendingCourses;
