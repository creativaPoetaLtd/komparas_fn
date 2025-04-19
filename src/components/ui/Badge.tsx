const Badge = ({ title = "", className = "" }: { title?: string; className?: string }) => {
    let color: string;
  
    switch (title.toLowerCase()) {
      case "kinyarwanda":
        color = "bg-orange-500";
        break;
      case "french":
        color = "bg-green-500";
        break;
      case "english":
        color = "bg-purple-600";
        break;
      case "spanish":
        color = "bg-blue-500";
        break;
      default:
        color = "bg-teal-600";
    }
  
    return (
      <div
        className={`${color} uppercase rounded-[2px] text-white font-bold px-3 flex items-center h-7 text-[.9rem] ${className}`}
      >
        {title}
      </div>
    );
  };
  
  export default Badge;
  