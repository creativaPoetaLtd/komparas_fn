import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space } from 'antd';
import axios from 'axios';
import AdUploadForm from './AdUploadForm';
import { baseUrl } from '../../../api';
import { toggleAdvertActiveStatus } from '../../../api/ads';
import { MdDelete, MdSync } from 'react-icons/md';

const AdvertisementList: React.FC = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/ads/admin`);
      setAds(response.data.advertisements);
    } catch (error) {
      message.error('Failed to fetch advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdvertActiveStatus = async (id: string) => {
      try {
        await toggleAdvertActiveStatus(id);
        fetchAds();
        message.success('Ad active status toggled successfully');
      } catch (error) {
        message.error('Failed to toggle ad active status');
      }
    };

  const deleteAd = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/ads/${id}`);
      message.success('Advertisement deleted successfully');
      fetchAds(); 
    } catch (error) {
      message.error('Failed to delete advertisement');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Ad Type', dataIndex: 'ad_type', key: 'ad_type' },
    { title: 'Active', dataIndex: 'active', key: 'active', render: (active: boolean) => (
      <span>{active ? 'Yes' : 'No'}</span>
    ), },
    { title: 'Actions', key: 'actions', render: (_: any, record: any) => (
        <Space>
          <Button 
          onClick={
              () => {
                  deleteAd(record._id);
              }
          } danger icon={<MdDelete />}/>
        <Button
          onClick={() => handleToggleAdvertActiveStatus(record._id)}
          icon={<MdSync />}
        />
        </Space>
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
