import { useState } from "react"
import { addCategory } from "../../../../api/getAllCategories"

interface CategoriesProps {
  setIsAddCategory: (value: boolean) => void
}
const AddCategoryForm = (
  { setIsAddCategory }: CategoriesProps
) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
  })

  const handleShopFormClose = () => {
    setIsAddCategory(false)
  }

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddShop = async (e: any) => {
    e.preventDefault()
    setLoading(false)
    await addCategory(formData)
    setLoading(false)
    setIsAddCategory(false)
  }

  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-[60%] h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <h1 className="text-slate-900 text-lg font-bold pl-48">Register Shop</h1>
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
          <form className="w-full flex flex-col justify-center items-center px-52 bg-gray-300 " onSubmit={handleAddShop}>
            <div className="w-full flex flex-col justify-start items-start bg-white px-10 py-5 rounded-md">
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
              <div className="w-full flex justify-start items-start mt-4">
                <button
                  disabled={loading || formData.name === ""}
                  type="submit" className={`w-full h-10 rounded-md bg-blue-700 text-white ${loading || formData.name === "" ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                >
                  Add Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddCategoryForm