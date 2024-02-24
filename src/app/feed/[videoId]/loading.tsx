import { Layout } from "~/components/layout";
import { Skeleton } from "~/components/ui/skeleton";

export default function VideoDetailsLoadingSkeleton() {
  return (
    <Layout>
      <div className="mx-auto mt-10">
        <div className="mb-8 flex flex-col gap-4 rounded-md">
          <Skeleton className="h-96 w-full" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Skeleton className="h-12" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
