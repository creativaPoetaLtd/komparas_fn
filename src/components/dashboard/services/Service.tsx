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

  const confirmDeleteService = () => {
    if (currentServiceId) {
      deleteService(currentServiceId);
    }
  };

  const columns = [
    { title: "Service name", dataIndex: "service_name", key: "service_name" },
    {
      title: "Description",
      dataIndex: "service_description",
      key: "service_description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="service" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            handleDeleteServiceClick(record._id);
          }}
          danger
        >
          Delete
        </Button>
      ),
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
        rowKey="id"
        loading={loading}
        bordered
      />
      <AddService
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdAdded={fetchService}
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
