import React from "react";

const Archive = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Archive</h2>
      <ul className="divide-y last:border-b divide-gray-200 border-gray-200 font-semibold">
        <li className="group py-3 cursor-pointer">
          <a href="#" className="group-hover:underline">
            January 2018
          </a>
        </li>
        <li className="group py-3 cursor-pointer">
          <a href="#" className="group-hover:underline">
            February 2018
          </a>
        </li>
        <li className="group py-3 cursor-pointer">
          <a href="#" className="group-hover:underline">
            March 2018
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Archive;
