// import React from "react";

const Categories = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">LANGUAGES</h2>
      <div>
        <ul className="divide-y last:border-b divide-gray-200 border-gray-200 font-semibold">
          <li className="flex justify-between py-3">
            <p>Kinyarwanda</p>
            <div className="bg-green-500 text-white px-2 rounded-sm">Kiny</div>
          </li>
          <li className="flex justify-between py-3">
            <p>English</p>
            <div className="bg-orange-500 text-white px-2 rounded-sm">Eng</div>
          </li>
          <li className="flex justify-between py-3">
            <p>French</p>
            <div className="bg-purple-500 text-white px-2 rounded-sm">Fr</div>
          </li>
          <li className="flex justify-between py-3">
            <p>Spanish</p>
            <div className="bg-blue-500 text-white px-2 rounded-sm">Es</div>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 text-white font-bold">
        {[
          "IPHONE",
          "GOOGLE",
          "SAMSUNG",
          "ANDROID",
          "TABLET",
          "DESKTOP",
          "LAPTOP",
          "MOBILE",
          "GADGET",
          "TECHNOLOGY",
          "GAMING",
          "SOFTWARE",
        ].map((cat) => (
          <div className="bg-gray-800 hover:bg-gray-700 px-3 h-8 flex items-center rounded-sm text-sm md:text-base">
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
