import React, { useState } from "react";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantEmail: string;
  onSubmit: (data: { subject: string; message: string }) => void;
}

const replyApplicantModal: React.FC<ReplyModalProps> = ({ isOpen, onClose, applicantEmail, onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ subject, message });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Reply to {applicantEmail}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default replyApplicantModal;
