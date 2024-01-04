import { useState } from "react"
import CategoryListing from "./categories/CategoryListing"
import AddCategoryForm from "./categories/AddCategoryForm"
const Categories = () => {
  const [categories, setCategories] = useState(false)
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {categories ? (
        <AddCategoryForm setIsAddCategory={setCategories} />
      ) : (
        <CategoryListing setIsAddCategory={setCategories} />
      )}
    </div>

  )
}

export default Categories