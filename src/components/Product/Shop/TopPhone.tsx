const TopPhone = () => {
  return (
    <div className="phoneCard flex h-[10rem]">
                        <div className="h-full w-[12rem] p-2 border border-yellow-500 rounded-md">
                            <img src={'/image41.png'} alt="phone" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col h-full justify-between ml-4">
                            <div className="flex flex-col">
                                <h1 className="text-lg">Iphone 12</h1>
                                <p className="text-sm">Igiciro: RWF 100,000</p>
                            </div>
                            <p className="text-sm">Amabara Ahari:</p>
                            <div className="flex gap-1 mb-1">
                                <div className="h-[1.5rem] w-[1.5rem] bg-yellow-500 border border-gray-600"></div>
                                <div className="h-[1.5rem] w-[1.5rem] bg-yellow-500 border border-gray-600"></div>
                                <div className="h-[1.5rem] w-[1.5rem] bg-yellow-500 border border-gray-600"></div>
                                <div className="h-[1.5rem] w-[1.5rem] bg-yellow-500 border border-gray-600"></div>
                                <div className="h-[1.5rem] w-[1.5rem] bg-yellow-500 border border-gray-600"></div>
                            </div>
                        </div>
                    </div>
  )
}

export default TopPhone