import { Layout } from "~/components/layout";
import { Skeleton } from "~/components/ui/skeleton";

export default function UploadLoadingSkeleton() {
  return (
    <Layout>
      <div className="mt-10 flex w-full items-center justify-center overflow-hidden">
        <div className="w-full max-w-lg">
          <div className="flex h-full w-full flex-col gap-4">
            <Skeleton className="mb-2 h-10" />
            <div className="mb-4 grid w-full items-center gap-2">
              <Skeleton className="h-10" />
            </div>
            <div className="mb-4 grid w-full items-center gap-2">
              <Skeleton className="h-10" />
            </div>
            <div className="mb-4 grid w-full items-center gap-2">
              <Skeleton className="h-10" />
            </div>
            <div className="mb-4 grid w-full items-center gap-2">
              <Skeleton className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
