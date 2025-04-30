import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import AddService from "./AddService";
import { baseUrl } from "../../../api";
import ConfirmModal from "../../models/ConfirmModal";

const ServiceList: React.FC = () => {
  const [ads, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const fetchService = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/services`);
      setService(response.data.advertisements);
    } catch (error) {
      message.error("Failed to fetch Services");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/services/${id}`);
      message.success("Service deleted successfully");
      fetchService();
    } catch (error) {
      message.error("Failed to delete service");
    } finally {
      setModalOpen(false);
    }
  };

  const handleDeleteServiceClick = (id: string) => {
    setCurrentServiceId(id);
    setModalOpen(true);
  };

  const handleEditServiceClick = (service: any) => {
    setCurrentService(service);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const confirmDeleteService = () => {
    if (currentServiceId) {
      deleteService(currentServiceId);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentService(null);
  };

  // Function to truncate text and strip markdown
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (!text) return "";

    const plainText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/<u>(.*?)<\/u>/g, "$1")
      .replace(/\n/g, " ")
      .replace(/\n- /g, ", ")
      .replace(/\n\d+\. /g, ", ");

    // Truncate the text
    if (plainText.length <= maxLength) return plainText;

    return plainText.substring(0, maxLength) + "...";
  };

  const columns = [
    {
      title: "Service name",
      dataIndex: "service_name",
      key: "service_name",
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "service_description",
      key: "service_description",
      render: (text: string) => truncateDescription(text),
      width: "40%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="service"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => handleEditServiceClick(record)}
            size="small"
            className="w-20 h-8 bg-blue-500 border border-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 transition duration-200 ease-in-out"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteServiceClick(record._id)}
            size="small"
            className="w-20 h-8 bg-red-500 border border-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 transition duration-200 ease-in-out"
          >
            Delete
          </Button>
        </div>
      ),
      width: "20%",
    },
  ];

  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Services</h1>
        <Button onClick={() => setIsModalVisible(true)}>Add Service</Button>
      </div>
      <Table
        dataSource={ads}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
        scroll={{ x: 800 }}
      />
      <AddService
        visible={isModalVisible}
        onClose={handleModalClose}
        onAdAdded={fetchService}
        isEditMode={isEditMode}
        serviceData={currentService}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDeleteService}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
      />
    </div>
  );
};

export default ServiceList;
