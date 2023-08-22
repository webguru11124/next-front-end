export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-blue-main text-4xl">Items</h1>
      <div>{children}</div>
    </>
  );
}
