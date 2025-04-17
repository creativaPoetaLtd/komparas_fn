
import { BiSolidUser } from "react-icons/bi";

const Reply = () => {
  return (
    <div className="flex gap-4 md:gap-8 py-3">
      <div>
        <div className="size-[4rem] md:size-[5rem] overflow-hidden rounded-full flex items-center justify-center bg-gray-200">
          <BiSolidUser className="size-full mt-5 text-gray-400" />
        </div>
      </div>
      <div className="flex gap-2 w-fit flex-col">
        <h3 className="text-lg font-semibold">John Doe</h3>
        <div className="flex gap-5">
          <p className="text-slate-400">March 27, 2018 at 8:00 am</p>
          <p className="text-slate-400 hover:text-gray-600 font-semibold">
            Reply
          </p>
        </div>
        <p className="text-[.9rem]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default Reply;
