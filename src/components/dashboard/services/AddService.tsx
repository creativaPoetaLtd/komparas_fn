import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, Modal, Space } from 'antd';
import { UploadOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined, OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
  const [description, setDescription] = useState('');
  
  const handleUpload = async (values: any) => {
    const formData = new FormData();
    formData.append('service_name', values.service_name);
    formData.append('service_description', description);  
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
      setDescription('');
      onAdAdded();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to upload Service');
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
  
  return (
    <Modal
      title="Add Service"
      open={visible}
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
          rules={[{ required: true, message: 'Please enter the service title' }]}
        >
          <Input placeholder="Enter service title" />
        </Form.Item>
        
        <Form.Item
          label="Description"
          rules={[{ required: true, message: 'Please enter the service description' }]}
        >
          <div className="border border-gray-300 rounded">
            <div className="p-2 bg-gray-100 border-b border-gray-300">
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
            </div>
            <Input.TextArea 
              id="markdown-editor"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description (supports markdown formatting)"
              rows={6}
              className="border-none"
            />
            {description && (
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