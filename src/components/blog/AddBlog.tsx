import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // To trigger a refresh of the blog list
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [contentPhotos, setContentPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Create refs for file inputs to trigger them programmatically
  const blogImageInputRef = useRef<HTMLInputElement>(null);
  const contentPhotosInputRef = useRef<HTMLInputElement>(null);

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],  // Simple formatting options
      ['clean'],  // Remove formatting button
    ],
  };
  
  const formats = [
    'bold', 'italic', 'underline'
  ];

  // Function to trigger the file input click programmatically
  const triggerBlogImageInput = () => {
    if (blogImageInputRef.current) {
      blogImageInputRef.current.click();
    }
  };

  const triggerContentPhotosInput = () => {
    if (contentPhotosInputRef.current) {
      contentPhotosInputRef.current.click();
    }
  };

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBlogImage(e.target.files[0]);
    }
  };

  const handleContentPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setContentPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removeContentPhoto = (indexToRemove: number) => {
    setContentPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeBlogImage = () => {
    setBlogImage(null);
    if (blogImageInputRef.current) {
      blogImageInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!blogImage) {
      setErrorMessage('Please upload a blog image');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('language', language);
      formData.append('blogImage', blogImage);

      if (contentPhotos.length > 0) {
        contentPhotos.forEach(photo => {
          formData.append('contentPhotos', photo);
        });
      }

      const response = await axios.post(`${baseURL}/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Reset form
        setTitle('');
        setContent('');
        setLanguage('en');
        setBlogImage(null);
        setContentPhotos([]);

        // Close modal and refresh blog list
        onSuccess();
        onClose();
        toast.success(response.data.message || 'Blog created successfully');
      }
    } catch (error: any) {
      console.error('Error creating blog:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred while creating the blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-medium">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="blog-title">
              Title <span className="text-red-500">*</span>
            </label>
            <textarea
              id="blog-title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={1}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="blog-language">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              id="blog-language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              required
            >
             <option value="english">English</option>
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
              <option value="kinyarwanda">Kinyarwanda</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="blog-content">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Enter blog content"
                className="block w-full"
              />
            </div>
            {content === '' && (
              <p className="text-sm text-red-500 mt-1">Content is required</p>
            )}
          </div>

          {/* Blog Image Upload - Hidden Input */}
          <input
            type="file"
            id="blog-image"
            name="blogImage"
            accept="image/*"
            ref={blogImageInputRef}
            onChange={handleBlogImageChange}
            className="hidden"
          />

          {/* Blog Image Preview & Upload Button */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Image <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              {blogImage ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Selected Image</h4>
                    <button
                      type="button"
                      onClick={removeBlogImage}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded overflow-hidden bg-gray-200 mr-3">
                      <img
                        src={URL.createObjectURL(blogImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600">{blogImage.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No image selected</p>
                  <button
                    type="button"
                    onClick={triggerBlogImageInput}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Upload Blog Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Photos Upload - Hidden Input */}
          <input
            type="file"
            id="content-photos"
            name="contentPhotos"
            accept="image/*"
            ref={contentPhotosInputRef}
            onChange={handleContentPhotosChange}
            className="hidden"
            multiple
          />

          {/* Content Photos Preview & Upload Button */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">
                Content Photos <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <button
                type="button"
                onClick={triggerContentPhotosInput}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Add Photos
              </button>
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              {contentPhotos.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Selected {contentPhotos.length} photo(s)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {contentPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full aspect-square rounded overflow-hidden bg-gray-200">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Content photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeContentPhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove photo"
                        >
                          &times;
                        </button>
                        <p className="text-xs text-gray-500 truncate mt-1">{photo.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No content photos selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <ClipLoader color="#ffffff" size={16} className="mr-2" />
                  <span>Saving...</span>
                </>
              ) : (
                'Create Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;