import React, { useEffect, useState } from 'react';
import { getAllCompaniesAdsAdmin, toggleAdActiveStatus } from '../../../api/ads';
import { baseUrl } from '../../../api';
import axios from 'axios';
import { 
  Table, 
  Tabs, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Upload,
  Space,
  message,
} from 'antd';
import { MdDelete, MdSync } from 'react-icons/md';

const { TabPane } = Tabs;


// Types based on your MongoDB schemas
interface ICompanyAds {
  _id: string;
  image?: string;
  name: string;
  url: string;
  title: string;
  active: Boolean;
  createdAt: string;
}

const AdsManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('company');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [form] = Form.useForm();

 


  const [companyAd, setCompanyAds] = useState<ICompanyAds[]>([]);
  
    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAdsAdmin();
        setCompanyAds(response?.data?.advertisements);
        };
        fetchAds();
    }
    , []);
    const companyAds: ICompanyAds[] = companyAd;
  const companyColumns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="ad" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <span>{active ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ICompanyAds) => (
        <Space>
          {/* <Button
            icon={<Edit />}
            onClick={() => handleEdit(record)}
          /> */}
            <Button onClick={
              () => {
                handleDelete(record._id);
              }
            } danger icon={<MdDelete />} />
        <Button
          onClick={() => handleToggleAdActiveStatus(record._id)}
          icon={<MdSync />}
        />
        </Space>
      ),
    },
  ];

 
  const handleAdd = () => {
    setModalMode('add');
    setSelectedAd(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // const handleEdit = (record: ICompanyAds) => {
  //   setModalMode('edit');
  //   setSelectedAd(record);
  //   form.setFieldsValue(record);
  //   setIsModalVisible(true);
  // };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/company-ads/${id}`);
      message.success('Ad deleted successfully');
    } catch (error) {
      message.error('Failed to delete ad');
    }
  };
  const handleToggleAdActiveStatus = async (id: string) => {
    try {
      await toggleAdActiveStatus(id);
      message.success('Ad active status toggled successfully');
      const response = await getAllCompaniesAdsAdmin();
      setCompanyAds(response?.data?.advertisements);
    } catch (error) {
      message.error('Failed to toggle ad active status');
    }
  };
  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      const imageField = form.getFieldValue('image');
      if (imageField?.[0]?.originFileObj) {
        formData.append('image', imageField[0].originFileObj);
      }
      Object.keys(values)?.forEach(key => {
        if (key !== 'image') {
          formData.append(key, values[key]);
        }
      });

      if (modalMode === 'add') {
        try {
          await axios.post(`${baseUrl}/company-ads/add`, formData);          console.log('Form Data for creation:', Object.fromEntries(formData));
          message.success('Ad created successfully');
          setIsModalVisible(false);
          form.resetFields();
        } catch (error) {
          message.error('Failed to create ad');
        }
      } else {
        try {
          await axios.put(`/company-ads/${selectedAd._id}`, formData);
          message.success('Ad updated successfully');
          setIsModalVisible(false);
          form.resetFields();
        } catch (error) {
          message.error('Failed to update ad');
        }
      }
    } catch (error) {
      console.error('Form validation error:', error);
      message.error('Please check your inputs');
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    maxCount: 1,
    multiple: false,
    listType: "picture-card" as const,
    onRemove: () => {
      form.setFieldValue('image', []);
    },
    onChange: (info: any) => {
      if (info.file.status === 'removed') {
        form.setFieldValue('image', []);
      }
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const CompanyAdsForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true, message: 'Please input the URL!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
  name="image" 
  label="Image"
  valuePropName="fileList"
  getValueFromEvent={normFile}
  extra="Only one image file is allowed (max 2MB)"
>
  <Upload {...uploadProps}>
    {form.getFieldValue('image')?.length ? null : (
      <div>
        <Upload />
        <div className="mt-2">Upload Image</div>
      </div>
    )}
  </Upload>
</Form.Item>

    </Form>
  );

  
  return (
    <div className="p-6">
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabBarExtraContent={
          <button className='bg-black text-white px-3 py-1 font-medium rounded-md' onClick={handleAdd}>
            Add New {activeTab === 'company' ? 'Company' : 'Banner'} Ad
          </button>
        }
      >
        <TabPane tab="Company Ads" key="company">
          <Table
            columns={companyColumns}
            dataSource={companyAds}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
       
      </Tabs>

      <Modal
        title={`${modalMode === 'add' ? 'Add New' : 'Edit'} ${
          activeTab === 'company' ? 'Company' : 'Banner'
        } Ad`}
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
       <CompanyAdsForm /> 
      </Modal>
    </div>
  );
};

export default AdsManagementPage;