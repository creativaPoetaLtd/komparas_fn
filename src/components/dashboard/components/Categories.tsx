import { useState } from "react"
import CategoryListing from "./categories/CategoryListing"
import AddCategoryForm from "./categories/AddCategoryForm"
import EditCategoryForm from "./categories/EditCategory"
const Categories = () => {
  const [categories, setCategories] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {categories ? (
        <AddCategoryForm setIsAddCategory={setCategories} />
      ) : editCategory ? (
        <EditCategoryForm setIsEditCategory={setEditCategory} />
      ) : (
        <CategoryListing setIsAddCategory={setCategories} setIsEditCategory={setEditCategory} />
      )}
    </div>

  )
}

export default Categories