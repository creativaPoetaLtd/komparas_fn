import React, { useEffect, useState } from "react";
import {
  deleteJobApplication,
  getJobApplications,
  replyToJobApplication,
  prioritizeJobApplication,
} from "../../../api/jobApplication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReplyApplicantModal from "./replyApplicantModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye, FaReply } from "react-icons/fa6";
import { BsFillPinAngleFill } from "react-icons/bs";
import { RiUnpinFill } from "react-icons/ri";


const JobApplicationsTable = () => {
  interface Application {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    backgroundInfo: string;
    isPriotized: boolean;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchApplications = async () => {
    setLoading(true);
    const response = await getJobApplications();
    if (response && response.data) {
      setApplications(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, [refresh]);

  const handleDeleteApplication = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await deleteJobApplication(id);
      toast.success(response.message);
      setRefresh((prev) => !prev);
    } finally {
    }
  };
  const handleRowClick = (id: string) => {
    navigate(`/job-applications/${id}`);
  };

  const handleReplyClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedApplicantId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedApplicantId(null);
  };

  const handleReplySubmit = async ({ subject, message }: { subject: string; message: string }) => {
    if (!selectedApplicantId) return;
    try {
      const Response = await replyToJobApplication(selectedApplicantId, subject, message);
      toast.success(Response.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Failed to send reply.");
    }
  };

  const handleTogglePriority = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await prioritizeJobApplication(id);
      toast.success(response.message || "Priority updated successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Failed to update priority.");
    }
  };

  return (
    <div className="overflow-x-auto m-5">
      <h1 className="text-lg font-bold">Job Applications List</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200 overflow-auto">
            <thead>
              <tr className="bg-slate-200 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...applications]
                .sort((b) => (b.isPriotized ? 1 : -1)) 
                .map((application, index) => (
                  <tr
                    key={application._id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    style={{ cursor: "pointer" }}>
                    <td className="py-3 px-4">
                      {application.fullName}
                    </td>
                    <td
                      className="py-3 px-4 relative cursor-pointer"
                      title="Click to copy">
                      {application.email}</td>
                    <td className="py-3 px-4">{application.phone}</td>
                    <td className="py-3 px-4">
                      {application.backgroundInfo.slice(0, 50)}
                      {application.backgroundInfo.length > 50 && "..."}
                    </td>
                    <td className="py-3 px-4 flex justify-evenly space-x-2">
                      <span
                        onClick={(e) => handleDeleteApplication(application._id, e)}
                        className="text-red-500 cursor-pointer"
                        title="Delete">
                        <RiDeleteBin6Line />
                      </span>
                      <span
                        onClick={(e) => handleReplyClick(application._id, e)}
                        className="cursor-pointer"
                        title="Reply">
                        <FaReply />
                      </span>
                      <span
                        onClick={() => handleRowClick(application._id)}
                        className="cursor-pointer"
                        title="View">
                        <FaEye />
                      </span>
                      <span
                        onClick={(e) => handleTogglePriority(application._id, e)}
                        className="text-red-600 cursor-pointer"
                        title="Toggle Priority">
                        {application.isPriotized ? <RiUnpinFill />:<BsFillPinAngleFill />}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <ReplyApplicantModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            applicantEmail={applications.find((app) => app._id === selectedApplicantId)?.email || ""}
            onSubmit={handleReplySubmit}
          />
        </>
      )}
    </div>
  );
};

export default JobApplicationsTable;
