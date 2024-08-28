/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from ".";
import axios from "axios";

export const getJobApplications = async () => {
  try {
    const response = await axios.get(`${baseUrl}/job-applications`);
    return response.data;
  } catch (error) {
    console.error("Error getting job applications:", error);
    throw error;
  }
};

export const getJobApplication = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/job-applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting job application:", error);
    throw error;
  }
};

export const addJobApplication = async (jobApplicationData: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/job-applications`,
      jobApplicationData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding job application:", error);
    throw error;
  }
};


export const deleteJobApplication = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/job-applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job application:", error);
    throw error;
  }
};