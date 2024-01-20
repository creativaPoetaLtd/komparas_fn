import ShopListing from "./shop/ShopListing"
import AddShopForm from "./shop/AddShopForm"
import { useState } from "react"
import EditShopForm from "./shop/EditShop"
const Shops = () => {
  const [addShop, setAddShop] = useState(false)
  const [editShop, setEditShop] = useState(false)
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {addShop ? (
        <AddShopForm setIsAddShop={setAddShop} />
      ) : editShop? (
        <EditShopForm setIsEditShop={setEditShop} />
      ) :(
        <ShopListing setIsAddShop={setAddShop} setIsEditShop={setEditShop} />
      )}
    </div>
  )
}

export default Shops