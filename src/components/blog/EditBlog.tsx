import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';

interface BlogEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blogId: string | null;
}

const BlogEditModal: React.FC<BlogEditModalProps> = ({ isOpen, onClose, onSuccess, blogId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [currentBlogImage, setCurrentBlogImage] = useState('');
  const [contentPhotos, setContentPhotos] = useState<File[]>([]);
  const [currentContentPhotos, setCurrentContentPhotos] = useState<string[]>([]);
  const [removedContentPhotos, setRemovedContentPhotos] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Create refs for file inputs to trigger them programmatically
  const blogImageInputRef = useRef<HTMLInputElement>(null);
  const contentPhotosInputRef = useRef<HTMLInputElement>(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['clean'],
    ],
  };
  
  const formats = [
    'bold', 'italic', 'underline'
  ];

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Fetch blog data when the modal opens and blogId changes
  useEffect(() => {
    if (isOpen && blogId) {
      fetchBlogData(blogId);
    }
  }, [isOpen, blogId]);

  const fetchBlogData = async (id: string) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${baseURL}/blogs/${id}`);
      const blog = response.data;
      
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setLanguage(blog.language || 'english');
      setCurrentBlogImage(blog.blogImage || '');
      setCurrentContentPhotos(blog.contentPhotos || []);
      setRemovedContentPhotos([]);
    } catch (error: any) {
      console.error('Error fetching blog details:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to load blog details');
    } finally {
      setIsLoading(false);
    }
  };

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
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file');
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB');
        return;
      }
      setBlogImage(file);
      setErrorMessage('');
    }
  };

  const handleContentPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validate files
      const validFiles = newFiles.filter(file => {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not a valid image file`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 5MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setContentPhotos(prev => [...prev, ...validFiles]);
      }
    }
    
    // Reset the input
    if (contentPhotosInputRef.current) {
      contentPhotosInputRef.current.value = '';
    }
  };

  const removeBlogImage = () => {
    setBlogImage(null);
    if (blogImageInputRef.current) {
      blogImageInputRef.current.value = '';
    }
  };

  const removeContentPhoto = (indexToRemove: number) => {
    setContentPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeCurrentContentPhoto = (indexToRemove: number) => {
    setRemovedContentPhotos(prev => [...prev, indexToRemove]);
  };

  // Get filtered current content photos (excluding removed ones)
  const filteredCurrentContentPhotos = currentContentPhotos.filter(
    (_, index) => !removedContentPhotos.includes(index)
  );

  const validateForm = () => {
    if (!title.trim()) {
      setErrorMessage('Title is required');
      return false;
    }
    if (!content.trim()) {
      setErrorMessage('Content is required');
      return false;
    }
    if (!currentBlogImage && !blogImage) {
      setErrorMessage('Blog image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    if (!blogId) {
      setErrorMessage('Blog ID is missing');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      formData.append('language', language);
      
      // Only append blogImage if a new one is selected
      if (blogImage) {
        formData.append('blogImage', blogImage);
      }
      
      // Add any new content photos
      contentPhotos.forEach(photo => {
        formData.append('contentPhotos', photo);
      });

      // Send the filtered existing content photos (excluding removed ones)
      formData.append('existingContentPhotos', JSON.stringify(filteredCurrentContentPhotos));

      const response = await axios.put(`${baseURL}/blogs/${blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      if (response.status === 200) {
        toast.success(response.data.message || 'Blog updated successfully');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      console.error('Error updating blog:', error);
      let errorMsg = 'An error occurred while updating the blog';
      
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.code === 'ECONNABORTED') {
        errorMsg = 'Request timeout. Please try again.';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMsg = 'Network error. Please check your connection.';
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setLanguage('english');
    setBlogImage(null);
    setCurrentBlogImage('');
    setContentPhotos([]);
    setCurrentContentPhotos([]);
    setRemovedContentPhotos([]);
    setErrorMessage('');
    
    // Reset file inputs
    if (blogImageInputRef.current) {
      blogImageInputRef.current.value = '';
    }
    if (contentPhotosInputRef.current) {
      contentPhotosInputRef.current.value = '';
    }
  };

  // Reset the form when the modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Blog</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close modal"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <ClipLoader color="#36d7b7" size={50} />
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  <p className="font-medium">Error</p>
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="edit-blog-title">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="edit-blog-title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter blog title"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="edit-blog-language">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="edit-blog-language"
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
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                </div>

                {/* Blog Image Upload - Hidden Input */}
                <input
                  type="file"
                  id="edit-blog-image"
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
                    {currentBlogImage && !blogImage && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-700">Current Image</h4>
                          <button
                            type="button"
                            onClick={triggerBlogImageInput}
                            className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded border border-blue-300 hover:bg-blue-50"
                          >
                            Change Image
                          </button>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 h-20 rounded overflow-hidden bg-gray-200 mr-3">
                            <img
                              src={currentBlogImage}
                              alt="Current blog image"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">Current blog image</span>
                        </div>
                      </div>
                    )}
                    
                    {blogImage && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-700">New Image</h4>
                          <button
                            type="button"
                            onClick={removeBlogImage}
                            className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-300 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 h-20 rounded overflow-hidden bg-gray-200 mr-3">
                            <img
                              src={URL.createObjectURL(blogImage)}
                              alt="New blog image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-sm text-gray-600 block">{blogImage.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(blogImage.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!currentBlogImage && !blogImage && (
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
                  id="edit-content-photos"
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
                      className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-300 hover:bg-blue-50"
                    >
                      Add Photos
                    </button>
                  </div>
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                    {/* Current Content Photos */}
                    {filteredCurrentContentPhotos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Current Photos</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {currentContentPhotos.map((photo, index) => {
                            if (removedContentPhotos.includes(index)) return null;
                            return (
                              <div key={`current-${index}`} className="relative group">
                                <div className="w-full aspect-square rounded overflow-hidden bg-gray-200">
                                  <img
                                    src={photo}
                                    alt={`Current content photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                    }}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCurrentContentPhoto(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                                  aria-label="Remove photo"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* New Content Photos */}
                    {contentPhotos.length > 0 && (
                      <div className="mb-2">
                        <h4 className="font-medium text-gray-700 mb-2">New Photos</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {contentPhotos.map((photo, index) => (
                            <div key={`new-${index}`} className="relative group">
                              <div className="w-full aspect-square rounded overflow-hidden bg-gray-200">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`New content photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeContentPhoto(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                                aria-label="Remove photo"
                              >
                                ×
                              </button>
                              <p className="text-xs text-gray-500 truncate mt-1" title={photo.name}>
                                {photo.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {filteredCurrentContentPhotos.length === 0 && contentPhotos.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No content photos</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={isSubmitting}
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
                        <span>Updating...</span>
                      </>
                    ) : (
                      'Update Blog'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditModal;