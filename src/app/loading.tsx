import { Layout } from "~/components/layout";
import { Skeleton } from "~/components/ui/skeleton";

export default function RootLoadingSkeleton() {
  return (
    <Layout>
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ...Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-md border p-3"
                >
                  <div className="relative h-full w-full">
                    <Skeleton className="h-[230px] w-full rounded-md object-cover group-hover:opacity-70" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-6" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                </div>
              )),
          ]}
        </div>
      </div>
    </Layout>
  );
}
