import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="bg-white rounded-md overflow-hidden shadow-md p-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://placekitten.com/100/100" // Placeholder image URL
              alt="User Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span> 123 Main Street, Cityville
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> (123) 456-7890
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Date of Birth:</span> January 1, 1990
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Joined:</span> February 2022
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit Profile</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Change Password</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
