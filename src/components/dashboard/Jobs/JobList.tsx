import React, { useEffect, useState } from "react";
import {
  deleteJobApplication,
  getJobApplications,
  replyToJobApplication, 
} from "../../../api/jobApplication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReplyApplicantModal from "./replyApplicantModal";

const JobApplicationsTable = () => {
  interface Application {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    backgroundInfo: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null); // State for selected email
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
    setDeletingId(id);
    try {
      const response = await deleteJobApplication(id);
      toast.success(response.message);
      setRefresh((prev) => !prev);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
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

  const handleReplySubmit = async ({subject, message }: {subject: string; message: string }) => {
    if(!selectedApplicantId) return;
    try {
     const Response = await replyToJobApplication(selectedApplicantId,subject, message); 
      toast.success(Response.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Failed to send reply.");
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
              {applications.reverse().map((application, index) => (
                <tr
                  key={application._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(application._id)}
                  style={{ cursor: "pointer" }}>
                  <td className="py-3 px-4">{application.fullName}</td>
                  <td
                    className="py-3 px-4 relative cursor-pointer"
                    onClick={(e) => handleCopyEmail(application.email, e)}
                    title="Click to copy">
                    {application.email}
                    {copied === application.email && (
                      <span className="absolute top-0 right-0 bg-gray-700 text-white text-xs rounded p-1">
                        Copied!
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{application.phone}</td>
                  <td className="py-3 px-4">
                    {application.backgroundInfo.slice(0, 50)}
                    {application.backgroundInfo.length > 50 && "..."}
                  </td>
                  <td className="py-3 px-4 flex justify-evenly space-x-2">
                    <button
                      onClick={(e) => handleDeleteApplication(application._id, e)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md w-full sm:w-auto"
                      disabled={deletingId === application._id}>
                      {deletingId === application._id ? "Loading..." : "Delete"}
                    </button>
                    <button
                      onClick={(e) => handleReplyClick(application._id, e)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md w-full sm:w-auto">
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReplyApplicantModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            applicantEmail={applications.find(app => app._id === selectedApplicantId)?.email || ""}
            onSubmit={handleReplySubmit}
          />
        </>
      )}
    </div>
  );
};

export default JobApplicationsTable;
