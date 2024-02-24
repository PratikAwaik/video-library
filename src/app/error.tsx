"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div className="mx-auto flex h-96 w-full items-center justify-center">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-semibold">Oops! Something went wrong</h2>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant={"secondary"} asChild>
              <Link href={"/"}>Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
