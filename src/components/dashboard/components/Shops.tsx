import ShopListing from "./Dashboard/shop/ShopListing"
import AddShopForm from "./Dashboard/shop/AddShopForm"
import { useState } from "react"
const Shops = () => {
  const [addShop, setAddShop] = useState(false)
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {addShop ? (
        <AddShopForm setIsAddShop={setAddShop} />
      ) : (
        <ShopListing setIsAddShop={setAddShop} />
      )}
    </div>
  )
}

export default Shops