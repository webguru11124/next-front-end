import Header from "./header";
import VendorEditModal from "./vendorEditModal";

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-full mt-7">{children}</div>
      <VendorEditModal />
    </>
  );
}
