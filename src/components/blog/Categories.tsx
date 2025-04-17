import React from "react";

const Categories = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Categories</h2>
      <div>
        <ul className="divide-y last:border-b divide-gray-200 border-gray-200 font-semibold">
          <li className="flex justify-between py-3">
            <p>Wed Design</p>
            <div className="bg-green-500 text-white px-2 rounded-sm">340</div>
          </li>
          <li className="flex justify-between py-3">
            <p>JavaScript</p>
            <div className="bg-orange-500 text-white px-2 rounded-sm">74</div>
          </li>
          <li className="flex justify-between py-3">
            <p>JQuery</p>
            <div className="bg-purple-500 text-white px-2 rounded-sm">41</div>
          </li>
          <li className="flex justify-between py-3">
            <p>CSS</p>
            <div className="bg-blue-500 text-white px-2 rounded-sm">35</div>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 text-white font-bold">
        {[
          "Chrome",
          "CSS",
          "Tutorial",
          "Backend",
          "JQuery",
          "Design",
          "Development",
          "JavaScript",
          "Website",
        ].map((cat) => (
          <div className="bg-gray-800 cursor-pointer hover:bg-gray-700 px-3 h-8 flex items-center rounded-sm text-sm md:text-base">
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
