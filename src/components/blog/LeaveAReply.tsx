import React from "react";

const LeaveAReply = () => {
  return (
    <div className="">
      <div className="my-6">
        <h3 className="text-2xl font-bold">Leave A Reply</h3>
        <p className="text-gray-500">
          your email address will not be published. required fields are marked *
        </p>
      </div>
      <form action="" className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col w-full">
            <label>Name*</label>
            <input type="text" className=" h-12 border border-gray-300" />
          </div>
          <div className="flex flex-col w-full">
            <label>Email*</label>
            <input type="text" className="h-12 border border-gray-300" />
          </div>
        </div>
        <textarea
          name=""
          id=""
          placeholder="Message"
          className="min-h-36 p-4 w-full border border-gray-300"
        ></textarea>
        <button
          type="submit"
          className="bg-gray-800 text-white h-12 w-fit px-14 font-semibold mb-1"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default LeaveAReply;
