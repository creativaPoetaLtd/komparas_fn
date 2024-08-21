
const PriceCard = ({price}:any) => {
  return (
    <div className="flex w-full">
    <p className="font-bold">Igiciro cya serivisi :</p>
    <div className="flex flex-col">
        <p className="text-sm text-red-500 line-through font-bold">{price} RWF</p>
        <p className="text-sm text-green-500">Ubuntu</p>
    </div>
</div>
  )
}

export default PriceCard