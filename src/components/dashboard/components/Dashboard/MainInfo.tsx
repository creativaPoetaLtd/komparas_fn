const MainInfo = () => {
  return (
    <div className="mainInfo flex flex-row justify-between items-center">
    <div className="date flex flex-col w-fit rounded-md shadow p-2">
      <div className="date__day text-lg font-bold">We are on</div>
      <div className="date__date text-md font-medium text-blue-700">Mon, 20 July 2021</div>
    </div>
    <div className="sales flex flex-col w-fit rounded-md shadow p-2">
      <div className="sales__day text-lg font-bold">Total Sales</div>
      <div className="sales__sales text-md font-medium text-blue-700">Rp. 1.000.000</div>
    </div>
    <div className="users flex flex-col w-fit rounded-md shadow p-2">
      <div className="users__day text-lg font-bold">Total Users</div>
      <div className="users__users text-md font-medium text-blue-700">1000 Registerd</div>
    </div>
    <div className="shops flex flex-col w-fit rounded-md shadow p-2">
      <div className="shops__day text-lg font-bold">Total Shops</div>
      <div className="shops__shops text-md font-medium text-blue-700">100 Registerd</div>
    </div>
    <div className="products flex flex-col w-fit rounded-md shadow p-2">
      <div className="products__day text-lg font-bold">Total Products</div>
      <div className="products__products text-md font-medium text-blue-700">1000 Added</div>
    </div>
    <div className="pendingOrders flex flex-col w-fit rounded-md shadow p-2">
      <div className="pendingOrders__day text-lg font-bold">Orders</div>
      <div className="pendingOrders__pendingOrders text-md font-medium text-blue-700">1000 Orders</div>
    </div>
  </div>
  )
}

export default MainInfo