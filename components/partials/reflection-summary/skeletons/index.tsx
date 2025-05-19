import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
export function ReflectionSummarySkeleton() {
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

      {/* Alignment Score Section */}
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-xl" />
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>

      {/* Summary Section */}
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-xl" />
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>

      {/* Flag Section */}
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}
