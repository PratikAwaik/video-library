import { Layout } from "~/components/layout";
import { Skeleton } from "~/components/ui/skeleton";

export default function RootLoadingSkeleton() {
  return (
    <Layout>
      <div className="mt-10 px-4">
        <div className="flex flex-col gap-6">
          {[
            ...Array(5)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[180px_1fr] gap-4 rounded-md p-4"
                >
                  <Skeleton className="h-28 rounded-md" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              )),
          ]}
        </div>
      </div>
    </Layout>
  );
}
