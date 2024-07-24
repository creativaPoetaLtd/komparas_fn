export const RedComponent = ({color}:any) => {
  return (
    <div
    style={{ backgroundColor: color }}
     className={`
    flex
    h-5
    w-5
    bg-${color}-400
    rounded-full
    cursor-pointer
    hover:shadow-lg
    transition
    duration-300
    ease-in-out
    transform
    hover:scale-110
    hover:bg-${color}-600
    border
    border-yellow-700
    `}
    ></div>
  )
}

