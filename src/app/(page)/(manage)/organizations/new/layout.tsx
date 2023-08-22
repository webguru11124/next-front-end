import Header from "./header";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Header></Header>
      <div className="flex justify-center mt-20">{children}</div>
    </section>
  );
}
