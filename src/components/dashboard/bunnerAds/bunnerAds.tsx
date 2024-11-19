import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import AdUploadForm from './AdUploadForm';
import { baseUrl } from '../../../api';

const AdvertisementList: React.FC = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/ads`);
      setAds(response.data.advertisements);
    } catch (error) {
      message.error('Failed to fetch advertisements');
    } finally {
      setLoading(false);
    }
  };

  const deleteAd = async (id: string) => {
    try {
      await axios.delete(`/api/advertisements/${id}`);
      message.success('Advertisement deleted successfully');
      fetchAds(); // Refresh the list
    } catch (error) {
      message.error('Failed to delete advertisement');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Ad Type', dataIndex: 'ad_type', key: 'ad_type' },
    { title: 'Actions', key: 'actions', render: (_: any, record: any) => (
      <Popconfirm
        title="Are you sure to delete this advertisement?"
        onConfirm={() => deleteAd(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    ) },
  ];

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Advertisements</h1>
        <Button  onClick={() => setIsModalVisible(true)}>
          Add Advertisement
        </Button>
      </div>
      <Table
        dataSource={ads}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered
      />
      <AdUploadForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdAdded={fetchAds}
      />
    </div>
  );
};

export default AdvertisementList;
