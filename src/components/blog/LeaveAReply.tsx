import { useState } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

interface LeaveAReplyProps {
  blogId: string;
  onCommentAdded?: () => void; // callback to refresh comments
}

const LeaveAReply = ({ blogId, onCommentAdded }: LeaveAReplyProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/blogs/${blogId}/comments`, formData);
      alert('Comment added successfully!');
      setFormData({ name: '', email: '', comment: '' });

      // Notify parent to refresh comments
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="">
      <div className="my-6">
        <h3 className="text-2xl font-bold">Leave A Reply</h3>
        <p className="text-gray-500">
          your email address will not be published. required fields are marked *
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col w-full">
            <label>Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 border border-gray-300"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 border border-gray-300"
              required
            />
          </div>
        </div>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Message"
          className="min-h-36 p-4 w-full border border-gray-300"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-gray-800 text-white h-12 w-fit px-14 font-semibold mb-1"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default LeaveAReply;
