import { useEffect, useState } from "react";
import {  getAllCategories } from "../../../../api/getAllCategories";
import axios from 'axios';
import { baseUrl } from "../../../../api";

interface CategoriesProps {
  setIsAddCategory: (value: boolean) => void;
  onAddCategory?: (newCategory: { id: string; name: string }) => void;
}

const AddCategoryForm = ({ setIsAddCategory, onAddCategory}: CategoriesProps) => {
  const [, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAddSubCategory, setIsAddSubCategory] = useState(false);
  const [isAddParentCategory, setIsAddParentCategory] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  });
  const [imageFile, setImageFile] = useState<File | null|any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getAllCategories();
    setCategories(categories?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      parent_id: event.target.value,
    }));
  };

  const handleAddSubCategory = () => {
    setIsAddSubCategory(true);
    setIsAddParentCategory(false);
  };

  const handleAddParentCategory = () => {
    setIsAddParentCategory(true);
    setIsAddSubCategory(false);
  };

  const handleShopFormClose = () => {
    setIsAddCategory(false);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("parent_id", formData.parent_id);
      //if (imageFile) {
        formDataToSend.append("image", imageFile);
      //}
  
      const response = await axios.post(`${baseUrl}/category/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const newCategory = response.data.category;
      onAddCategory?.(newCategory);

      setLoading(false);
      setIsAddCategory(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-[60%] h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="flex justify-between w-full items-center py-2 pr-48">
            <h1 className="text-slate-900 text-lg font-bold pl-48">Register Category</h1>
            {(isAddSubCategory || isAddParentCategory) && (
              <div className="flex">
                {isAddSubCategory && (
                  <button className="p-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 flex justify-center items-center" onClick={handleAddParentCategory}>Add parent category</button>
                )}
                {isAddParentCategory && (
                  <button className="p-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 flex justify-center items-center" onClick={handleAddSubCategory}>Add sub category</button>
                )}
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600 flex justify-center items-center" onClick={handleShopFormClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-900 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          {(!isAddSubCategory && !isAddParentCategory) && (
            <div className="flex justify-around mt-20 w-full items-center text-center  m-auto">
              <button className="addPArentCategory w-fit bg-blue-700 hover:bg-blue-500 rounded-md text-white  p-4" onClick={handleAddParentCategory}>
                Add Parent Category
              </button>
              <button className="addPArentCategory flex bg-blue-700 rounded-md hover:bg-blue-500 text-white p-4" onClick={handleAddSubCategory}>
                Add Sub Category
              </button>
            </div>
          )}
          {(isAddSubCategory || isAddParentCategory) && (
            <form className="w-full flex flex-col justify-center items-center px-52 bg-gray-300" onSubmit={handleAddCategory}>
              <div className="w-full flex flex-col justify-start items-start bg-white px-10 py-5 rounded-md">
                {isAddParentCategory && (
                  <div className="w-full flex flex-col justify-start items-start">
                    <label className="w-full flex justify-start items-start text-slate-900">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                    />
                  </div>
                )}
                {isAddSubCategory && (
                  <>
                    <div className="AddProductForm__form__inputs__category w-full flex flex-col justify-start items-start mb-5">
                      <label className="AddProductForm__form__inputs__category__label mb-2">Product Category</label>
                      <select
                        className="AddProductForm__form__inputs__category__input w-full h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                        onChange={handleCategoryChange}
                        value={formData.parent_id}
                      >
                        <option value="" disabled selected>Select Category</option>
                        {categories?.map((category: any) => (
                          <option key={category.name} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start">
                      <label className="w-full flex justify-start items-start text-slate-900">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2"
                      />
                    </div>
                  </>
                )}
                <div className="w-full flex flex-col justify-start items-start">
                  <label className="w-full flex justify-start items-start text-slate-900">
                    Category logo image
                  </label>
                  <input type="file" name="image" onChange={handleFileChange} className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2" />
                </div>
                <div className="w-full flex justify-start items-start mt-4">
                  <button
                    type="submit"
                    className={`w-full h-10 rounded-md bg-blue-700 text-white`}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
