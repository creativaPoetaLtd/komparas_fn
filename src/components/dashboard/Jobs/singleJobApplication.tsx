import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobApplication } from "../../../api/jobApplication";

const SingleJobApplication = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);

  interface Application {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    backgroundInfo: string;
  }

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      const response = await getJobApplication(id!);
      if (response && response.data) {
        setApplication(response.data);
      }
      setLoading(false);
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!application) {
    return <div>No application found</div>;
  }

  return (
    <div className="w-[90%] h-screen m-auto flex flex-col justify-center" >
    <div className=" w-full p-6 shadow-md rounded-lg bg-gray-200 ">
      <h1 className="text-2xl font-bold mb-4 m-auto flex justify-center items-center w-full">Job Application Details</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Full Name</h2>
        <p>{application.fullName}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Email</h2>
        <p>{application.email}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Phone</h2>
        <p>{application.phone}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Background Info</h2>
        <p>{application.backgroundInfo}</p>
      </div>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
    </div>
  );
};

export default SingleJobApplication;
