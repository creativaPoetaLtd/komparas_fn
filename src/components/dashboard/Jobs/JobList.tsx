import { useEffect, useState } from "react";
import { deleteJobApplication, getJobApplications } from "../../../api/jobApplication";
import { toast } from "react-toastify";

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

  const handleDeleteApplication = async (id: string) => {
    setDeletingId(id); 
    try {
      const response = await deleteJobApplication(id);
      toast.success(response.message);
      setRefresh((prev) => !prev);
    } finally {
      setDeletingId(null); 
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000); 
  };

  return (
    <div className="overflow-x-auto m-5">
      <h1 className="text-lg font-bold">Job Applications List</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
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
              >
                <td className="py-3 px-4">{application.fullName}</td>
                <td
                  className="py-3 px-4 relative cursor-pointer"
                  onClick={() => handleCopyEmail(application.email)}
                  title="Click to copy"
                >
                  {application.email}
                  {copied === application.email && (
                    <span className="absolute top-0 right-0 bg-gray-700 text-white text-xs rounded p-1">
                      Copied!
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">{application.phone}</td>
                <td className="py-3 px-4">{application.backgroundInfo}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteApplication(application._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    disabled={deletingId === application._id} 
                  >
                    {deletingId === application._id ? "Loading..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobApplicationsTable;
