import { Skeleton } from "@/components/ui/skeleton";
export function ReflectionSummarySkeleton() {
  return (
    <div className="bg-[#FAF4FF] rounded-4xl shadow-[0px_0px_0px_4px_#F6F1F9] p-8 border-4 border-white">
      <div className="flex gap-6 items-center mb-6">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-12 w-64 rounded-xl" />
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
