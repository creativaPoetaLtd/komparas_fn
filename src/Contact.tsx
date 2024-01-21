import React, { useState } from 'react';
import Footer from './components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic for handling the form submission here
    console.log('Form submitted:', formData);
    // You can add API calls, form validation, etc.
  };

  return (
    <><div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
              <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                          Name
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 p-2 w-full border rounded-md"
                          required />
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                          Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 p-2 w-full border rounded-md"
                          required />
                  </div>
                  <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                          Message
                      </label>
                      <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="mt-1 p-2 w-full border rounded-md"
                          required
                      ></textarea>
                  </div>
                  <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                      Submit
                  </button>
              </form>
          </div>
      </div><Footer /></>
  );
};

export default Contact;
