import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Button, message, Modal, Space } from 'antd';
import { UploadOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined, OrderedListOutlined, UnorderedListOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { baseUrl } from '../../../api';

interface AddServiceProps {
  visible: boolean;
  onClose: () => void;
  onAdAdded: () => void;
  isEditMode?: boolean;
  serviceData?: any;
}

const AddService: React.FC<AddServiceProps> = ({ visible, onClose, onAdAdded, isEditMode = false, serviceData = null }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  // Reset form and load service data when modal opens for editing
  useEffect(() => {
    if (visible) {
      form.resetFields();
      setDescription('');
      setFileList([]);
      setShowPreview(false);
      
      if (isEditMode && serviceData) {
        form.setFieldsValue({ 
          service_name: serviceData.service_name,
          product_id: serviceData.product_id
        });
        setDescription(serviceData.service_description || '');
        
        if (serviceData.image) {
          setFileList([{
            uid: '-1',
            name: 'Current Image',
            status: 'done',
            url: serviceData.image,
          }]);
        }
      }
    }
  }, [visible, isEditMode, serviceData, form]);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('service_name', values.service_name);
    formData.append('service_description', description);  
    
    if (values.product_id) {
      formData.append('product_id', values.product_id);
    }
  
    // Only append image if a new one is uploaded
    if (values.image && values.image.originFileObj) {
      formData.append('image', values.image.originFileObj as RcFile);
    }
    
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`${baseUrl}/services/${serviceData._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Service updated successfully');
      } else {
        response = await axios.post(`${baseUrl}/services/add`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success(response.data.message || 'Service uploaded successfully');
      }
      
      form.resetFields();
      setDescription('');
      setFileList([]);
      onAdAdded();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} Service`);
    }
  };

  // Markdown formatting functions
  const insertMarkdown = (type: string) => {
    const textArea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = description.substring(start, end);
    let formattedText = '';
    let cursorPosition = 0;

    switch (type) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        cursorPosition = selectedText ? 2 : 0;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        cursorPosition = selectedText ? 1 : 0;
        break;
      case 'underline':
        formattedText = `<u>${selectedText || 'underlined text'}</u>`;
        cursorPosition = selectedText ? 3 : 0;
        break;
      case 'ordered-list':
        formattedText = `\n1. ${selectedText || 'List item'}\n2. List item\n3. List item`;
        cursorPosition = selectedText ? 3 : 0;
        break;
      case 'unordered-list':
        formattedText = `\n- ${selectedText || 'List item'}\n- List item\n- List item`;
        cursorPosition = selectedText ? 2 : 0;
        break;
    }

    const newValue = description.substring(0, start) + formattedText + description.substring(end);
    setDescription(newValue);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textArea.focus();
      if (selectedText) {
        textArea.setSelectionRange(start + cursorPosition, start + selectedText.length + cursorPosition);
      } else {
        textArea.setSelectionRange(start + cursorPosition, end + formattedText.length - cursorPosition);
      }
    }, 0);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  return (
    <Modal
      title={isEditMode ? "Edit Service" : "Add Service"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="p-6 bg-white rounded"
      >
        <Form.Item
          label="Title"
          name="service_name"
          rules={[{ required: true, message: 'Please enter the service title' }]}
        >
          <Input placeholder="Enter service title" />
        </Form.Item>
        
        <Form.Item
          label="Description"
          rules={[{ required: true, message: 'Please enter the service description' }]}
        >
          <div className="border border-gray-300 rounded">
            <div className="p-2 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
              <Space>
                <Button 
                  type="text" 
                  icon={<BoldOutlined />} 
                  onClick={() => insertMarkdown('bold')}
                  title="Bold"
                />
                <Button 
                  type="text" 
                  icon={<ItalicOutlined />} 
                  onClick={() => insertMarkdown('italic')}
                  title="Italic"
                />
                <Button 
                  type="text" 
                  icon={<UnderlineOutlined />} 
                  onClick={() => insertMarkdown('underline')}
                  title="Underline"
                />
                <Button 
                  type="text" 
                  icon={<OrderedListOutlined />} 
                  onClick={() => insertMarkdown('ordered-list')}
                  title="Ordered List"
                />
                <Button 
                  type="text" 
                  icon={<UnorderedListOutlined />} 
                  onClick={() => insertMarkdown('unordered-list')}
                  title="Unordered List"
                />
              </Space>
              
              <Button 
                type="text" 
                icon={showPreview ? <EyeInvisibleOutlined /> : <EyeOutlined />} 
                onClick={togglePreview}
                title={showPreview ? "Hide Preview" : "Show Preview"}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>
            <Input.TextArea 
              id="markdown-editor"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description (supports markdown formatting)"
              rows={6}
              className="border-none"
            />
            {description && showPreview && (
              <div className="p-2 border-t border-gray-300">
                <div className="text-xs text-gray-500">Preview:</div>
                <div 
                  className="p-2 mt-1 bg-gray-50 rounded"
                  dangerouslySetInnerHTML={{ 
                    __html: description
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br />')
                  }} 
                />
              </div>
            )}
          </div>
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
          rules={[{ required: !isEditMode, message: 'Please upload an image' }]}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={(info) => {
              // Update fileList when user uploads a new image
              if (info.fileList.length > 0) {
                setFileList(info.fileList);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>
              {isEditMode ? "Change Image" : "Upload Image"}
            </Button>
          </Upload>
        </Form.Item>
       
        <Form.Item>
          <Button htmlType="submit">
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddService;