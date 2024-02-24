type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <main className="mx-auto h-full w-full max-w-4xl px-4 py-14">
      {children}
    </main>
  );
}
