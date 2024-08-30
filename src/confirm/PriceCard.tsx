
const PriceCard = ({price}:any) => {
  return (
    <div className="flex w-full">
    <p className="font-bold text-xl">Igiciro cya serivisi :</p>
    <div className="flex my-auto ml-2 text-xl space-x-3">
        <p className=" text-red-500 line-through font-bold">{price} RWF</p>
        <p className=" text-green-500">Ubuntu</p>
    </div>
</div>
  )
}

export default PriceCard