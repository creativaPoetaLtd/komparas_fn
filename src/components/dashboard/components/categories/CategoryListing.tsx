import { useEffect, useState } from "react"
import { getAllCategories, deleteCategory } from "../../../../api/getAllCategories"

interface CategoriesProps {
  setIsAddCategory: (value: boolean) => void
  setIsEditCategory: (value: boolean) => void
  setSelectedCategoryId?: (id: string) => void
}
const CategoryListing = (
  { setIsAddCategory, setIsEditCategory, setSelectedCategoryId }: CategoriesProps
) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data)
        setLoading(false)
      })
      .catch(() => {})
  }, [refresh])
  const handleDelete = (id: string) => {
    deleteCategory(id)
      .then(() => {
        setRefresh(!refresh)
      })
      .catch(() => {})
  }

  const handleEditCategory = async (id: any) => {
    setIsEditCategory(true);
    setIsAddCategory(false);
    setSelectedCategoryId && setSelectedCategoryId(id); 
    localStorage.setItem("editCategoryID", id);
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="users flex flex-col w-fit rounded-md shadow p-1 px-2">
          <div className="users__day text-sm font-bold">Total Categories</div>
          <div className="users__users text-sm font-medium text-blue-700 flex justify-center items-center text-center">20</div>
        </div>
        <div className="users__list flex rounded-md space-x-3">
          <button className="shadow px-6">
            Export
          </button>
          <button className="shadow px-6 ">
            Print
          </button>
          <button className="shadow px-6" onClick={() => setIsAddCategory(true)}>
            Add New Category
          </button>
        </div>
      </div>
      <div className="users__table flex flex-col w-full rounded-md py-2 mt-2">
        <table className="w-full rounded-md">
          <thead className="w-full bg-slate-200 rounded-md">
            <tr className="w-full shadow-sm rounded-md">
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">No</th>
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">Image</th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Name</th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">Description</th>
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="w-full mt-3">
            {loading && (
              <tr className="w-full mt-3 shadow-sm">
                <td className="w-[10%] text-sm font-medium py-4 px-2">Loading...</td>
              </tr>
            )}
            {!loading && categories.length === 0 && (
              <tr className="w-full mt-3 shadow-sm">
                <td className="w-[10%] text-sm font-medium py-4 px-2">No Categories</td>
              </tr>
            )}

            {!loading && categories.length > 0 && categories.map((category: any, index: number) => (
              <tr className="w-full mt-3 shadow-sm" key={index}>
                <td className="w-[10%] text-sm font-medium py-4 px-2">
                  {index + 1}
                </td>
                <td className="w-[20%] text-sm font-medium py-4 px-2">
                  <img src={category?.image} className="w-10 h-10" alt="category" />
                </td>
                <td className="w-[20%] text-sm font-medium py-4 px-2">
                  {category?.name}
                </td>
                <td className="w-[20%] text-sm font-medium py-4 px-2">
                  {category?.description ? category?.description : "-"}
                </td>
                <td className="w-[10%] text-sm font-medium py-4 px-2">
                  <div className="flex flex-row justify-between items-center">
                    <button className="shadow px-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.707 3.293a1 1 0 00-1.414 0L3 9.586V17h6v-2a1 1 0 011-1h2a1 1 0 011 1v2h6v-7.414l-6.293-6.293zM12 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="shadow px-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.707 3.293a1 1 0 00-1.414 0L3 9.586V17h6v-2a1 1 0 011-1h2a1 1 0 011 1v2h6v-7.414l-6.293-6.293zM12 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="shadow px-2" onClick={
                      () => handleEditCategory(category?._id)
                    }>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M13.707 3.293a1 1 0 00-1.414 0L4 11.586V16h4.414l8.293-8.293a1 1 0 000-1.414L13.707 3.293zM6 14.414V12h2.414L15.707 6.707l-2.293-2.293L6 9.586v4.828zM13.586 5L15 6.414 16.586 5 15 3.414 13.586 5z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="shadow px-2" onClick={() => handleDelete(category._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 111.414 1.414L11.414 9l3.293 3.293a1 1 0 01-1.414 1.414L10 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 9 5.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoryListing