import { useEffect, useState } from "react"
// import { EditCategory } from "../../../../api/getAllCategories"
import { getAllCategories } from "../../../../api/getAllCategories"
import { getCategoryById } from "../../../../api/getAllCategories"
import { updateCategory } from "../../../../api/getAllCategories"
import { toast } from "react-toastify"

interface CategoriesProps {
  setIsEditCategory: (value: boolean) => void
}
const EditCategoryForm = (
  { setIsEditCategory }: CategoriesProps
) => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any>([]);
  const [isEditSubCategory, setIsEditSubCategory] = useState(false)
  const [isEditParentCategory, setIsEditParentCategory] = useState(false)
  const [dataToEdit, setDataToEdit] = useState<any>([])
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  })
  const editID: any = localStorage.getItem("editCategoryID")
  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getAllCategories();
    setCategories(categories?.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
    useEffect(() => {
        const fetchCategory = async () => {
        const { data } = await getCategoryById(editID);
        setDataToEdit(data);
        };
        fetchCategory();
    }, [editID]);
    useEffect(() => {
        setFormData({
            name: dataToEdit?.name,
            parent_id: dataToEdit?.parent_id,
        })
    }, [dataToEdit])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      parent_id: event.target.value,
    }));
  }

  const handleEditSubCategory = () => {
    setIsEditSubCategory(true)
    setIsEditParentCategory(false)
  }

  const handleEditParentCategory = () => {
    setIsEditParentCategory(true)
    setIsEditSubCategory(false)
  }

  const handleShopFormClose = () => {
    setIsEditCategory(false)
  }

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEditCategory = async (e: any) => {
    e.preventDefault()
    setLoading(false)
    const res = await updateCategory(formData, editID)
    console.log("res", res);
    if (res?.status === 200) {
      toast.success("Category Updated Successfully")
      setIsEditCategory(false)

    }
    else {
      toast.error("Category Not Updated")
    }
  }

  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-[60%] h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="flex justify-between w-full items-center py-2 pr-48">
            <h1 className="text-slate-900 text-lg font-bold pl-48">Update Category</h1>
            {(isEditSubCategory || isEditParentCategory) && (
              <div className="flex">
                {isEditSubCategory && (
                  <button className="p-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 flex justify-center items-center" onClick={handleEditParentCategory}>Edit parent category</button>
                )}
                {isEditParentCategory && (
                  <button className="p-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 flex justify-center items-center" onClick={handleEditSubCategory}>Edit sub category</button>
                )}
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600  flex justify-center items-center" onClick={handleShopFormClose}>
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
          {(!isEditSubCategory && !isEditParentCategory) && (
            <div className="flex justify-around mt-20 w-full items-center text-center  m-auto">
              <button className="EditPArentCategory w-fit bg-blue-700 hover:bg-blue-500 rounded-md text-white  p-4" onClick={handleEditParentCategory}>
                Update Parent Category
              </button>
              <button className="EditPArentCategory flex bg-blue-700 rounded-md hover:bg-blue-500 text-white p-4" onClick={handleEditSubCategory}>
                Updated Sub Category
              </button>
            </div>
          )}
          {(isEditSubCategory || isEditParentCategory) && (
            <form className="w-full flex flex-col justify-center items-center px-52 bg-gray-300 " onSubmit={handleEditCategory}>
              <div className="w-full flex flex-col justify-start items-start bg-white px-10 py-5 rounded-md">
                {isEditParentCategory && (
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
                {isEditSubCategory && (
                  <>
                    <div className='EditProductForm__form__inputs__category w-full flex flex-col justify-start items-start mb-5'>
                      <label className='EditProductForm__form__inputs__category__label  mb-2'>Product Category</label>
                      <select
                        className='EditProductForm__form__inputs__category__input w-full h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
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
                        className="w-full h-10 rounded-md border outline-blue-700 border-slate-900 p-2" />
                    </div></>
                )}
                <div className="w-full flex justify-start items-start mt-4">
                  <button
                    disabled={loading || formData.name === "" || isEditSubCategory && formData.parent_id === ""}
                    type="submit" className={`w-full h-10 rounded-md bg-blue-700 text-white ${loading || formData.name === "" || isEditSubCategory && formData.parent_id === "" ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                  >
                    Update Category
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default EditCategoryForm