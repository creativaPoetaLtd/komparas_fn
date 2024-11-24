import React from 'react';
import { Form, Input, Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { baseUrl } from '../../../api';

interface AddServiceProps {
  visible: boolean;
  onClose: () => void;
  onAdAdded: () => void;
}

const AddService: React.FC<AddServiceProps> = ({ visible, onClose, onAdAdded }) => {
  const [form] = Form.useForm();
  const handleUpload = async (values: any) => {
    const formData = new FormData();
    formData.append('service_name', values.service_name);
    formData.append('service_description', values.service_description);  
    if (values.product_id) {
      formData.append('product_id', values.product_id);
    }
  
    if (values.image) {
      formData.append('image', values.image.originFileObj as RcFile);
    } else {
      console.error('No image uploaded');
    }
  
    try {
      const response = await axios.post(`${baseUrl}/services/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success(response.data.message || 'Service uploaded successfully');
      form.resetFields();
      onAdAdded();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to upload Service');
    }
  };
  
  return (
    <Modal
      title="Add Service"
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
          name="service_name"
          rules={[{ required: true, message: 'Please enter the ad title' }]}
        >
          <Input placeholder="Enter ad title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="service_description"
          rules={[{ required: true, message: 'Please enter the ad description' }]}
        >
          <Input.TextArea placeholder="Enter ad description" rows={4} />
        </Form.Item>
         <Form.Item
         label="Image"
         name="image"
         valuePropName="file"
         getValueFromEvent={(e: any) => {
           if (Array.isArray(e)) {
             return e;
           }
           return e?.fileList?.[0]; 
         }}
         rules={[{ required: true, message: 'Please upload an image' }]}
       >
         <Upload
           name="image"
           listType="picture"
           maxCount={1}
           beforeUpload={() => false} 
           onChange={(info) => console.log('Upload Info:', info.fileList)}
         >
           <Button icon={<UploadOutlined />}>Upload Image</Button>
         </Upload>
       </Form.Item>
       
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddService;
