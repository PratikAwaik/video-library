import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-screen border-b bg-background">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <Link href="/" className="text-xl font-bold">
          Vidext
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="text-sm opacity-75 hover:underline hover:opacity-100"
          >
            Home
          </Link>
          <Link
            href={"/upload"}
            className="text-sm opacity-75 hover:underline hover:opacity-100"
          >
            Upload
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
