/* eslint-disable @typescript-eslint/no-unused-vars */
const Badge = ({ title, className }: { title: string; className?: string }) => {
  let color: string = "";
  switch (title.toLowerCase()) {
    case "javascript":
      color = "bg-orange-500";
      break;
    case "web design":
      color = "bg-green-500";
      break;
    case "jquery":
      color = "bg-purple-600";
      break;
    case "css":
      color = "bg-blue-500";

      break;
    default:
      color = "bg-teal-600";
  }

  return (
    <div
      className={
        `${color} uppercase rounded-[2px] text-white font-bold px-3 flex items-center h-7 text-[.9rem] ` +
        className
      }
    >
      {title}
    </div>
  );
};

export default Badge;
