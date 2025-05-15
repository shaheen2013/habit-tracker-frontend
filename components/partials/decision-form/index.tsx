import { AudioRecord, Emojis, File } from "@/components/icons";
import Image from "next/image";
import React from "react";

const DecisionForm = () => {
  return (
    <div
      className={`min-h-[calc(100vh-104px)] flex flex-col items-center justify-center`}
    >
      <div className="w-full max-w-[800px] bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8">
        <div className="flex justify-center gap-2 mb-6 shrink-0">
          <Image
            src="/notes.png"
            alt="notes"
            width={48}
            height={48}
            className="size-12 object-cover object-center aspect-square"
          />

          <h1 className="text-3xl font-bold text-slate-950">
            Describe one decision you made today that reflects your personal
            values.
          </h1>
        </div>
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
          <textarea
            className="w-full h-[84px] p-4 border-none rounded-lg mb-6 focus:outline-none text-slate-950 text-base font-semibold resize-none scroll-none overflow-hidden placeholder:text-slate-950 placeholder:text-base placeholder:font-semibold"
            placeholder="Write here"
          />
          <div className="w-full flex justify-between">
            {/* icons */}
            <div className="flex shrink-0 ">
              <div className="p-2 cursor-pointer">
                <File className="size-6 text-slate-600" />
              </div>
              <div className="p-2 cursor-pointer">
                <Emojis className="size-6 text-slate-600" />
              </div>
              <div className="p-2 cursor-pointer">
                <AudioRecord className="size-6 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          Next →
        </button> */}
      </div>
    </div>
  );
};

export default DecisionForm;
