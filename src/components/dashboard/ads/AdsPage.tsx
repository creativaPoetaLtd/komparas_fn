import React, { useEffect, useState } from 'react';
import { getAllAds } from '../../../api/ads';
import { getAllCompaniesAds } from '../../../api/ads';
import { baseUrl } from '../../../api';
import axios from 'axios';
import { 
  Table, 
  Tabs, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Upload,
  Space,
  message,
  Popconfirm
} from 'antd';
import { Delete, Edit, Plus, UploadCloud } from 'lucide-react';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

// Types based on your MongoDB schemas
interface ICompanyAds {
  _id: string;
  image?: string;
  name: string;
  url: string;
  title: string;
  createdAt: string;
}

interface IBannerAds {
  _id: string;
  image?: string;
  title: string;
  description: string;
  ad_type: 'PRODUCT' | 'SHOP' | 'CATEGORY';
  product_id?: string;
  createdAt: string;
}

const AdsManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('company');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [form] = Form.useForm();

 

  const [bunnerAds, setBunnerAds] = useState<IBannerAds[]>([]);
  const [companyAd, setCompanyAds] = useState<ICompanyAds[]>([]);
    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllAds();
        setBunnerAds(response?.data?.advertisements);
        };
        fetchAds();
    }, []);
    const bannerAds: IBannerAds[] = bunnerAds;
    useEffect(() => {
        const fetchAds = async () => {
        const response = await getAllCompaniesAds();
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
          <Button
            icon={<Edit />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this ad?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<Delete />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const bannerColumns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="ad" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ad Type',
      dataIndex: 'ad_type',
      key: 'ad_type',
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
      render: (_: any, record: IBannerAds) => (
        <Space>
          <Button
            icon={<Edit />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this ad?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<Delete />} />
          </Popconfirm>
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

  const handleEdit = (record: ICompanyAds | IBannerAds) => {
    setModalMode('edit');
    setSelectedAd(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/company-ads/${id}`);
      message.success('Ad deleted successfully');
    } catch (error) {
      message.error('Failed to delete ad');
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
      Object.keys(values).forEach(key => {
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
          console.log('Form Data for creation:', Object.fromEntries(formData));
          message.error('Failed to create ad');
        }
      } else {
        try {
          await axios.put(`/company-ads/${selectedAd._id}`, formData);
          console.log('Form Data for update:', Object.fromEntries(formData));
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

  
  

  const BannerAdsForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="ad_type"
        label="Ad Type"
        rules={[{ required: true, message: 'Please select the ad type!' }]}
      >
        <Select>
          <Option value="PRODUCT">Product</Option>
          <Option value="SHOP">Shop</Option>
          <Option value="CATEGORY">Category</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="product_id"
        label="Product ID"
        rules={[
          {
            required: form.getFieldValue('ad_type') === 'PRODUCT',
            message: 'Please input the product ID!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Upload accept="image/*" maxCount={1} listType="picture-card">
          <div>
            <UploadCloud />
            <div className="mt-2">Upload</div>
          </div>
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
        <TabPane tab="Banner Ads" key="banner">
          <Table
            columns={bannerColumns}
            dataSource={bannerAds}
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
        {activeTab === 'company' ? <CompanyAdsForm /> : <BannerAdsForm />}
      </Modal>
    </div>
  );
};

export default AdsManagementPage;