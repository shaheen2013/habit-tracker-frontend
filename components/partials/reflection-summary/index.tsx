import Image from "next/image";
import { motion } from "framer-motion";
import { ReflectionSummarySkeleton } from "./skeletons";
import { Props } from "./types";

const ReflectionSummary = ({ reflectionData, loading }: Props) => {
  const score = reflectionData?.score ?? 0;
  const summary = reflectionData?.summary ?? "";
  const flag = reflectionData?.flag ?? "";

  if (loading) return <ReflectionSummarySkeleton />;
  return (
    <div className="bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8 border-4 border-white">
      <div className="flex gap-6 items-center mb-6">
        <Image
          src="/sparkle.svg"
          alt="sparkle"
          width={64}
          height={64}
          className="size-16 object-cover object-center aspect-square"
        />
        <h2 className="text-[40px] leading-12 font-extrabold text-slate-950">
          Today’s Reflection Summary
        </h2>
      </div>
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Image
            src="/fast-charging.svg"
            alt="fast charging"
            width={32}
            height={32}
            className="size-8 object-cover object-center aspect-square"
          />
          <h5 className="text-2xl font-semibold text-slate-950">
            Alignment Score
          </h5>
        </div>

        <div className="bg-slate-100 rounded-xl h-16 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="bg-gradient-to-r from-[#B4FFB7] to-[#58DF5C] rounded-xl h-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-3xl font-bold text-slate-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {score}/100
          </motion.div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Image
            src="/summary.svg"
            alt="Summary"
            width={32}
            height={32}
            className="size-8 object-cover object-center aspect-square"
          />
          <h5 className="text-2xl font-semibold text-slate-950">Summary</h5>
        </div>
        <p className="text-2xl font-semibold text-slate-950">{summary}</p>
      </div>
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Image
            src="/flag.svg"
            alt="Flag"
            width={32}
            height={32}
            className="size-8 object-cover object-center aspect-square"
          />
          <h5 className="text-2xl font-semibold text-slate-950">Flag</h5>
        </div>
        <p className="text-2xl font-semibold text-slate-950">{flag}</p>
      </div>
    </div>
  );
};

export default ReflectionSummary;
