import React, { useEffect, useState } from 'react';
import { Form, Input, Upload, Button, Select, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { baseUrl } from '../../../api';
import { getAllProducts } from '../../../api/product';

interface AdUploadFormProps {
  visible: boolean;
  onClose: () => void;
  onAdAdded: () => void;
}

const AdUploadForm: React.FC<AdUploadFormProps> = ({ visible, onClose, onAdAdded }) => {
  const [form] = Form.useForm();
  const [adType, setAdType] = useState<string | undefined>();
  const [products, setProducts] = useState<any[]>([]);
  const handleUpload = async (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('ad_type', values.ad_type);
  
    if (values.product_id) {
      formData.append('product_id', values.product_id);
    }
  
    // Append the image file
    if (values.image) {
      formData.append('image', values.image.originFileObj as RcFile);
    } else {
      console.error('No image uploaded');
    }
  
    try {
      const response = await axios.post(`${baseUrl}/ads/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success(response.data.message || 'Advertisement uploaded successfully');
      form.resetFields();
      onAdAdded();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to upload advertisement');
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
    , []);

  const handleAdTypeChange = (value: string) => {
    setAdType(value);
    form.resetFields(['product_id', 'image']); 
  };

  return (
    <Modal
      title="Add Advertisement"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpload}
        className="p-6 bg-white rounded"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the ad title' }]}
        >
          <Input placeholder="Enter ad title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the ad description' }]}
        >
          <Input.TextArea placeholder="Enter ad description" rows={4} />
        </Form.Item>
        <Form.Item
          label="Ad Type"
          name="ad_type"
          rules={[{ required: true, message: 'Please select the ad type' }]}
        >
          <Select
            placeholder="Select ad type"
            onChange={handleAdTypeChange}
          >
            <Select.Option value="PRODUCT">Product</Select.Option>
            <Select.Option value="SHOP">Shop</Select.Option>
            <Select.Option value="CATEGORY">Category</Select.Option>
          </Select>
        </Form.Item>

        {/* Show Product ID field only when ad_type is PRODUCT */}
        {adType === 'PRODUCT' && (
          <Form.Item
            label="Product ID (only for Product ads)"
            name="product_id"
            rules={[{ required: true, message: 'Please enter the product ID' }]}
          >
            <Select placeholder="Select product">
              {products.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  {product.product_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Show Upload field only when ad_type is not PRODUCT */}
        {adType !== 'PRODUCT' && (
         <Form.Item
         label="Image"
         name="image"
         valuePropName="file"
         getValueFromEvent={(e: any) => {
           if (Array.isArray(e)) {
             return e;
           }
           return e?.fileList?.[0]; // Return the first file in the file list
         }}
         rules={[{ required: true, message: 'Please upload an image' }]}
       >
         <Upload
           name="image"
           listType="picture"
           maxCount={1}
           beforeUpload={() => false} // Prevent auto-upload
           onChange={(info) => console.log('Upload Info:', info.fileList)}
         >
           <Button icon={<UploadOutlined />}>Upload Image</Button>
         </Upload>
       </Form.Item>
       
        
        
        )}

        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdUploadForm;
